import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../classes/customer';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
   signInFields:boolean = false;
   signUpFields:boolean = false;

   inputCustomerName:string='';
   inputCustomerCity:string='';
   inputCustomerCountry:string='';
   inputCustomerEmail:string='';
   inputCustomerPass:string='';

   inputCustomerEmailLogIn:string='';
   inputCustomerPassLogIn:string='';
   customerList:Customer[];
   customer:Customer = new Customer;
  

    constructor(private router: Router, private http: HttpClient) { 
      this.customerList=[];

   }

   showSignInFields(){
        this.signUpFields= false;
        this.signInFields=!this.signInFields;
   }
   showSignUpFields(){
    this.signInFields= false;
    this.signUpFields=!this.signUpFields;
  }
  goToStorePage() {
      this.router.navigate(['/products']);
    
  }
  
  createCustomer(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    this.customer.customerCity=this.inputCustomerCity;
    this.customer.customerName=this.inputCustomerName;
    this.customer.customerCountry=this.inputCustomerCountry;
    this.customer.customerEmail=this.inputCustomerEmail;
    this.customer.customerPass=this.inputCustomerPass;
    this.http.post<Customer>('http://localhost:8080/addCustomer', this.customer, httpOptions).subscribe((result:Customer)=>{
      alert("Account created successfully!")
      this.goToStorePage();
      })
    
  }

  getCustomerList(){
    this.http.get<Customer[]>('http://localhost:8080/customers').subscribe((result:any)=>{
      this.customerList=result;
      console.log(this.customerList);
    })
  }

  logInFunction(){
    this.getCustomerList();
    for(var c of this.customerList){
      if(c.customerEmail === this.inputCustomerEmailLogIn && c.customerEmail === this.inputCustomerPassLogIn){
      alert("Logged in successfully");
      this.goToStorePage();
      console.log(this.inputCustomerEmailLogIn);
      console.log(this.inputCustomerPassLogIn);
      }
    }

  }
  

}
