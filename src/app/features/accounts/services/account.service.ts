import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../models/account.model';
import {environment} from '../../../../environments/ environment';
import {AccountHistory} from '../models/accountHistory.model';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  private domain : string = environment.apiUrl;
  private prefix: string = "/accounts";
  constructor(private http: HttpClient) {

  }

  public getAccounts():Observable<Array<Account>>{
    return this.http.get<Account[]>(this.domain + this.prefix);
  }

  public getAccountDetails(id: string,currentPage:number,pageSize:number):Observable<AccountHistory> {
      return this.http.get<AccountHistory>(this.domain + this.prefix+ "/"+ id.toString()+"/history?page="+currentPage.toString()+"&size="+pageSize.toString());
  }
}
