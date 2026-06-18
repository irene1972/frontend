import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { LoginRegister } from '../../components/organisms/login-register/login-register';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-login-component',
  imports: [LoginRegister, ReactiveFormsModule, RouterLink],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css',
})
export class LoginComponentComponent {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  loginService = inject(LoginService);
  user: any = {};

  constructor(private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {
    this.miForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    }, []);
  }

  get email() {
    return this.miForm.get('email');
  }

  get password() {
    return this.miForm.get('password');
  }

  loadData() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);
    
    this.loginService.loginUser(this.miForm.value).subscribe({
      next: (data) => {
        this.user.username = data.usuario.username;
        this.user.rol = data.usuario.roles_id;
        //this.user.nombre=data.usuario.nombre;
        //this.user.apellidos=data.usuario.apellidos;
        this.user.id=data.usuario.id;
        this.user.iniciales=(data.usuario.nombre[0]+data.usuario.apellidos[0]).toUpperCase();

        localStorage.setItem(
          'usuarioBuy&Sell',
          JSON.stringify(this.user)
        );

        if (this.user.rol === 'Administrador') {
          window.location.href='/admin';
          /*this.router.navigate(['/admin']);*/
        } else if (this.user.rol === 'Moderador') {
          window.location.href='/moderator';
          /*this.router.navigate(['/moderator']);*/
        } else {
          window.location.href='/home';
          /*this.router.navigate(['/home']);*/
        }
      },

      error: (err) => {
        console.error(err);
        
        this.mensaje = 'Email y/o contraseña incorrectos. Inténtelo de nuevo.';
        this.cd.detectChanges();
      }
    });


  }

}


