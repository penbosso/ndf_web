import { News } from '../../news/news';

export class NewsPage {
  constructor(
    public pageNumber?: Number,
    public pageSize?: Number,
    public totalNumber?: Number,
    public data?: News[]
      ) {}
}
