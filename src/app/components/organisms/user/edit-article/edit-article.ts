import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-article',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './edit-article.html',
  styleUrl: './edit-article.css',
})
export class EditArticle {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;

  constructor(private cd: ChangeDetectorRef) {
    this.miForm = new FormGroup({
      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      categoria: new FormControl('', [
        Validators.required
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      precio: new FormControl('', [
        Validators.required
      ]),
      ubicacion: new FormControl('', [
        Validators.required
      ])
    }, []);
  }
  get titulo() {
    return this.miForm.get('titulo');
  }
  get categoria() {
    return this.miForm.get('categoria');
  }
  get descripcion() {
    return this.miForm.get('descripcion');
  }
  get precio() {
    return this.miForm.get('precio');
  }
  get ubicacion() {
    return this.miForm.get('ubicacion');
  }
  loadData(){
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);
  }
}
