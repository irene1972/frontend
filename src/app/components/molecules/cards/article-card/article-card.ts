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

@Component({
  selector: 'molecule-article-card',
  imports: [Badge, ButtonIcon, UserCard, Icon, Button],
  templateUrl: './article-card.html',
  styleUrl: './article-card.css',
})
export class ArticleCard {
  public variant   = input<ArticleCardVariant>('minimal')
  public like      = input<boolean>(true);
  public state     = input<BadgeCondition>('Como nuevo');
  public img       = input<string>("https://placehold.co/400x200");
  public price_old = input<number>(750);
  public price     = input<number>(650);
  public name      = input<string>("Article Name");
  public location  = input<string>("Madrid, Centro");
  public route     = input<string>("");

  private router = inject(Router);

  public articleCardClick = output<ButtonIconStates>();

  protected selectArticle(event: ButtonIconStates){
    this.articleCardClick.emit(event);
  }

  protected navArticleDetail() {
    this.router.navigate([this.route()]);
  }
  
}
