import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../services/customer.service';
import {Customer} from '../models/customer.model';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-customers',
  imports: [
   ReactiveFormsModule,
  ],
  templateUrl: './customers.component.html',
  standalone: true,
  styleUrl: './customers.component.css'
})
export class CustomersComponent  {

  customers!:Array<Customer>;

  errorMessage!: string;
  isLoading = false;

  searchFormGroup!: FormGroup;
  constructor(private customerService:CustomerService , private  formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.isLoading = true;
     this.customerService.getCustomers().subscribe({
      next:(customers)=>{
        this.customers= customers;
        this.isLoading = false;
      },error:(err)=>{
        this.errorMessage = err.message;
        this.isLoading = false;
      }
     }
    )

    this.searchFormGroup = this.formBuilder.group({
      keyword:this.formBuilder.control(''),
    })
   }

  handleSearchSubmit() {
    let keyword = this.searchFormGroup.value.keyword;
    this.customerService.searchCustomers(keyword).subscribe({
      next:(customers)=>{
        this.customers= customers;
        this.isLoading = false;
      },error:(err)=>{
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    })
  }
}
