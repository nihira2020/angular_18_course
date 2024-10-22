import { Invoiceproducts } from "./Invoiceproduct"

export interface Invoice{
    id:number
    customerid:string
    customername:string
    deliveryaddress:string
    total:number
    tax:number
    nettotal:number,
    invoicedate:Date,
    taxcode:string,
    taxtype:string,
    taxperc:number,
    products:Invoiceproducts[]
}