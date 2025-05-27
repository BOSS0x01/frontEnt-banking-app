import {AccountOperation} from './accountOperation.model';

export interface AccountHistory {
 accountId:number;
 balance:number;
 pageSize:number;
 currentPage:number;
 totalPages:number;
 accountOperations :Array<AccountOperation>
}
