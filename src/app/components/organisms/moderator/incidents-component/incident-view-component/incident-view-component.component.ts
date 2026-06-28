import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReportsService } from '../../../../../services/reports-service';
import { ArticlesService } from '../../../../../services/articles-service';
import { ArticlePhotosService } from '../../../../../services/article-photos.service';
import { UsersService } from '../../../../../services/users-service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-incident-view-component',
  imports: [RouterLink, FormsModule],
  templateUrl: './incident-view-component.component.html',
  styleUrl: './incident-view-component.component.css',
})
export class IncidentViewComponentComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  reportsService = inject(ReportsService);
  articlesService = inject(ArticlesService);
  articlePhotosService = inject(ArticlePhotosService);
  usersService = inject(UsersService)

  articuloId!: number;
  articulo: any = null;
  fotoArticulo: any = null;
  vendedor: any = null;
  reportesArticulo: any[] = [];
  nota: string = '';

  constructor(private cd: ChangeDetectorRef){}

  ngOnInit() {
    this.articuloId = Number(this.route.snapshot.paramMap.get('articuloId'));
    this.cargarArticulo();
    this.cargarReportes();
    this.cargarFotoArticulo();
  }

  cargarArticulo() {
    this.articlesService.getArticleById(this.articuloId).subscribe({
      next: (data) => {
        this.articulo = data;
      
        this.usersService.getUserById(String(this.articulo.usuarios_id)).subscribe({
          next: (user) => {
            this.vendedor = user;
            this.cd.detectChanges();
          },
          error: (error) => {
            console.error('Error cargando vendedor:', error);
          }
        });
      
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando artículo:', error);
      }
    });
  }

  cargarReportes() {
    this.reportsService.getAllReports().subscribe({
      next: (reportes) => {
        this.reportesArticulo = reportes.filter((reporte: any) =>
          reporte.articulos_id === this.articuloId
        );
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando reportes:', error);
      }
    });
  }

  cargarFotoArticulo() {
    console.log('Articulo ID actual:', this.articuloId);

    this.articlePhotosService.getAllArticlePhotos().subscribe({
      next: (fotos) => {
        console.log('Todas las fotos:', fotos);

        const fotosDelArticulo = fotos.filter((foto: any) =>
          Number(foto.articulos_id) === Number(this.articuloId)
        );

        console.log('Fotos del artículo:', fotosDelArticulo);

        this.fotoArticulo = fotosDelArticulo.find((foto: any) =>
          Number(foto.principal) === 1
        );

        console.log('Foto principal:', this.fotoArticulo);
        console.log('URL foto:', this.fotoArticulo?.url_foto);

        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando fotos del artículo:', error);
      }
    });
  }

  getEstadoFront(estado: string): string {
    const estadoNormalizado = estado?.toLowerCase();

    if (estadoNormalizado === 'pendiente') return 'Pendiente';
    if (estadoNormalizado === 'revisado') return 'En revisión';
    if (estadoNormalizado === 'aceptado') return 'Aceptado';
    if (estadoNormalizado === 'descartado') return 'Descartado';

    return estado;
  }

  getEstadoArticuloReportado(): string {
    if (this.reportesArticulo.length === 0) return 'Pendiente';

    const todosGestionados = this.reportesArticulo.every((reporte: any) => {
      const estado = reporte.estado?.toLowerCase();
      return estado === 'aceptado' || estado === 'descartado';
    });

    if (todosGestionados) return 'Gestionado';

    const tieneRevisado = this.reportesArticulo.some((reporte: any) =>
      reporte.estado?.toLowerCase() === 'revisado'
    );

    return tieneRevisado ? 'En revisión' : 'Pendiente';
  }
  
  reporteCerrado(reporte: any): boolean {
    const estado = reporte.estado?.toLowerCase();
    return estado === 'aceptado' || estado === 'descartado';
  }
  
  abrirReporte(reporte: any) {
    if (this.reporteCerrado(reporte)) {
      return;
    }
  
    const estado = reporte.estado?.toLowerCase();
  
    if (estado === 'pendiente') {
      const reporteActualizado = {
        ...reporte,
        estado: 'Revisado'
      };
    
      this.reportsService.updateReport(reporte.id, reporteActualizado).subscribe({
        next: () => {
          this.router.navigate(['/moderator/panel/incident', this.articuloId, reporte.id]);
        },
        error: (error) => {
          console.error('Error actualizando reporte:', error);
        }
      });
    } else {
      this.router.navigate(['/moderator/panel/incident', this.articuloId, reporte.id]);
    }
  }

  quedanReportesAbiertos(): boolean {
    return this.reportesArticulo.some((reporte: any) => {
      const estado = reporte.estado?.toLowerCase();
      return estado === 'pendiente' || estado === 'revisado';
    });
  }

  puedeReactivar(): boolean {
    if (this.reportesArticulo.length === 0) return false;

    return this.reportesArticulo.every((reporte: any) =>
      reporte.estado?.toLowerCase() === 'descartado'
    );
  }

  puedeRetirar(): boolean {
    if (this.reportesArticulo.length === 0) return false;

    return this.reportesArticulo.some((reporte: any) =>
      reporte.estado?.toLowerCase() === 'aceptado'
    ) && !this.quedanReportesAbiertos();
  }

  reactivarArticulo() {
    const articuloActualizado = {
      ...this.articulo,
      estado_articulo_id: 'Publicado'
    };
  
    this.articlesService.updateArticle(this.articuloId, articuloActualizado).subscribe({
      next: () => {
        Swal.fire({
          title: 'Artículo reactivado',
          text: 'El artículo se ha reactivado correctamente.',
          icon: 'success',
          confirmButtonColor: '#003594'
        }).then(() => {
          this.router.navigate(['/moderator/panel/incidents']);
        });
      },
      error: (error) => {
        console.error('Error reactivando artículo:', error);
      
        Swal.fire({
          title: 'Error',
          text: 'No se ha podido reactivar el artículo.',
          icon: 'error',
          confirmButtonColor: '#003594'
        });
      }
    });
  }
  
  retirarArticulo() {
    const articuloActualizado = {
      ...this.articulo,
      estado_articulo_id: 'Retirado'
    };
  
    this.articlesService.updateArticle(this.articuloId, articuloActualizado).subscribe({
      next: () => {
        Swal.fire({
          title: 'Artículo retirado',
          text: 'El artículo se ha retirado correctamente.',
          icon: 'success',
          confirmButtonColor: '#003594'
        }).then(() => {
          this.router.navigate(['/moderator/panel/incidents']);
        });
      },
      error: (error) => {
        console.error('Error retirando artículo:', error);
      
        Swal.fire({
          title: 'Error',
          text: 'No se ha podido retirar el artículo.',
          icon: 'error',
          confirmButtonColor: '#003594'
        });
      }
    });
  }
}