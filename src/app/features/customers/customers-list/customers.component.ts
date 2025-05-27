import {Component} from '@angular/core';
import {CustomerService} from '../services/customer.service';
import {Customer} from '../models/customer.model';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PanelComponent} from '../../../shared/components/panel/panel.component';
import {ModalComponent} from '../../../shared/components/modal/modal.component';
import {FormInputComponent} from '../../../shared/components/forms/form-input/form-input.component';
import {ButtonComponent} from '../../../shared/components/forms/button/button.component';
import {AlertService} from '../../../shared/components/alert/alert.service';

@Component({
  selector: 'app-customers',
  imports: [
    ReactiveFormsModule,
    PanelComponent,
    ModalComponent,
    FormInputComponent,
    ButtonComponent,
  ],
  templateUrl: './customers.component.html',
  standalone: true,
  styleUrl: './customers.component.css'
})
export class CustomersComponent  {

  customers!:Array<Customer>;
  customerToEdit!: Customer;
  searchFormGroup!: FormGroup;
  customerFormGroup!: FormGroup;
  isLoading = false;
  showModal = false;
  isEditMode: boolean = false;


  constructor(private customerService:CustomerService , private  formBuilder: FormBuilder,private alertService: AlertService) {

  }

  ngOnInit() {
    this.isLoading = true;
     this.customerService.getCustomers().subscribe({
      next:(customers)=>{
        this.customers= customers;
        this.isLoading = false;
      },error:(err)=>{
        this.alertService.error("Loading failed",err.message,3000);
        this.isLoading = false;
      }
     }
    )
    this.searchFormGroup = this.formBuilder.group({
      keyword:this.formBuilder.control(''),
    })
    this.customerFormGroup = this.formBuilder.group({
      id: this.formBuilder.control(null),
      name: this.formBuilder.control('',[Validators.required]),
      email: this.formBuilder.control('',[Validators.email,Validators.required]),
    })
   }

  handleSearchSubmit() {
    let keyword = this.searchFormGroup.value.keyword;
    this.customerService.searchCustomers(keyword).subscribe({
      next:(customers)=>{
        this.customers= customers;
        this.isLoading = false;
      },error:(err)=>{
        this.alertService.error("An error occurred",err.message,3000);
        this.isLoading = false;
      }
    })
  }

  handleDelete(id:Number) {
    if(confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next:()=>{
          this.customers = this.customers.filter(customer => customer.id !== id);
          this.alertService.success("Success","Customer deleted successfully",3000);
        },
        error: (err) => {
          this.alertService.error("Failed to delete client",err.message,3000);
        }
      });
    }
  }

  handleSaveCustomer() {
    const customer: Customer = this.customerFormGroup.value;
    if (this.customerFormGroup.valid) {
        this.customerService.saveCustomer(customer,this.isEditMode).subscribe({
          next:(customer)=>{
            const index = this.customers.findIndex(c => c.id === customer.id);
            if (index !== -1) {
              this.customers[index] = customer;
            } else {
              this.customers.push(customer);
            }
            this.closeModal();
            this.alertService.success('Success!', 'Customer has been saved successfully');
            this.customerFormGroup.reset();
          },error:(err)=>{
            this.alertService.error('Server error', err.message);
          }
        })
    }else{
      this.alertService.error('Data validation failed',"error");
    }
  }

  openAddModal():void{
    this.isEditMode=false;
    this.showModal = true;
  }

  closeModal():void{
    this.showModal = false;
    this.customerFormGroup.reset();
  }

  openEditModal(customer: Customer) {
    this.isEditMode = true;
    this.customerFormGroup.patchValue(customer);
    console.log(this.customerFormGroup.value)
    this.showModal = true;
  }

}
