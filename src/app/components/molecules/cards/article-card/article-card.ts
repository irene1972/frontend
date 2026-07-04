import { Component, inject, input, output } from '@angular/core';
import { ButtonIcon } from '../../../atoms/button-icon/button-icon';
import { Badge } from '../../../atoms/badge/badge';
import { BadgeCondition } from '../../../atoms/badge/badge.types';
import { ArticleCardVariant } from './article-card.config';
import { UserCard } from "../../user-card/user-card";
import { Icon } from "../../../atoms/icon/icon";
import { Button } from "../../../atoms/button/button";
import { ButtonIconStates } from '../../../atoms/button-icon/button-icon.config';
import { Router } from '@angular/router';
import { ArticleStatus } from '../../../../enums/article-status.enum';

/**
 * Molécula para mostrar un artículo de segunda mano en formato tarjeta.
 *
 * Soporta tres variantes de presentación según el contexto de uso:
 * - minimal: imagen + precio + nombre + ubicación (listados compactos)
 * - normal: imagen + usuario vendedor + precio con descuento + botón de detalle
 * - outstanding: imagen + nombre + precio + botón de compra directa
 *
 * @input variant   - Variante de presentación de la tarjeta
 * @input like      - Muestra el botón de favorito sobre la imagen
 * @input state     - Estado del artículo (BadgeCondition: 'Como nuevo', etc.)
 * @input img       - URL de la imagen del artículo
 * @input price_old - Precio original antes del descuento. Si es 0/null no se muestra
 * @input price     - Precio actual del artículo
 * @input name      - Nombre del artículo
 * @input location  - Ubicación del vendedor
 * @input route     - Ruta de navegación al detalle del artículo
 *
 * @output articleCardClick - Emite el estado del botón like al pulsarlo
  *
 * @example
 * <!-- Minimal: listados compactos -->
 * <molecule-article-card variant="minimal" name="iPhone 14 Pro" [price]="650"
 *   location="Madrid, Centro" state="Como nuevo" route="/articulos/123"
 * />
 *
 * <!-- Normal: con vendedor, descuento y botón de detalle -->
 * <molecule-article-card variant="normal" name="MacBook Pro M2" [price]="1200"
 *  [price_old]="1500" location="Barcelona, Gràcia" state="Buen estado"
 *  route="/articulos/456"
 * />
 *
 * <!-- Outstanding: destacado con compra directa -->
 * <molecule-article-card variant="outstanding" name="Sony WH-1000XM5" 
 *   [price]="250" state="Como nuevo"
 *   route="/articulos/789"/>
 */
@Component({
  selector: 'molecule-article-card',
  imports: [Badge, ButtonIcon, UserCard, Icon, Button],
  templateUrl: './article-card.html',
  styleUrl: './article-card.css',
})
export class ArticleCard {
  protected readonly ARTICLE_STATUS = ArticleStatus;

  public variant   = input<ArticleCardVariant>('minimal')
  public like      = input<boolean>(true);
  public state     = input<BadgeCondition>('Como nuevo');
  public img       = input<string>("https://placehold.co/400x200");
  public price_old = input<number>(750);
  public price     = input<number>(650);
  public article_name = input<string>("Article Name");
  public user_name = input<string>("Name");
  public user_last_name = input<string>("Lastname");
  public location  = input<string>("Madrid, Centro");
  public ratings   = input<string>("");
  public route     = input<string>("");
  public estadoArticulo = input<string>(this.ARTICLE_STATUS.PUBLISHED);

  private router = inject(Router);

  public articleCardClick = output<ButtonIconStates>();

  protected selectArticle(event: ButtonIconStates){
    this.articleCardClick.emit(event);
  }

  protected navArticleDetail() {
    this.router.navigate([this.route()]);
  }
  
}
