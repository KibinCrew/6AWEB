import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { Product } from './product';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public employees: {
    id: number,
    firstName: string,
    lastName: string,
    email: string
  }[] = [];

    public products: {
    prodId: string;
    prodName: string;
    description: string;
    price: string;
  }[] = [];

  constructor(private _employeeservice: Employee, private _productlist: Product){}

  ngOnInit(){
    this.employees = this._employeeservice.getEmployees();
    this.products = this._productlist.getProducts();
  }
}
