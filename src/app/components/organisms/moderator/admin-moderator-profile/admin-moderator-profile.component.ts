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
            password: '********',
            foto: data.foto,
            direccion: data.direccion,
            zona_geografica:
              data.zona_geografica || data['zona_geográfica'],
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

    if (
      this.nuevaPassword.trim() &&
      this.nuevaPassword.trim().length < 8
    ) {
      Swal.fire({
        title: 'Contraseña demasiado corta',
        text: 'La nueva contraseña debe tener al menos 8 caracteres.',
        icon: 'warning',
        confirmButtonColor: '#003594'
      });
      return;
    }

    const body: any = {};

    if (this.form.nombre !== this.formOriginal.nombre) {
      body.nombre = this.form.nombre;
    }

    if (this.form.apellidos !== this.formOriginal.apellidos) {
      body.apellidos = this.form.apellidos;
    }

    if (this.form.username !== this.formOriginal.username) {
      body.username = this.form.username;
    }

    if (this.form.foto !== this.formOriginal.foto) {
      body.foto = this.form.foto;
    }

    if (this.form.direccion !== this.formOriginal.direccion) {
      body.direccion = this.form.direccion;
    }

    if ( this.form.zona_geografica !== this.formOriginal.zona_geografica) {
      body.zona_geografica = this.form.zona_geografica;
    }

    if (this.form.cp !== this.formOriginal.cp) {
      body.cp = this.form.cp;
    }

    if (this.nuevaPassword.trim()) {
      body.password = this.nuevaPassword.trim();
    }

    if (Object.keys(body).length === 0) {
      this.editando = false;
      return;
    }

    this.usersService.updateUser(this.user.id, body).subscribe({
      next: (data) => {

        this.user = {
          ...this.user,
          ...data
        };

        this.form = {
          ...this.form,
          ...data,
          password: '********'
        };

        this.formOriginal = { ...this.form };
        this.nuevaPassword = '';

        localStorage.setItem(
          'usuarioBuy&Sell',
          JSON.stringify({
            id: this.user.id,
            username: this.user.username,
            rol: this.user.roles_id,
            iniciales: this.user.iniciales
          })
        );

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

        let mensaje = 'No se ha podido actualizar el perfil.';

        if (campo === 'username') {
          mensaje = 'Ese nombre de usuario ya está en uso. Prueba con otro.';
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