// import {ListStore} from './list-store';
// import {CategoryList} from './category-list';
import {brDtls} from "../Models/brDtls.model"
export class itemModel {
    HSNCode: string;
    UOM: string;
    aliasNumber: string;
    balance: number;
    imageFileName: string;
    itemDescription: string;
    itemName: string;
    itemNumber: string;
    location:string;
    productGroup: string;
    salesPrice: number;
    totalChargeAmount :number;
    TAXAmount:number;
    discountAmount:number;
    brDtls:brDtls;
}
