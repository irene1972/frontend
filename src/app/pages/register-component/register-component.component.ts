import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { LoginRegister } from '../../components/organisms/login-register/login-register';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users-service';
import Swal from 'sweetalert2';

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
      nombre: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      apellidos: new FormControl('', [Validators.required, Validators.maxLength(100)]),
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
      nombre: this.miForm.value.nombre,
      apellidos: this.miForm.value.apellidos,
      email: this.miForm.value.email,
      username: this.miForm.value.username,
      password: this.miForm.value.password,
      // Campos NOT NULL en BD sin default; vacios al alta, se completan en "editar perfil"
      foto: '',
      direccion: '',
      zona_geografica: ''
    };

    this.usersService.registerUser(nuevoUsuario).subscribe({
      next: () => {
        Swal.fire({
          title: 'Cuenta creada',
          text: 'Tu cuenta se ha creado correctamente. Ya puedes iniciar sesión.',
          icon: 'success',
          confirmButtonColor: '#003594'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        this.tipo = false;

        if (err.status === 409 && err.error?.error) {
          this.mensaje = err.error.error;
        } else if (err.status === 400 && err.error?.detalles) {
          const detalles = Object.values(err.error.detalles) as string[];
          this.mensaje = detalles[0] ?? 'Revisa los datos del formulario.';
        } else {
          this.mensaje = 'No se ha podido crear la cuenta. Revisa los datos e inténtalo de nuevo.';
        }

        this.cd.detectChanges();
      }
    });
  }

}
