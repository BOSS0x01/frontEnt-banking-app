import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {Customer} from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private domain : string = "http://localhost:8085";
  private prefix: string = "/api/customers";

  constructor(private http: HttpClient) {

  }

  public getCustomers():Observable<Array<Customer>> {
    return this.http.get<any[]>(this.domain + this.prefix);
  }
  public searchCustomers(keyword:string):Observable<Array<Customer>> {
    return this.http.get<any[]>(this.domain + this.prefix+'/search?keyword='+keyword);
  }

  public deleteCustomer(id:Number):Observable<any[]> {
    return this.http.delete<any[]>(this.domain + this.prefix + '/'+id);
  }

  public saveCustomer(customer:Customer,isEditMode:boolean):Observable<any> {
    if (isEditMode){
      return this.http.put<any[]>(this.domain + this.prefix , customer);
    }else {
      return this.http.post<any[]>(this.domain + this.prefix , customer);
    }
  }

}
