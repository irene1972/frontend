import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ReviewUser } from '../../../molecules/cards/review-user/review-user';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../../../../services/orders-service';
import { RatingsService } from '../../../../services/ratings-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-write-review',
  imports: [ReviewUser, RouterLink, ReactiveFormsModule],
  templateUrl: './write-review.html',
  styleUrl: './write-review.css',
})
export class WriteReview {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  valor: number = 0;
  pedido: any = {};
  ordersService = inject(OrdersService);
  ratingsService = inject(RatingsService);
  private router = inject(Router);

  constructor(private cd: ChangeDetectorRef, private route: ActivatedRoute) {
    this.miForm = new FormGroup({
      comentario: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    }, []);
  }

  get comentario() {
    return this.miForm.get('comentario');
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    console.log(id);

    this.ordersService.getAllDataOrderById(Number(id)).subscribe({
      next: (data) => {
        console.log(data);
        this.pedido = data;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.mensaje = err;
        return;
      }
    });
  }

  loadData() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    if (this.valor === 0) {
      this.mensaje = 'Debe elegir un número de estrellitas';
      return;
    }
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      const user = JSON.parse(usuarioString);

      this.miForm.value.articulos_id = this.pedido.articulos_id;
      this.miForm.value.puntuacion = this.valor;
      this.miForm.value.mensaje = this.miForm.value.comentario;
      this.miForm.value.usuario_valorador_id = user.id;

      this.ratingsService.insertRating(this.miForm.value).subscribe({
        next: (data) => {
          if (data.mensaje === 'Valoración creada correctamente') {
            Swal.fire('Enviado!', '', 'success');
            this.router.navigate(['/user/panel/my-purchases']);
          }
        },
        error: (err) => {
          console.error(err);
          this.mensaje = err;
          return;
        }
      });

    }
  }
  pasarDato(valor: number) {
    this.valor = valor;
  }
}
