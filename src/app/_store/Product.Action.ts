import { createAction, props } from "@ngrx/store"
import { Products } from "../model/Productmodel";

export const LOAD_PRODUCTS = '[product] load products'
export const LOAD_PRODUCTS_SUCCESS = '[product] load products success'
export const LOAD_PRODUCTS_FAIL = '[product] load products fail'

export const ADD_PRODUCTS = '[product] add products'
export const ADD_PRODUCTS_SUCCESS = '[product] add products success'

export const UPDATE_PRODUCTS = '[product] update products'
export const UPDATE_PRODUCTS_SUCCESS = '[product] update products success'

export const DELETE_PRODUCTS = '[product] delete products'
export const DELETE_PRODUCTS_SUCCESS = '[product] delete products success'

export const GET_PRODUCTS = '[product] get products'
export const GET_PRODUCTS_SUCCESS = '[product] get products success'


export const loadProducts = createAction(LOAD_PRODUCTS);
export const loadProductSuccess = createAction(LOAD_PRODUCTS_SUCCESS, props<{ list: Products[] }>())
export const loadProductfail = createAction(LOAD_PRODUCTS_FAIL, props<{ errormessage: string }>())

export const addProducts = createAction(ADD_PRODUCTS, props<{ inputdata: Products }>());
export const addProductSuccess = createAction(ADD_PRODUCTS_SUCCESS,props<{ inputdata: Products }>())

export const updateProducts = createAction(UPDATE_PRODUCTS, props<{ inputdata: Products }>());
export const updateProductSuccess = createAction(UPDATE_PRODUCTS_SUCCESS,props<{ inputdata: Products }>())

export const deleteProducts = createAction(DELETE_PRODUCTS, props<{ id: number }>());
export const deleteProductSuccess = createAction(DELETE_PRODUCTS_SUCCESS,props<{ id: number }>())

export const getProducts = createAction(GET_PRODUCTS, props<{ id:number }>());
export const getproductsuccess = createAction(GET_PRODUCTS_SUCCESS,props<{ obj: Products }>())

export const emptyAction = createAction('empty');