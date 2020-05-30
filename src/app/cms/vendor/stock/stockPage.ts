import { Stock } from './stock';

export class StockPage {
  constructor(
    public pageNumber?: Number,
    public pageSize?: Number,
    public totalNumber?: Number,
    public data?: Stock[]
      ) {}
}
