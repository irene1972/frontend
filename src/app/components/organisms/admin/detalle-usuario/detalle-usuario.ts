import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUsuario } from '../../../../interfaces/i-usuario';
import { UsersService } from '../../../../services/users-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RatingsService } from '../../../../services/ratings-service';
import Swal from 'sweetalert2';
import { OrdersService } from '../../../../services/orders-service';
import { ArticlesService } from '../../../../services/articles-service';
import { Breadcrum } from '../../../molecules/breadcrum/breadcrum';

@Component({
  selector: 'app-detalle-usuario',
  imports: [ReactiveFormsModule, DatePipe, Breadcrum],
  templateUrl: './detalle-usuario.html',
  styleUrl: './detalle-usuario.css',
})
export class DetalleUsuario {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  usuario!: IUsuario;
  usersService = inject(UsersService);
  ratingsService = inject(RatingsService);
  ordersService = inject(OrdersService);
  articlesService = inject(ArticlesService);
  ratings: any = {};
  sales: any = {};
  articles: any = {};

  constructor(private cd: ChangeDetectorRef, private route: ActivatedRoute) {
    this.miForm = new FormGroup({
      rol: new FormControl('', [])
    }, []);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    console.log(id);

    this.usersService.getUserById(id).subscribe({
      next: (data) => {
        if (data.error) {
          this.mensaje = data.error;
          return;
        } else {
          console.log(data);
          this.usuario = data;

          this.ratingsService.getAverageRatingsByUser(this.usuario.id).subscribe({
            next: (data) => {
              if (data.error) {
                this.mensaje = data.error;
                return;
              } else {
                console.log(data);
                this.ratings = data;
                this.cd.detectChanges();
              }
            },
            error: (err) => {
              console.error(err);

            }
          });

          this.ordersService.getOrdersByUser(this.usuario.id).subscribe({
            next: (data) => {
              if (data.error) {
                this.mensaje = data.error;
                return;
              } else {
                console.log(data);
                this.sales = data;
                this.cd.detectChanges();
              }
            },
            error: (err) => {
              console.error(err);

            }
          });

          this.articlesService.getCountArticlesByUser(this.usuario.id).subscribe({
            next: (data) => {
              if (data.error) {
                this.mensaje = data.error;
                return;
              } else {
                console.log(data);
                this.articles = data;
                this.cd.detectChanges();
              }
            },
            error: (err) => {
              console.error(err);

            }
          });

          this.miForm.patchValue({
            rol: this.usuario?.roles_id
          });

          this.cd.detectChanges();
        }
      },
      error: (err) => {
        console.error(err);

      }
    });

  }

  loadData(user_id: number) {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);
    Swal.fire({
      title: "¿Está seguro de que quiere cambiar el rol?",
      icon: "info",
      html: ``,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `Aceptar`,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: `Cancelar`,
      cancelButtonAriaLabel: "Thumbs down"
    }).then((result) => {
      if (result.isConfirmed) {
        const body: any = {};

        this.usersService.updateRole(user_id, body, this.miForm.value.rol).subscribe({
          next: (data) => {
            if (data.error) {
              this.mensaje = data.error;
              return;
            } else {
              console.log(data);
              window.location.reload();
            }
          },
          error: (err) => {
            console.error(err);

          }
        });

      }

      if (result.isDismissed) {
        console.log('Usuario canceló');
      }
    });
  }

  blockUser(user_id: number) {
    Swal.fire({
      title: "¿Está seguro de que quiere cambiar el estado de bloqueo?",
      icon: "info",
      html: ``,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `Aceptar`,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: `Cancelar`,
      cancelButtonAriaLabel: "Thumbs down"
    }).then((result) => {
      if (result.isConfirmed) {
        const bloqueo = (this.usuario.bloqueado === 1) ? 0 : 1;
        const body: any = {};

        this.usersService.updateBlock(user_id, body, bloqueo).subscribe({
          next: (data) => {
            if (data.error) {
            this.mensaje = data.error;
            return;
          } else {
            console.log(data);
            window.location.reload();
          }
          },
          error: (err) => {
            console.error(err);

          }
        });

      }

      if (result.isDismissed) {
        console.log('Usuario canceló');
      }
    });
  }

  protected breadcrumbItems = () => [
    { label: 'Panel', route: '/admin/panel/' },
    { label: 'Usuarios', route: '/admin/panel/users' },
    { label: `${this.usuario.nombre} ${this.usuario.apellidos[0]}.`, route: String(this.usuario.id) }
  ];
}

