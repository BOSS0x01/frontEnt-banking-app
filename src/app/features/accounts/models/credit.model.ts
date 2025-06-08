import {AccountOperation} from './accountOperation.model';
import {Customer} from '../../customers/models/customer.model';

export interface Credit {
  accountId: string;
  amount: number;
  description: string;
}
