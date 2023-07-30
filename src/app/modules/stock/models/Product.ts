export interface ExtraCharge {
  text: string;
  value: number;
  valueType: string;
}
export class Product {
  name: string = '';
  description: string = '';
  salePrice: number = 0;
  actualPrice: number = 0;
  active: boolean = true;
  stock: number = 0;
  catalogId: number = 0;
  vendorId: number = 0;
  parentId: number = 0;
  currency: string = '';
  extraCharge: Array<any> = new Array();
}
