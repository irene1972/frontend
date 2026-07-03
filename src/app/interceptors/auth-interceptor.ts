import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

const isLoginRequest = (url: string) => url.includes('/login');

const isRegisterRequest = (url: string, method: string) =>
  method === 'POST' && /\/usuarios\/?(\?|$)/.test(url);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  const isFormData = req.body instanceof FormData;

  const cloneReq = req.clone({
    setHeaders: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(isFormData ? {} : { 'Content-Type': 'application/json' })
    }
  });

  return next(cloneReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const skipGlobalAuthRedirect =
        isLoginRequest(req.url) || isRegisterRequest(req.url, req.method);

      if (error.status === 401 && !isLoginRequest(req.url)) {
        localStorage.clear();
        router.navigate(['/login']);
      } else if (
        error.status === 403 &&
        token &&
        !skipGlobalAuthRedirect
      ) {
        router.navigate(['/403error']);
      }

      return throwError(() => error);
    })
  );
};
