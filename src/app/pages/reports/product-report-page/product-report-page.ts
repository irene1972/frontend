import { Component, computed, inject, input, signal } from '@angular/core';
import { ReportsService } from '../../../services/reports-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ArticlesService } from '../../../services/articles-service';
import { IArticle } from '../../../interfaces/i-article';
import { lastValueFrom } from 'rxjs';
import { Breadcrum } from "../../../components/molecules/breadcrum/breadcrum";
import { Button } from "../../../components/atoms/button/button";

@Component({
  selector: 'app-product-report-page',
  imports: [ReactiveFormsModule, Breadcrum, Button],
  templateUrl: './product-report-page.html',
  styleUrl: './product-report-page.css',
})
export class ProductReportPage {
  productID = input<string>();

  reportForm: FormGroup;

  reportedProduct = signal<IArticle | null>(null);

  // servicio
  reportService = inject(ReportsService);
  articleService = inject(ArticlesService);

  ngOnInit() {
    this.loadProduct()
  }

  constructor(){
    this.reportForm = new FormGroup({
      motivo: new FormControl(''),
      descripcion: new FormControl(''),
    });
  }

  getDataForm(){
    // Usuario Logeado
    const userId = this.getLoggedUserId();

    const payload = {
      usuario_reportante_id: userId,
      articulos_id: Number(this.productID()),
      motivo: this.reportForm.value.motivo,
      descripcion: this.reportForm.value.descripcion,
      estado: 'Pendiente',
    }
  }

  async loadProduct(){
    const id = this.productID();
    if(!id) return;
    try {
      this.reportedProduct.set(await lastValueFrom(this.articleService.getArticleById(Number(id))));
    } catch (error) {
      console.error('Error al cargar el producto:', error);
    }
  }

  private getLoggedUserId(): number {
    const raw = localStorage.getItem('usuarioBuy&Sell');
    return raw ? JSON.parse(raw).id : null!;
  }


  protected breadcrumbItems = computed(() => [
    { label: 'Inicio', route: '/' },
    { label: 'Reportes'},
    { label: 'Titulo' }
  ]);   

}
