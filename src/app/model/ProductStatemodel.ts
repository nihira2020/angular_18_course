import { Products } from "./Productmodel";

export interface ProductModel{
    list:Products[],
    errormessage:string,
    editdata:Products
}