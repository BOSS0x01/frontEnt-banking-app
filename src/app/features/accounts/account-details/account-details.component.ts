import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AccountService} from '../services/account.service';
import {AlertService} from '../../../shared/components/alert/alert.service';
import {PanelComponent} from '../../../shared/components/panel/panel.component';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountOperation} from '../models/accountOperation.model';
import {AccountHistory} from '../models/accountHistory.model';
import {DatePipe, DecimalPipe, JsonPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {SavingAccount} from '../models/savingAccount.model';
import {Account} from '../models/account.model';
import {CurrentAccount} from '../models/currentAccount.model';
import {PaginationComponent} from '../../../shared/pagination/pagination.component';
import {ButtonComponent} from '../../../shared/components/forms/button/button.component';
import {FormInputComponent} from '../../../shared/components/forms/form-input/form-input.component';
import {ModalComponent} from '../../../shared/components/modal/modal.component';
import {Credit} from '../models/credit.model';

@Component({
  selector: 'app-account-details',
  imports: [
    ReactiveFormsModule,
    PanelComponent,
    DecimalPipe,
    NgClass,
    NgForOf,
    DatePipe,
    PaginationComponent,
    ButtonComponent,
    FormInputComponent,
    ModalComponent,
    JsonPipe
  ],
  templateUrl: './account-details.component.html',
  standalone: true,
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent {
  isLoading: boolean = true;
  accountHistory!: AccountHistory;
  account!: Account;
  currentPage:number = 0;
  pageSize:number = 5;
  showModal: boolean = false;
  accountOperationFormGroup!: FormGroup;
  accountOperationType!: string;
  accountId!: string;

  constructor(private accountService: AccountService,private alertService: AlertService,private formBuilder: FormBuilder,private router: ActivatedRoute) {}

  ngOnInit() {
    this.accountId = this.router.snapshot.params['id'];
    this.loadAccountHistory(this.accountId);

    this.accountOperationFormGroup = this.formBuilder.group({
      amount : this.formBuilder.control(0),
      accountDestination : this.formBuilder.control(''),
      description : this.formBuilder.control(''),
    })
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

  closeModal() {
    this.showModal = false;
    this.accountOperationFormGroup.reset()
  }

  openModal(operationType:string) {
    this.accountOperationType = operationType;
    this.showModal = true;
  }

  handleSaveAccountOperation() {
    let {amount, accountDestination, description} = this.accountOperationFormGroup.value;
    if (this.accountOperationType=="credit"){
      this.accountService.credit({
        accountId: this.accountId,
        amount: amount,
        description: description
      }).subscribe({
        next:()=>{
          this.alertService.success("success","operation has been successfully saved");
          this.loadAccountHistory(this.accountId);
        },
        error:(err)=>{
          this.alertService.error("Server error",err.message);
        }
      }
      );
    }else if(this.accountOperationType==="debit"){
      this.accountService.debit({
        accountId: this.accountId,
        amount: amount,
        description: description
      }).subscribe({
          next:()=>{
            this.alertService.success("success","operation has been successfully saved");
            this.loadAccountHistory(this.accountId);

          },
          error:(err)=>{
            this.alertService.error("Server error",err.message);
          }
        }
      );

    }else if(this.accountOperationType==="transfer"){
      this.accountService.transfer ({
        accountSourceId: this.accountId,
        accountDestinationId: accountDestination,
        amount: amount,
        description: description
      }).subscribe({
          next:()=>{
            this.alertService.success("success","operation has been successfully saved");
            this.loadAccountHistory(this.accountId);
          },
          error:(err)=>{
            this.alertService.error("Server error",err.message);
          }
        }
      );
    }
  }
}
