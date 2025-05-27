import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AccountService} from '../services/account.service';
import {AlertService} from '../../../shared/components/alert/alert.service';
import {PanelComponent} from '../../../shared/components/panel/panel.component';

@Component({
  selector: 'app-account-details',
  imports: [
    ReactiveFormsModule,
    PanelComponent
  ],
  templateUrl: './account-details.component.html',
  standalone: true,
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent {
  searchFormGroup!: FormGroup;
  isLoading: boolean = true;

  constructor(private accountService: AccountService,private alertService: AlertService,private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.searchFormGroup = this.formBuilder.group({
      keyword:this.formBuilder.control(''),
    })
  }

  handleSearchSubmit() {

  }
}
