import { Component, Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Store } from '../classes/store';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-product-structure',
  templateUrl: './product-structure.component.html',
  styleUrls: ['./product-structure.component.css']
})
export class ProductStructureComponent {
  storesList:Store[];
  productsList:Product[];
  searchValue:string="";

  constructor(private router:Router, private http:HttpClient){
    this.productsList=[];
    this.storesList=[];
  }

  ngOnInit(){
    this.getProductsList();
  }

  getProductsList(){
    this.http.get<Product[]>('http://localhost:8080/products').subscribe((result:any)=>{
      this.productsList=result;
    })
  }
  
  getStoresList(){
    this.http.get<Store[]>('http://localhost:8080/stores').subscribe((result:any)=>{
    this.storesList=result;
    console.log(this.storesList);
    })
  }


}
