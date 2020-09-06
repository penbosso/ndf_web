import { User } from './user';

export class UserPage {
  constructor(
    public pageNumber?: Number,
    public pageSize?: Number,
    public totalNumber?: Number,
    public data?: User[]
    ) {}
}
