export class User {
  id: string;
  constructor(public FirstName ='',
  public otherNames = '',
  public telephone = '',
  public profilePic = '',
  public type = '',
  public companyCode = '',
  public password?: string) {}
}
