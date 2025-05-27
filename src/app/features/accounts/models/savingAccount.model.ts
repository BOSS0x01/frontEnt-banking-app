import {AccountOperation} from './accountOperation.model';
import {Customer} from '../../customers/models/customer.model';
import {Account} from './account.model';

export interface SavingAccount extends Account {
    interestRate: number;
}
