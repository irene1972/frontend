import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-usuario',
  imports: [ReactiveFormsModule],
  templateUrl: './detalle-usuario.html',
  styleUrl: './detalle-usuario.css',
})
export class DetalleUsuario {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;

  constructor(private cd: ChangeDetectorRef) {
    this.miForm = new FormGroup({
      rol: new FormControl('',[])
    }, []);
  }

  loadData() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);
  }

  blockUser(){
    console.log('prueba');
  }
}
