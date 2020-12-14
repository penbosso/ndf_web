import { ILog } from './log';

export interface ILogPage {
  pageNumber?: Number,
  pageSize?: Number,
  totalNumber?: Number,
  data?: ILog[]
}
