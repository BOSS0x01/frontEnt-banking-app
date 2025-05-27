import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../models/account.model';
import {environment} from '../../../../environments/ environment';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  private domain : string = environment.apiUrl;
  private prefix: string = "/accounts";
  constructor(private http: HttpClient) {

  }

  public getAccounts():Observable<Array<Account>>{
    return this.http.get<any[]>(this.domain + this.prefix);
  }
}
