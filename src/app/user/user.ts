export class User {
  id: string;
  constructor(public firstName ='',
  public otherNames = '',
  public telephone = '',
  public profilePic ='https://www.shareicon.net/data/512x512/2015/10/02/649910_user_512x512.png',
  public type = '',
  public companyCode = '',
  public password?: string) {}
}
