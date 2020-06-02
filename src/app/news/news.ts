export class News {
  id:string;
  updatedAt: string;
  constructor(
    public title = "",
    public description = "",
    public image = "",
    public isPublished = false,
    public consumer = "",
  ) {}
}
