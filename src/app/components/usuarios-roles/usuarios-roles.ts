import { Component } from '@angular/core';
import { Buscador } from '../../shared/buscador/buscador';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuarios-roles',
  imports: [Buscador,RouterLink],
  templateUrl: './usuarios-roles.html',
  styleUrl: './usuarios-roles.css',
})
export class UsuariosRoles {

}
