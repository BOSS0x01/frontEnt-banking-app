import { Routes } from '@angular/router';
import {CustomersComponent} from './features/customers/customers-list/customers.component';
import {AccountsComponent} from './features/accounts/accounts-list/accounts.component';

export const routes: Routes = [
    { path:"customers", component: CustomersComponent },
    { path:"accounts", component: AccountsComponent }
];
