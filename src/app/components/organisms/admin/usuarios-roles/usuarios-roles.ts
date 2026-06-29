import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { Buscador } from '../../../molecules/buscador/buscador';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../../../services/users-service';
import { IUsuario } from '../../../../interfaces/i-usuario';
import { NgStyle } from '@angular/common';
import { Breadcrum } from "../../../molecules/breadcrum/breadcrum";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-roles',
  imports: [Buscador, RouterLink, NgStyle, Breadcrum],
  templateUrl: './usuarios-roles.html',
  styleUrl: './usuarios-roles.css',
})
export class UsuariosRoles {
  mensaje: string = '';
  tipo: boolean = false;
  usuarios: IUsuario[] = [];
  usersService = inject(UsersService);
  iniciales: string = '';
  usersCount: number = 0;
  usersCountRol: number = 0;
  usersCountBlocked: number = 0;
  textoBusqueda: string = '';
  placeholder: string = 'Buscar usuario por nombre o correo...';

  /*paginación */
  paginaActual = 1;
  elementosPorPagina = 10;

  constructor(private cd: ChangeDetectorRef) { }

  get usuariosFiltrados(): IUsuario[] {
    if (!this.textoBusqueda.trim()) {
      return this.usuarios;
    }

    const texto = this.textoBusqueda.toLowerCase();

    return this.usuarios.filter(usuario =>
      usuario.nombre?.toLowerCase().includes(texto) ||
      usuario.apellidos?.toLowerCase().includes(texto) ||
      usuario.email?.toLowerCase().includes(texto)
    );
  }

  /*Paginación */
  get usuariosPaginados(): IUsuario[] {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;

    return this.usuariosFiltrados.slice(inicio, fin);
  }

  get totalPaginas(): number {
    return Math.ceil(
      this.usuariosFiltrados.length / this.elementosPorPagina
    );
  }

  get paginas(): number[] {
    const paginas: number[] = [];

    for (let i = 1; i <= this.totalPaginas; i++) {
      paginas.push(i);
    }

    return paginas;
  }
  /************ */
  ngOnInit() {

    this.usersService.getAllUsers().subscribe({
      next: (data) => {
        if (data.error) {
          this.mensaje = data.error;
          return;
        } else {
          this.usuarios = data;
          this.cd.detectChanges();
        }
      },
      error: (err) => {
        console.error(err);

      }
    });

    this.usersService.getCount().subscribe({
      next: (data) => {
        if (data.error) {
          this.mensaje = data.error;
          return;
        } else {
          this.usersCount = data.count;
          this.cd.detectChanges();
        }
      },
      error: (err) => {
        console.error(err);

      }
    });

    this.usersService.getCountRol().subscribe({
      next: (data) => {
        if (data.error) {
          this.mensaje = data.error;
          return;
        } else {
          this.usersCountRol = data.count;
          this.cd.detectChanges();
        }
      },
      error: (err) => {
        console.error(err);

      }
    });

    this.usersService.getCountBlocked().subscribe({
      next: (data) => {
        if (data.error) {
          this.mensaje = data.error;
          return;
        } else {
          this.usersCountBlocked = data.count;
          this.cd.detectChanges();
        }
      },
      error: (err) => {
        console.error(err);

      }
    });

  }

  borrar(user_id: number) {

    Swal.fire({
      title: '¿Estás seguro de eliminar el usuario?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#ff0000',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usersService.deleteUser(user_id).subscribe({
          next: (data) => {
            if (data.error) {
              this.mensaje = data.error;
              return;
            } else {
              Swal.fire('Eliminado!', '', 'success');
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
          },
          error: (err) => {
            console.error(err);

          }
        });
      }
    });
  }
  /*Paginación */
  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
  }
  /********* */

  protected breadcrumbItems = computed(() => [
    { label: 'Panel', route: '/admin/panel/' },
    { label: 'Usuarios', route: 'users' }
  ]);
}
