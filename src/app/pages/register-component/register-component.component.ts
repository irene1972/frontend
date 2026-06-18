import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { LoginRegister } from '../../components/organisms/login-register/login-register';
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
      ])
    }, []);
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

    // Registro simplificado con los datos esenciales: email, usuario y contrasena.
    // El resto de los datos del perfil (nombre, apellidos, direccion, foto, etc.) se
    // completan despues en "editar perfil". La contrasena repetida no se envia: solo
    // sirve para validar en el cliente.
    const nuevoUsuario = {
      email: this.miForm.value.email,
      username: this.miForm.value.username,
      password: this.miForm.value.password
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
