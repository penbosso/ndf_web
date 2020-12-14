export class User {
  id: string;
  constructor(public firstName ='',
  public otherNames = '',
  public telephone = '',
  public profilePic ='',
  public type = '',
  public isActive = true,
  public companyCode = '',
  public createdAt = '',
  public password?: string) {}
}
