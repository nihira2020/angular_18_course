import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addProducts, addProductSuccess, deleteProducts, deleteProductSuccess, emptyAction, getProducts, getproductsuccess, loadProductfail, loadProducts, loadProductSuccess, updateProducts, updateProductSuccess } from "./Product.Action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { ProductService } from "../service/product.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ProductEffect {
    constructor(private action$: Actions, private service: ProductService, private toastr: ToastrService) { }

    _loadproduct = createEffect(() =>
        this.action$.pipe(
            ofType(loadProducts),
            exhaustMap((action) => {
                return this.service.GetAll().pipe(
                    map((data) => {
                        return loadProductSuccess({ list: data })
                    }),
                    catchError((err) => of(this.Showalert(err.message, 'fail')))
                )
            })
        )
    )

    _createproduct = createEffect(() =>
        this.action$.pipe(
            ofType(addProducts),
            switchMap((action) => {
                return this.service.Createproduct(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(addProductSuccess({ inputdata: action.inputdata }), this.Showalert('Created successfully.', 'pass'))
                    }),
                    catchError((err) => of(this.Showalert(err.message, 'fail')))
                )
            })
        )
    )

    _updateproduct = createEffect(() =>
        this.action$.pipe(
            ofType(updateProducts),
            switchMap((action) => {
                return this.service.Updateproduct(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(updateProductSuccess({ inputdata: action.inputdata }), this.Showalert('Updated successfully.', 'pass'))
                    }),
                    catchError((err) => of(this.Showalert(err.message, 'fail')))
                )
            })
        )
    )

    _removeproduct = createEffect(() =>
        this.action$.pipe(
            ofType(deleteProducts),
            switchMap((action) => {
                return this.service.Removeproduct(action.id).pipe(
                    switchMap((data) => {
                        return of(deleteProductSuccess({ id: action.id }), this.Showalert('Deleted successfully.', 'pass'))
                    }),
                    catchError((err) => of(this.Showalert(err.message, 'fail')))
                )
            })
        )
    )


    _getproduct = createEffect(() =>
        this.action$.pipe(
            ofType(getProducts),
            switchMap((action) => {
                return this.service.GetproductbyId(action.id).pipe(
                    switchMap((data) => {
                        return of(getproductsuccess({ obj: data }))
                    }),
                    catchError((err) => of(this.Showalert(err.message, 'fail')))
                )
            })
        )
    )

    Showalert(message: string, response: string) {
        if (response == 'pass') {
            this.toastr.success(message)
        } else {
            this.toastr.error(message)
        }
        return emptyAction();
    }

}