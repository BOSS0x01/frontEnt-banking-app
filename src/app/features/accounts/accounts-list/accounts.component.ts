import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Account} from '../models/account.model';
import {CustomerService} from '../../customers/services/customer.service';
import {AccountService} from '../services/account.service';
import {AlertService} from '../../../shared/components/alert/alert.service';
import {PanelComponent} from '../../../shared/components/panel/panel.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-accounts',
  imports: [
    PanelComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './accounts.component.html',
  standalone: true,
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {

  searchFormGroup!: FormGroup;
  isLoading: boolean=true;
  accounts: Array<Account> = [];


  constructor(private accountService: AccountService,private alertService: AlertService,private formBuilder:FormBuilder) {}

  ngOnInit() {
    this.loadAccounts();

    this.searchFormGroup = this.formBuilder.group({
      keyword:this.formBuilder.control(''),
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

  handleSearchSubmit() {

  }

  openAddModal() {

  }

  openEditModal(account: any) {

  }

  handleDelete(id: any) {

  }
}
