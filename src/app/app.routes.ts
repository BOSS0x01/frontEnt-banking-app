import { Routes } from '@angular/router';
import {CustomersComponent} from './features/customers/customers-list/customers.component';
import {AccountsComponent} from './features/accounts/accounts-list/accounts.component';
import {AccountDetailsComponent} from './features/accounts/account-details/account-details.component';

export const routes: Routes = [
    { path:"customers", component: CustomersComponent },
    { path:"accounts", component: AccountsComponent },
    { path:"accountDetails", component: AccountDetailsComponent },
];
