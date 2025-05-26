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
  searchFormGroup!: FormGroup;
  customerFormGroup!: FormGroup;
  errorMessage!: string;
  isLoading = false;
  showModal = false;

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
    this.customerFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
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

  handleAddCustomer() {
    const newCustomer: Customer = this.customerFormGroup.value;
    if (this.customerFormGroup.valid) {
      this.customerService.addCustomer(newCustomer).subscribe({
        next:(customer)=>{
          console.log(customer);
          this.customers= this.customers.concat(customer);
          this.closeModal();
          this.alertService.success('Success!', 'Data saved successfully');
        },error:(err)=>{
          this.errorMessage = err.message;
          this.alertService.error('Data validation failed', err.message);
        }
      })
    }
  }

  openModal():void{
    this.showModal = true;
  }

  closeModal():void{
    this.showModal = false;
  }


}
