import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { LoginRegister } from '../../shared/login-register/login-register';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users-service';
//import jwt from 'jsonwebtoken';

@Component({
  selector: 'app-login-component',
  imports: [LoginRegister,ReactiveFormsModule,RouterLink],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css',
})
export class LoginComponentComponent {
miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  usersService = inject(UsersService);
  token:string='';

   constructor(private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {
    this.miForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    }, []);
  }

   get email() {
    return this.miForm.get('email');
  }

  get password() {
    return this.miForm.get('password');
  }

 loadData() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);

    this.usersService.loginUser(this.miForm.value).subscribe((data) => {
      if (data.error) {
        this.mensaje = data.error;
        return;
      } else {
        console.log(data);
        //this.token = data.token;
        //this.cd.detectChanges();
      }
    });
  }
  decodeToken(token:string,secret:string){

    //const decode= jwt.verify(token,secret);
    //return decode;
  }
}


