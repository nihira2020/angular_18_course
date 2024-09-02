import { ProductModel } from "../model/ProductStatemodel";

export const productState:ProductModel={
    list: [],
    errormessage: "",
    editdata: {
        id: 0,
        name: "",
        description: "",
        price: 0,
        status: false
    }
}