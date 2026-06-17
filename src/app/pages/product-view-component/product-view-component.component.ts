import { Component } from '@angular/core';
import { Button } from "../../atoms/button/button";
import { Badge } from "../../atoms/badge/badge";

@Component({
  selector: 'app-product-view-component',
  imports: [Button, Badge],
  templateUrl: './product-view-component.component.html',
  styleUrl: './product-view-component.component.css',
})
export class ProductViewComponentComponent {

}
