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
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      repeatPassword: new FormControl('', [
        Validators.required
      ]),
      direccion: new FormControl('', [
        Validators.required
      ]),
      zona_geografica: new FormControl('', [
        Validators.required
      ]),
      cp: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{5}$/)
      ])
    }, []);
  }

  get nombre() {
    return this.miForm.get('nombre');
  }

  get apellidos() {
    return this.miForm.get('apellidos');
  }

  get email() {
    return this.miForm.get('email');
  }

  get username() {
    return this.miForm.get('username');
  }

  get password() {
    return this.miForm.get('password');
  }

  get repeatPassword() {
    return this.miForm.get('repeatPassword');
  }

  get direccion() {
    return this.miForm.get('direccion');
  }

  get zona_geografica() {
    return this.miForm.get('zona_geografica');
  }

  get cp() {
    return this.miForm.get('cp');
  }

  registrar() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }

    // Comprobacion simple de que las dos contrasenas coinciden
    if (this.password?.value !== this.repeatPassword?.value) {
      this.tipo = false;
      this.mensaje = 'Las contraseñas no coinciden';
      return;
    }

    // El formulario recoge los datos que rellena el usuario; el backend completa
    // el resto (foto, roles_id, bloqueado y created_at). La contrasena repetida
    // no se envia: solo sirve para validar en el cliente.
    const nuevoUsuario = {
      nombre: this.miForm.value.nombre,
      apellidos: this.miForm.value.apellidos,
      email: this.miForm.value.email,
      username: this.miForm.value.username,
      password: this.miForm.value.password,
      direccion: this.miForm.value.direccion,
      zona_geografica: this.miForm.value.zona_geografica,
      cp: this.miForm.value.cp
    };

    this.usersService.registerUser(nuevoUsuario).subscribe({
      next: () => {
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
