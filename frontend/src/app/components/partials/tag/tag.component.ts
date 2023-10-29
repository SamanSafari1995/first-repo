import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent {
  tags?: Tag[]
  constructor(foodService:FoodService) {
    foodService.getAllTags().subscribe((serverTags)=>{
      this.tags = serverTags
    });
  }
}
