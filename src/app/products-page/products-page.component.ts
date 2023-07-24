import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../classes/product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '../classes/store';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent {
  storesList:Store[];
  private productsList:Product[];
  cityValue:string="";

  constructor(private router:Router, private http:HttpClient){
    this.storesList=[];
    this.productsList=[];

  }

  goTohomePage() {
    this.router.navigate(['/home']);
  }

  ngOnInit(){
    this.getProductsList();
    this.getStoresList();
  }

  getProductsList(){
    this.http.get<Product[]>('http://localhost:8080/products').subscribe((result:any)=>{
      this.productsList=result;
      console.log(this.productsList);
    })
  }

  getStoresList(){
    this.http.get<Store[]>('http://localhost:8080/stores').subscribe((result:any)=>{
    this.storesList=result;
    console.log(this.storesList);
    })
  }


}
