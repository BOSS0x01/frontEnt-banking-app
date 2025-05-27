import {AccountOperation} from './accountOperation.model';
import {Account} from './account.model';

export interface AccountHistory {
 accountId:string;
 bankAccount:Account;
 pageSize:number;
 currentPage:number;
 totalPages:number;
 accountOperations :Array<AccountOperation>
}
