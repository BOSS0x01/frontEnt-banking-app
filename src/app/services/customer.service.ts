import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {Customer} from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private domain: string = "http://localhost:8085/api";

  constructor(private http: HttpClient) {

  }

  public getCustomers():Observable<Array<Customer>> {
    return this.http.get<any[]>(this.domain+'/customers');
  }
  public searchCustomers(keyword:string):Observable<Array<Customer>> {
    return this.http.get<any[]>(this.domain+'/customers/search?keyword='+keyword);
  }


}
