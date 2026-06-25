import { Component, computed, inject } from '@angular/core';
import { Breadcrum } from "../../components/molecules/breadcrum/breadcrum";
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-view',
  imports: [ Breadcrum],
  templateUrl: './review-view.html',
  styleUrl: './review-view.css',
})
export class ReviewView {
  router = inject(Router)
  protected breadcrumbItems = computed(() => [
  { label: 'Inicio', route: '/' },
  { label: 'Productos'},
  { label: 'lowdjh' }
  ]);

}
