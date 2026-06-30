import { Component, computed, inject, input, signal } from '@angular/core';
import { ReportsService } from '../../../services/reports-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticlesService } from '../../../services/articles-service';
import { IArticle } from '../../../interfaces/i-article';
import { lastValueFrom } from 'rxjs';
import { Breadcrum } from "../../../components/molecules/breadcrum/breadcrum";
import { Button } from "../../../components/atoms/button/button";
import { Toast } from "../../../components/atoms/toast/toast";
import { HomeBar } from "../../../components/organisms/home-bar/home-bar";
import { Sidebar } from "../../../components/organisms/sidebar/sidebar";
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-report-page',
  imports: [ReactiveFormsModule, Breadcrum, Button, Toast, HomeBar, Sidebar],
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

  //toast
  showToast = signal(false);
  toastVariant = signal<'success' | 'error'>('success');
  private router = inject(Router);

  //options
  motivoOptions = [
  { value: 'Artículo prohibido o ilegal',    label: 'Artículo prohibido o ilegal' },
  { value: 'Contenido ofensivo o inapropiado',  label: 'Contenido ofensivo o inapropiado' },
  { value: 'Sospecha de estafa o fraude',       label: 'Sospecha de estafa o fraude' },
  { value: 'Artículo duplicado',    label: 'Artículo duplicado' },
  { value: 'Precio o descripción engañosa',     label: 'Precio o descripción engañosa' },
  { value: 'Otro motivo',         label: 'Otro motivo' },
  ];

  ngOnInit() {
    this.loadProduct()
  }

  constructor(){
    this.reportForm = new FormGroup({
      motivo: new FormControl('',[Validators.required]),
      descripcion: new FormControl(''),
    });
  }

  async getDataForm(){

    // Usuario Logeado
    const userId = this.getLoggedUserId();
    const reportedUserId = this.reportedProduct()?.usuarios_id;

    const payload = {
      usuario_reportado_id: reportedUserId,
      usuario_reportante_id: userId,
      articulos_id: Number(this.productID()),
      motivo: this.reportForm.value.motivo,
      descripcion: this.reportForm.value.descripcion,
      estado: 'Pendiente',
    }

    try {
      await lastValueFrom(this.reportService.postReport(payload));

      const articulo = this.reportedProduct();
      if(articulo){
        await lastValueFrom(this.articleService.updateArticle(articulo.id, {
          ...articulo,
          estado_articulo_id: 'En_revision'
        }));
      }

      this.toastVariant.set('success');
      this.showToast.set(false);
      setTimeout(() => this.showToast.set(true), 10)
      setTimeout(() => this.router.navigate(['/home']), 3500);

    } catch (error) {
      this.toastVariant.set('error');
      this.showToast.set(false);
      setTimeout(() => this.showToast.set(true), 10);
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
    { label: this.reportedProduct()?.titulo ?? 'Producto', route: `/product/${this.productID()}` },
  ]);   

}
