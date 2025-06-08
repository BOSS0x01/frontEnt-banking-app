import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Account} from '../models/account.model';
import {AccountService} from '../services/account.service';
import {AlertService} from '../../../shared/components/alert/alert.service';
import {PanelComponent} from '../../../shared/components/panel/panel.component';
import {RouterLink} from '@angular/router';
import {DatePipe, DecimalPipe} from "@angular/common";
import {ModalComponent} from '../../../shared/components/modal/modal.component';
import {ButtonComponent} from '../../../shared/components/forms/button/button.component';
import {FormInputComponent} from '../../../shared/components/forms/form-input/form-input.component';
import {FormSelectComponent} from '../../../shared/components/forms/form-select/form-select.component';
import {CustomerService} from '../../customers/services/customer.service';
import {Customer} from '../../customers/models/customer.model';
import {FormRadioComponent} from '../../../shared/components/forms/form-radio/form-radio.component';

@Component({
  selector: 'app-accounts',
  imports: [
    PanelComponent,
    ReactiveFormsModule,
    RouterLink,
    DecimalPipe,
    DatePipe,
    ModalComponent,
    ButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormsModule,
    FormRadioComponent
  ],
  templateUrl: './accounts.component.html',
  standalone: true,
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {

  searchFormGroup!: FormGroup;
  isLoading: boolean=true;
  accounts: Array<Account> = [];
  showModal: boolean = false;
  isEditMode: boolean = false;
  accountFormGroup!: FormGroup;
  customers: Array<Customer> = [];

  constructor(private accountService: AccountService,private alertService: AlertService,private formBuilder:FormBuilder,private customerService:CustomerService) {}

  ngOnInit() {
    this.loadAccounts();

    this.searchFormGroup = this.formBuilder.group({
      keyword:this.formBuilder.control(''),
    })

    this.accountFormGroup = this.formBuilder.group({
      customer:this.formBuilder.control(null),
      initialBalance:this.formBuilder.control(0),
      accountType:this.formBuilder.control(null),
      //can be either overdraft or interest rate depending on the account type
      attribute:this.formBuilder.control(null),
    })
  }

   loadAccounts(){
    this.accountService.getAccounts().subscribe({
      next:(accounts)=>{
        this.accounts = accounts;
        this.isLoading = false;
      },error:(err)=>{
        this.alertService.error("A server error occurred",err.message,3000);
      }
    })
  }

  loadCustomers():void{
    this.customerService.getCustomers().subscribe({
      next:(customers)=>{
        this.customers= customers;
      },error:(err)=>{
        this.alertService.error("Loading failed",err.message,3000);
      }
    });
  }

  handleSearchSubmit() {
    let accountId = this.searchFormGroup.value.keyword;
    if (accountId != ""){

    this.accountService.getAccount(accountId).subscribe({
      next:(account)=>{
        this.accounts =  this.accounts.filter(a => a.id == account.id);
        console.log(account);
      }
    })
    }else {
      this.loadAccounts();
    }
  }

  openAddModal() {
    this.loadCustomers();
    this.showModal = true;
  }

  openEditModal(account: any) {

  }

  handleDelete(id: any) {

  }

  closeModal(){
    this.showModal = false;
  }

  handleSaveAccount() {

  }
}
