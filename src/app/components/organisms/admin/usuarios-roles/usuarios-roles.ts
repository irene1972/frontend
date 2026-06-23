import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { Buscador } from '../../../molecules/buscador/buscador';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../../../services/users-service';
import { IUsuario } from '../../../../interfaces/i-usuario';
import { NgStyle } from '@angular/common';
import { Breadcrum } from "../../../molecules/breadcrum/breadcrum";

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
  iniciales:string='';
  usersCount:number=0;
  usersCountRol:number=0;
  usersCountBlocked:number=0;
  textoBusqueda:string='';
  placeholder:string='Buscar usuario por nombre o correo...';

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

  ngOnInit(){
    this.usersService.getAllUsers().subscribe((data) => {
      if (data.error) {
        this.mensaje = data.error;
        return;
      } else {
        console.log(data);
        this.usuarios = data;
        this.cd.detectChanges();
      }
    });

    this.usersService.getCount().subscribe((data) => {
      if (data.error) {
        this.mensaje = data.error;
        return;
      } else {
        console.log(data);
        this.usersCount = data.count;
        this.cd.detectChanges();
      }
    });

    this.usersService.getCountRol().subscribe((data) => {
      if (data.error) {
        this.mensaje = data.error;
        return;
      } else {
        console.log(data);
        this.usersCountRol = data.count;
        this.cd.detectChanges();
      }
    });

    this.usersService.getCountBlocked().subscribe((data) => {
      if (data.error) {
        this.mensaje = data.error;
        return;
      } else {
        console.log(data);
        this.usersCountBlocked = data.count;
        this.cd.detectChanges();
      }
    });

  }

  protected breadcrumbItems = computed(() => [
    { label: 'Panel', route: '/admin/panel/' },
    { label: 'Usuarios', route: 'users'}
  ]);



}
