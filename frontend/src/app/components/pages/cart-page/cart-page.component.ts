import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/cartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cart!: Cart;
  constructor(private cartServise:CartService) {
    this.cartServise.getCartObservable().subscribe((cart)=>this.cart = cart);
   }
  ngOnInit(): void {

  }

  removeFromCart(cartItem:CartItem){
    this.cartServise.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem:CartItem, quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartServise.changeQuantity(cartItem.food.id, quantity);
  }
}
