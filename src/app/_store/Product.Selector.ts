import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductModel } from "../model/ProductStatemodel";

const getProductstate = createFeatureSelector<ProductModel>('product');

export const getproductlist = createSelector(getProductstate, (state) => {
    return state.list;
})

export const getproduct = createSelector(getProductstate, (state) => {
    return state.editdata;
})