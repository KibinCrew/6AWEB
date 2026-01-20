import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Product {
    getProducts(){
    return[
  {
    prodId: 'P-101',
    prodName: 'Logitech Mouse',
    description: '6 Button Mechanical Mouse',
    price: 'PHP 899.00',
  },
  {
    prodId: 'P-102',
    prodName: 'JBL BT Speaker',
    description: 'Water Proof Radio 360 Surround',
    price: 'PHP 1,099.00',
  },
  {
    prodId: 'P-103',
    prodName: 'Mechanical Keyboard',
    description: 'Hot Swappable RGB Backlit',
    price: 'PHP 2,395.00',
  },
  {
    prodId: 'P-104',
    prodName: 'Oculus Meta',
    description: 'All-In-One Gaming VR Headset',
    price: 'PHP 22,450.00',
  },
    {
    prodId: 'P-105',
    prodName: 'Asus Monitor',
    description: 'Curved Frameless Monitor',
    price: 'PHP 8790.00',
  },
  ]
  }
}
