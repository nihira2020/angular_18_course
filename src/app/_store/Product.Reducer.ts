import { createReducer, on } from "@ngrx/store";
import { productState } from "./Product.state";
import { addProductSuccess, deleteProductSuccess, getproductsuccess, loadProductfail, loadProductSuccess, updateProductSuccess } from "./Product.Action";
import { state } from "@angular/animations";

const _productReducer = createReducer(productState,
    on(loadProductSuccess, (state, action) => {
        return {
            ...state,
            list: action.list,
            errormessage: ''
        }
    }),
    on(loadProductfail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    }),
    on(getproductsuccess, (state, action) => {
        return {
            ...state,
            errormessage: '',
            editdata: action.obj
        }
    }),
    on(addProductSuccess, (state, action) => {
        const _maxid = Math.max(...state.list.map(o => o.id));
        const _newdata = { ...action.inputdata };
        _newdata.id = _maxid + 1;
        return {
            ...state,
            list: [...state.list, _newdata],
            errormessage: ''
        }
    }),
    on(updateProductSuccess, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.inputdata.id ? action.inputdata : o
        })
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    })
    ,
    on(deleteProductSuccess, (state, action) => {
        const _newdata = state.list.filter(o =>
            o.id !== action.id
        )
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    })
)

export function ProductReducer(state: any, action: any) {
    return _productReducer(state, action);
}