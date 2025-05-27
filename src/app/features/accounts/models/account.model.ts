import {AccountOperation} from './accountOperation.model';
import {Customer} from '../../customers/models/customer.model';

export interface Account {
   id:string;
   type:string;
   createdAt:Date
   balance:number
   currency:string
   status:string
   customer: Customer
}
