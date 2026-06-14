import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { LoginRegister } from '../../shared/login-register/login-register';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users-service';

@Component({
  selector: 'app-register-component',
  imports: [LoginRegister, ReactiveFormsModule, RouterLink],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css',
})
export class RegisterComponentComponent {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  usersService = inject(UsersService);

  constructor(private cd: ChangeDetectorRef, private router: Router) {
    this.miForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required
      ]),
      apellidos: new FormControl('', [
        Validators.required
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
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

  get nombre() {
    return this.miForm.get('nombre');
  }

  get apellidos() {
    return this.miForm.get('apellidos');
  }

  get username() {
    return this.miForm.get('username');
  }

  get email() {
    return this.miForm.get('email');
  }

  get password() {
    return this.miForm.get('password');
  }

  registrar() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }

    // El formulario recoge los 5 campos; el backend completa el resto
    // (foto, roles_id, direccion, zona_geografica, cp, bloqueado, created_at).
    this.usersService.registerUser(this.miForm.value).subscribe({
      next: (data) => {
        this.tipo = true;
        this.mensaje = 'Cuenta creada correctamente. Ya puedes iniciar sesion.';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);

        this.tipo = false;
        this.mensaje = 'No se ha podido crear la cuenta. Revisa los datos e intentalo de nuevo.';
        this.cd.detectChanges();
      }
    });
  }

}
