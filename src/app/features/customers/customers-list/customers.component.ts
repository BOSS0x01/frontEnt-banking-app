import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../services/customer.service';
import {Customer} from '../models/customer.model';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {PanelComponent} from '../../../shared/components/panel/panel.component';
import {ModalComponent} from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-customers',
  imports: [
    ReactiveFormsModule,
    PanelComponent,
    ModalComponent,
  ],
  templateUrl: './customers.component.html',
  standalone: true,
  styleUrl: './customers.component.css'
})
export class CustomersComponent  {

  customers!:Array<Customer>;
  searchFormGroup!: FormGroup;
  errorMessage!: string;
  isLoading = false;
  showModal = false;

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

  handleDelete(id:Number) {
    if(confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next:()=>{
          this.customers = this.customers.filter(customer => customer.id !== id)
        },
        error: (err) => {
          console.error("Failed to delete client", err);
          alert("Une erreur est survenue lors de la suppression.");
        }
      });
    }
  }


  openModal():void{
    this.showModal = true;
    console.log("modal open")
  }

  closeModal():void{
    this.showModal = false;
  }
}
