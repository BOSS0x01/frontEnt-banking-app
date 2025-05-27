import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AccountService} from '../services/account.service';
import {AlertService} from '../../../shared/components/alert/alert.service';
import {PanelComponent} from '../../../shared/components/panel/panel.component';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountOperation} from '../models/accountOperation.model';
import {AccountHistory} from '../models/accountHistory.model';
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {SavingAccount} from '../models/savingAccount.model';
import {Account} from '../models/account.model';
import {CurrentAccount} from '../models/currentAccount.model';
import {PaginationComponent} from '../../../shared/pagination/pagination.component';

@Component({
  selector: 'app-account-details',
  imports: [
    ReactiveFormsModule,
    PanelComponent,
    DecimalPipe,
    NgClass,
    NgForOf,
    DatePipe,
    PaginationComponent
  ],
  templateUrl: './account-details.component.html',
  standalone: true,
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent {
  searchFormGroup!: FormGroup;
  isLoading: boolean = true;
  accountHistory!: AccountHistory;
  account!: Account;
  currentPage:number = 0;
  pageSize:number = 5;

  constructor(private accountService: AccountService,private alertService: AlertService,private formBuilder: FormBuilder,private router: ActivatedRoute) {}

  ngOnInit() {
    this.searchFormGroup = this.formBuilder.group({
      keyword:this.formBuilder.control(''),
    })
    let accountId = this.router.snapshot.params['id'];
    this.loadAccountHistory(accountId);
  }

  handleSearchSubmit() {
    let keyword = this.searchFormGroup.value;

  }

  private loadAccountHistory(id:string) {
    this.accountService.getAccountDetails(id,this.currentPage,this.pageSize).subscribe({
      next:(accountHistory)=>{
        this.accountHistory = accountHistory;
        console.log(this.accountHistory)

        if (accountHistory.bankAccount.type == "SavingAccount"){
            this.account = <SavingAccount>this.accountHistory.bankAccount;
        }else if(accountHistory.bankAccount.type == "CurrentAccount"){
            this.account = <CurrentAccount>this.accountHistory.bankAccount;
        }

        this.isLoading = false;
      },error:(err)=>{
        this.alertService.error("A server occurred",err.message,3000);
      }
    });
  }

  isSavingAccount(account: Account): account is SavingAccount {
    return account.type === 'SavingAccount';
  }

  isCurrentAccount(account: Account): account is CurrentAccount {
    return account.type === 'CurrentAccount';
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.accountHistory.totalPages) {
      this.currentPage = page;
      this.loadAccountHistory(this.accountHistory.accountId); // Your data-loading logic
    }
  }
}
