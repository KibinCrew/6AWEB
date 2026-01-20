import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Employee {
  getEmployees(){
    return[
  {
    id: 101,
    firstName: 'Joseph',
    lastName: 'Dizon',
    email: 'jdizon@hau.edu.ph',
  },
  {
    id: 102,
    firstName: 'James',
    lastName: 'Atienza',
    email: 'jatienza@hau.edu.ph',
  },
  {
    id: 103,
    firstName: 'John',
    lastName: 'Cena',
    email: 'jcena@hau.edu.ph',
  },
  {
    id: 104,
    firstName: 'Robert',
    lastName: 'Quintana',
    email: 'rquintana@hau.edu.ph',
  },
  {
    id: 105,
    firstName: 'Kevin',
    lastName: 'Galanag',
    email: 'kgalang@hau.edu.ph',
  },
  ]
  }
}
