import {brDtls} from "../Models/brDtls.model"
import {chargesInfo} from "../Models/chargesInfo.model"
import {taxesInfo} from "../Models/taxesInfo.model"
export class ordeItmLineInfo {

    ff1:string;
    ff2:string;
    ff3:string;
    ff4:string;
    ff5:string;
    sp:number;
    uom:string;
    balance:number;
    businessArea:string;
    chargeDetails :chargesInfo[];
    configCode:number;
    discFlg:number;
    discountGroupItem:string;
    distrGrpTech:string;
    envGrp:string;
    hierarchyID:string;
    itemDescription:string;
    itemGrp:string;
    itemName:string;
    itemNo:string;
    itemTotalDiscAmt:number;
    itemType:string;
    itmLineNo:number;
    lineAmt:number;
    lineAmtAftrDisc:number;
    lineEditFlag:number;
    lineQty:number;
    location:string;
    lotNo:string;
    procGrp:string;
    prodGroup:string;
    result:brDtls;
    salesCampaign:number;
    styleNo:number;
    tranType:string;
    taxesBean :taxesInfo;
}

