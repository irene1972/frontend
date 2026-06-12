import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Buscador } from '../../shared/buscador/buscador';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users-service';
import { IUsuario } from '../../interfaces/i-usuario';

@Component({
  selector: 'app-usuarios-roles',
  imports: [Buscador,RouterLink],
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

  constructor(private cd: ChangeDetectorRef) { }

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



}
