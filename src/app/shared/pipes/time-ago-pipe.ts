import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';

    const date = new Date(value);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Publicado hoy';
    if (diffDays === 1) return 'Publicado hace 1 día';
    if (diffDays < 30) return `Publicado hace ${diffDays} días`;
    
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return 'Publicado hace 1 mes';
    if (diffMonths < 12) return `Publicado hace ${diffMonths} meses`;
    
    const diffYears = Math.floor(diffDays / 365);
    if (diffYears === 1) return 'Publicado hace 1 año';
    return `Publicado hace ${diffYears} años`;
  }
}
