import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Icon } from '../../components/atoms/icon/icon';
import { UsersService } from '../../services/users-service';

@Component({
  selector: 'app-user-form-component',
  imports: [ReactiveFormsModule, RouterLink, Icon],
  templateUrl: './user-form-component.component.html',
  styleUrl: './user-form-component.component.css',
})
export class UserFormComponentComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private cd = inject(ChangeDetectorRef);
  private usersService = inject(UsersService);

  userID = '';
  iniciales = 'MG';
  mensaje = '';
  tipo = false;

  // Previsualización de la foto seleccionada (solo cliente; la subida real depende del backend)
  fotoPreview: string | null = null;

  miForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required]),
    ubicacion: new FormControl('', [Validators.required]),
    biografia: new FormControl(''),
  });

  get username() { return this.miForm.get('username'); }
  get email() { return this.miForm.get('email'); }
  get telefono() { return this.miForm.get('telefono'); }
  get ubicacion() { return this.miForm.get('ubicacion'); }

  ngOnInit(): void {
    this.userID = this.route.snapshot.params['userID'] ?? '';

    // Precarga real desde el backend (GET /usuarios/:id).
    // NOTA: la tabla usuarios no tiene columnas telefono ni biografia,
    // por eso esos dos campos no se precargan (pendiente de equipo/backend).
    if (this.userID) {
      this.usersService.getUserById(this.userID).subscribe({
        next: (usuario) => {
          if (usuario) {
            this.miForm.patchValue({
              username: usuario.username ?? '',
              email: usuario.email ?? '',
              ubicacion: usuario['zona_geogr\u00e1fica'] ?? usuario.zona_geografica ?? '',
            });
            const ini = `${(usuario.nombre ?? '').charAt(0)}${(usuario.apellidos ?? '').charAt(0)}`.toUpperCase();
            if (ini.trim()) this.iniciales = ini;
          }
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.tipo = false;
          this.mensaje = 'No se han podido cargar los datos del perfil.';
          this.cd.detectChanges();
        }
      });
    }
    const u = localStorage.getItem('usuarioBuy&Sell');
    if (u) {
      const user = JSON.parse(u);
      if (user?.iniciales) this.iniciales = user.iniciales;
    }
  }

  // Selección de foto: abre el explorador y previsualiza la imagen elegida (cliente).
  // TODO: subir el fichero al backend (photos/users) cuando haya conexión.
  onFotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.fotoPreview = reader.result as string;
      this.cd.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  guardarCambios(): void {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      this.tipo = false;
      this.mensaje = 'Revisa los campos marcados';
      return;
    }
    // TODO: cablear users-service.update(userID, this.miForm.value) -> PUT al backend.
    // Mientras el backend (localhost:3000) no esté levantado, esto no persiste.
    this.tipo = true;
    this.mensaje = 'Cambios validados correctamente (pendiente de conexión con el backend para guardar)';
    this.cd.detectChanges();
  }
}
