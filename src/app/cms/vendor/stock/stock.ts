export class Stock {
  id:string;
  constructor(
    public name ='',
    public size ='',
    public quantity = 0,
    public pricePerLog= 0,
    public description ='',
    public image = 'https://www.ghanaiantimes.com.gh/wp-content/uploads/2020/02/Timber.jpg') {}
}
