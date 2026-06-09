import { ChangeDetectorRef, Component } from '@angular/core';
import { LoginRegister } from '../../shared/login-register/login-register';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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

 cargarDatos() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);
  }
}
