import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../../services/users-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-moderator-profile',
  imports: [RouterLink, FormsModule],
  templateUrl: './admin-moderator-profile.component.html',
  styleUrl: './admin-moderator-profile.component.css',
})
export class AdminModeratorProfileComponent {
  usersService = inject(UsersService);

  user: any = {};
  form: any = {};
  formOriginal: any = {};
  rutaPanel: string[] = [];

  nuevaPassword: string = '';
  editando = false;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');

    if (usuarioString) {
      const usuarioLocal = JSON.parse(usuarioString);
      this.user = usuarioLocal;

      this.usersService.getUserById(String(usuarioLocal.id)).subscribe({
        next: (data) => {
          this.user = {
            ...data,
            iniciales: usuarioLocal.iniciales
          };

          this.rutaPanel = this.user.roles_id === 'Moderador' ? ['/moderator/panel/main'] : ['/admin/panel/main'];

          this.form = {
            nombre: data.nombre,
            apellidos: data.apellidos,
            username: data.username,
            email: data.email,
            password: data.password || '********',
            foto: data.foto,
            direccion: data.direccion,
            zona_geografica: data.zona_geografica || data['zona_geográfica'],
            cp: data.cp,
            roles_id: data.roles_id,
            bloqueado: data.bloqueado
          };

          this.formOriginal = { ...this.form };
          this.cd.detectChanges();
        },
        error: (error) => {
          console.error('Error cargando usuario:', error);
        }
      });
    }
  }

  activarEdicion() {
    this.editando = true;
  }

  cancelarEdicion() {
    this.form = { ...this.formOriginal };
    this.nuevaPassword = '';
    this.editando = false;
  }

  guardarCambios() {
    if (this.nuevaPassword.trim() && this.nuevaPassword.trim().length < 6) {
      Swal.fire({
        title: 'Contraseña demasiado corta',
        text: 'La nueva contraseña debe tener al menos 6 caracteres.',
        icon: 'warning',
        confirmButtonColor: '#003594'
      });
      return;
    }

    const body: any = {
      nombre: this.form.nombre,
      apellidos: this.form.apellidos,
      username: this.form.username,
      email: this.form.email,
      password: this.nuevaPassword.trim() ? this.nuevaPassword : this.formOriginal.password,
      foto: this.form.foto,
      direccion: this.form.direccion,
      zona_geografica: this.form.zona_geografica,
      cp: this.form.cp,
      roles_id: this.form.roles_id,
      bloqueado: this.form.bloqueado
    };

    this.usersService.updateUser(this.user.id, body).subscribe({
      next: (data) => {
        this.user = {
          ...data,
          iniciales: this.user.iniciales
        };

        this.form = {
          nombre: data.nombre,
          apellidos: data.apellidos,
          username: data.username,
          email: data.email,
          password: data.password || '********',
          foto: data.foto,
          direccion: data.direccion,
          zona_geografica: data.zona_geografica || data['zona_geográfica'],
          cp: data.cp,
          roles_id: data.roles_id,
          bloqueado: data.bloqueado
        };

        this.formOriginal = { ...this.form };
        this.nuevaPassword = '';

        localStorage.setItem('usuarioBuy&Sell', JSON.stringify({
          id: this.user.id,
          username: this.user.username,
          rol: this.user.roles_id,
          iniciales: this.user.iniciales
        }));

        this.editando = false;
        this.cd.detectChanges();

        Swal.fire({
          title: 'Perfil actualizado',
          text: 'Los cambios se han guardado correctamente.',
          icon: 'success',
          confirmButtonColor: '#003594'
        });
      },
      error: (error) => {
        console.error('Error actualizando usuario:', error);

        const campo = error?.error?.campo;

        let mensaje = '';

        if (campo === 'username') {
          mensaje = 'Ese nombre de usuario ya está en uso. Prueba con otro.';
        } else {
          mensaje = 'No se ha podido actualizar el perfil.';
        }
      
        Swal.fire({
          title: 'Error',
          text: mensaje,
          icon: 'error',
          confirmButtonColor: '#003594'
        });
      }
    });
  }
}