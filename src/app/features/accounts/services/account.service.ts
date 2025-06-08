import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../models/account.model';
import {environment} from '../../../../environments/ environment';
import {AccountHistory} from '../models/accountHistory.model';
import {Credit} from '../models/credit.model';
import {Debit} from '../models/debit.model';
import {Transfer} from '../models/transfer.model';

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

  public credit(credit:Credit){
    console.log(credit);
      return this.http.post(this.domain + this.prefix+ "/credit",credit);
  }

  public debit(debit:Debit){
      return this.http.post(this.domain + this.prefix+ "/debit",debit);
  }

  public transfer(transfer:Transfer){
    console.log(transfer);
      return this.http.post(this.domain + this.prefix+ "/transfer",transfer);
  }

  public getAccount(accountId: string):Observable<Account>{
    return this.http.get<Account>(this.domain + this.prefix+"/"+accountId);
  }

}
