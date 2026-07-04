import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Icon } from '../../components/atoms/icon/icon';
import { UsersService } from '../../services/users-service';
import Swal from 'sweetalert2';

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
  private router = inject(Router);

  userID = '';
  iniciales = 'MG';
  mensaje = '';
  tipo = false;

  // Previsualización de la foto seleccionada (solo cliente; la subida real depende del backend)
  fotoPreview: string | null = null;

  miForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    apellidos: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    ubicacion: new FormControl('', [Validators.required]),
    direccion: new FormControl(''),
    cp: new FormControl('', [Validators.pattern(/^\d{5}$/)]),
  });

  get nombre() { return this.miForm.get('nombre'); }
  get apellidos() { return this.miForm.get('apellidos'); }
  get username() { return this.miForm.get('username'); }
  get email() { return this.miForm.get('email'); }
  get ubicacion() { return this.miForm.get('ubicacion'); }
  get direccion() { return this.miForm.get('direccion'); }
  get cp() { return this.miForm.get('cp'); }

  // Formulario independiente para el cambio de contraseña
  mostrarCambioPass = signal(false);
  passwordForm = new FormGroup({
    nuevaPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repetirPassword: new FormControl('', [Validators.required]),
  });
  get nuevaPassword() { return this.passwordForm.get('nuevaPassword'); }
  get repetirPassword() { return this.passwordForm.get('repetirPassword'); }
  passwordsCoinciden(): boolean {
    return this.passwordForm.value.nuevaPassword === this.passwordForm.value.repetirPassword;
  }

  ngOnInit(): void {
    this.userID = this.route.snapshot.params['userID'] ?? '';

    // Precarga real desde el backend (GET /usuarios/:id).
    // Campos editables: username, ubicacion (zona_geografica), direccion y cp.
    // El email se precarga pero no es editable.
    if (this.userID) {
      this.usersService.getUserById(this.userID).subscribe({
        next: (usuario) => {
          if (usuario) {
            this.miForm.patchValue({
              nombre: usuario.nombre ?? '',
          apellidos: usuario.apellidos ?? '',
          username: usuario.username ?? '',
              email: usuario.email ?? '',
              direccion: usuario.direccion ?? '',
              cp: usuario.cp ?? '',
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
        // El backend hace update parcial: enviamos solo los campos editables que existen
    // en la BBDD. Lo que no enviamos (incluida la password) se conserva.
    // El email no se envia (no editable) y la password se conserva en el backend.
    const body: any = {
      nombre: this.miForm.value.nombre,
      apellidos: this.miForm.value.apellidos,
      username: this.miForm.value.username,
      zona_geografica: this.miForm.value.ubicacion,
    };
    // direccion y cp solo se envian si tienen valor (update parcial en backend).
    if (this.miForm.value.direccion) body.direccion = this.miForm.value.direccion;
    if (this.miForm.value.cp) body.cp = this.miForm.value.cp;

    this.usersService.updateUser(Number(this.userID), body).subscribe({
      next: (usuario) => {
        // Reflejar el username actualizado en el localStorage para el resto de la app
        const u = localStorage.getItem('usuarioBuy&Sell');
        if (u) {
          const userLocal = JSON.parse(u);
          userLocal.username = usuario.username ?? userLocal.username;
          localStorage.setItem('usuarioBuy&Sell', JSON.stringify(userLocal));
        }
        this.tipo = true;
        this.mensaje = 'Perfil actualizado correctamente';
        this.cd.detectChanges();
        setTimeout(() => this.router.navigate(['/user/panel/profile']), 800);
      },
      error: (err) => {
        console.error(err);
        this.tipo = false;
        const backendMsg = err?.error?.detalles?.[0] ?? err?.error?.error;
        this.mensaje = backendMsg ? backendMsg : 'No se ha podido actualizar el perfil';
        this.cd.detectChanges();
      }
    });
  }

  // Despliega u oculta los campos de cambio de contraseña
  toggleCambioPass(): void {
    const nuevo = !this.mostrarCambioPass();
    this.mostrarCambioPass.set(nuevo);
    if (!nuevo) this.passwordForm.reset();
  }

  // Cambia la contraseña enviando solo el campo password (update parcial en el backend).
  // NOTA: no se verifica la contraseña actual porque el backend no expone endpoint para ello;
  // se sigue el mismo patron que admin-moderator. Pendiente: endpoint dedicado que valide la actual.
  guardarPassword(): void {
    if (!this.passwordForm.valid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    if (this.passwordForm.value.nuevaPassword !== this.passwordForm.value.repetirPassword) {
      Swal.fire({ title: 'Las contraseñas no coinciden', text: 'Revisa que ambas contraseñas sean iguales.', icon: 'warning', confirmButtonColor: '#003594' });
      return;
    }
    const passBody: any = { password: this.passwordForm.value.nuevaPassword };
    this.usersService.updateUser(Number(this.userID), passBody).subscribe({
      next: () => {
        this.passwordForm.reset();
        this.mostrarCambioPass.set(false);
        this.cd.detectChanges();
        Swal.fire({ title: 'Contraseña actualizada', text: 'Tu contraseña se ha cambiado correctamente.', icon: 'success', confirmButtonColor: '#003594' });
      },
      error: (err) => {
        console.error(err);
        const backendMsg = err?.error?.detalles?.[0] ?? err?.error?.error;
        Swal.fire({ title: 'Error', text: backendMsg ? backendMsg : 'No se ha podido cambiar la contraseña.', icon: 'error', confirmButtonColor: '#003594' });
      }
    });
  }
}
