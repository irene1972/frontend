import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUsuario } from '../../interfaces/i-usuario';
import { UsersService } from '../../services/users-service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detalle-usuario',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './detalle-usuario.html',
  styleUrl: './detalle-usuario.css',
})
export class DetalleUsuario {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  usuario!: IUsuario;
  usersService = inject(UsersService);

  constructor(private cd: ChangeDetectorRef, private route: ActivatedRoute) {
    this.miForm = new FormGroup({
      rol: new FormControl('', [])
    }, []);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    console.log(id);

    this.usersService.getUserById(id).subscribe((data) => {
      if (data.error) {
        this.mensaje = data.error;
        return;
      } else {
        console.log(data);
        this.usuario = data;
        this.miForm.patchValue({
          rol: this.usuario?.roles_id
        });

        this.cd.detectChanges();
      }
    });
  }

  loadData() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);
  }

  blockUser() {
    console.log('prueba');
  }

}
