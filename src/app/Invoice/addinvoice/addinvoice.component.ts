import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Associate } from '../../model/customer';
import { Tax } from '../../model/Tax';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { InvoiceService } from '../../service/invoice.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Products } from '../../model/Productmodel';
import { ProductService } from '../../service/product.service';
import { Invoice } from '../../model/Invoice';
import { Invoiceproducts } from '../../model/Invoiceproduct';

@Component({
  selector: 'app-addinvoice',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, MatCardModule,
    MatInputModule, MatFormFieldModule, MatButtonModule,
    MatSelectModule, MatDatepickerModule, MatIconModule,
    CommonModule, MatDividerModule, MatListModule
  ],
  templateUrl: './addinvoice.component.html',
  styleUrl: './addinvoice.component.css'
})
export class AddinvoiceComponent implements OnInit {

  customerList: Associate[] = []
  taxList: Tax[] = []
  masterproduct: Products[] = []
  invoiceproducts !: FormArray<any>;
  invoiceproduct!: FormGroup<any>;
  summaryTotal = 0;
  summaryNetTotal = 0;
  summaryTax = 0;
  taxType = 'E';
  taxPerc = 0;
  editinvoiceno = '';
  isEdit = false;
  title='Create Invoice'
  displayedColumns: string[] = ['invoiceNo', 'productid', 'name', 'qty', 'price', 'total', 'action'];
  constructor(private builder: FormBuilder, private router: Router,
    public service: InvoiceService, private alert: ToastrService,
    public proservice: ProductService, private activeroute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.Loadcustomer();
    this.Loadtax();
    this.Loadproduct();
    this.editinvoiceno = this.activeroute.snapshot.paramMap.get('invoiceno') as string;
    if (this.editinvoiceno != null) {
      this.title = "Edit Invoice";
      this.isEdit = true;
      this.SetEditInfo(this.editinvoiceno);
    }
  }

  invoiceform = this.builder.group({
    invoiceno: this.builder.control({value:'',disabled:true}),
    invoicedate: this.builder.control(new Date(), Validators.required),
    customerno: this.builder.control('', Validators.required),
    customername: this.builder.control(''),
    taxcode: this.builder.control(''),
    address: this.builder.control(''),
    total: this.builder.control(0),
    tax: this.builder.control(0),
    nettotal: this.builder.control(0),
    products: this.builder.array([])
  })

  backtolist() {
    this.router.navigateByUrl('/invoice');
  }
  ProceedSave() {
    if (this.invoiceform.valid) {
      let _products: Invoiceproducts[] = [];
      _products = this.invoiceform.getRawValue().products as Invoiceproducts[];

      let _data: Invoice = {
        id: 0,
        customerid: this.invoiceform.value.customerno as string,
        customername: this.invoiceform.value.customername as string,
        deliveryaddress: this.invoiceform.value.address as string,
        nettotal: this.invoiceform.value.nettotal as number,
        total: this.invoiceform.value.total as number,
        tax: this.invoiceform.value.tax as number,
        products: _products,
        invoicedate: this.invoiceform.value.invoicedate as Date,
        taxcode: this.invoiceform.value.taxcode as string,
        taxtype: this.taxType,
        taxperc: this.taxPerc
      }
      if (this.isEdit) {
        _data.id=parseInt(this.editinvoiceno);
        this.service.UpdateInvoice(_data).subscribe(res => {
          this.alert.success('Updated Successfully.');
          this.router.navigateByUrl('/invoice');

        });
      } else {
        this.service.SaveInvoice(_data).subscribe(res => {
          this.alert.success('Created Successfully.');
          this.router.navigateByUrl('/invoice');

        });
      }

    } else {
      this.alert.warning('Please enter values in all mandatory filed', 'Validation');
    }
  }

  Loadcustomer() {
    this.service.Getallcustomer().subscribe(item => {
      this.customerList = item;
    })
  }

  Loadtax() {
    this.service.Getalltaxes().subscribe(item => {
      this.taxList = item;
    })
  }

  Loadproduct() {
    this.proservice.GetAll().subscribe(item => {
      this.masterproduct = item;
    })
  }

  SetEditInfo(invoiceno: any) {

    this.service.GetInvoicebyCode(invoiceno).subscribe(res => {
      let editdata: Invoice;
      let processcount = 0;
      editdata = res;
      if (editdata != null) {
        for (let i = 0; i < editdata.products.length; i++) {
          this.addnewproduct();
          processcount++;
          if (processcount == editdata.products.length) {
            this.invoiceform.setValue({
              invoiceno: editdata.id.toString(), customerno: editdata.customerid,
              customername: editdata.customername, address: editdata.deliveryaddress,
              total: editdata.total, tax: editdata.tax, nettotal: editdata.nettotal,
              invoicedate: editdata.invoicedate ? new Date() : new Date(editdata.invoicedate),
              taxcode: editdata.taxcode,
              products: editdata.products
            })
            this.taxType = editdata.taxtype
            this.taxPerc = editdata.taxperc
            this.summarycalculation();
          }
        };

      }
    });
  }



  Customerchange(customercode: string) {
    this.service.Getcustomer(customercode).subscribe(item => {
      let _customer = item;
      if (_customer != null) {
        this.invoiceform.controls.address.setValue(_customer.address)
        this.invoiceform.controls.customername.setValue(_customer.name)
        this.invoiceform.controls.taxcode.setValue(_customer.taxcode)
        this.addnewproduct();
        this.Taxchange(_customer.taxcode);
      }
    })
  }

  Taxchange(taxcode: string) {
    console.log(taxcode);
    this.service.Gettax(taxcode).subscribe(item => {
      let _tax = item;
      if (_tax != null) {
        this.taxPerc = _tax.perc;
        this.taxType = _tax.id
        this.summarycalculation();
      }
    })
  }

  addnewproduct() {


    this.invoiceproducts = this.invoiceform.get('products') as FormArray;
    let customercode = this.invoiceform.value.customerno as string;
    if (!this.isEdit) {
      if ((customercode != null && customercode != '')) {
        this.invoiceproducts.push(this.Generaterow());
      } else {
        this.alert.warning('Please select the customer', 'Validation');
      }
    } else {
      this.invoiceproducts.push(this.Generaterow());
    }

  }

  get invproducts() {
    return this.invoiceform.get("products") as FormArray;
  }

  Generaterow() {
    return this.builder.group({
      //invoiceNo: this.builder.control(''),
      productid: this.builder.control('', Validators.required),
      name: this.builder.control(''),
      qty: this.builder.control(1),
      price: this.builder.control(0),
      total: this.builder.control({ value: 0, disabled: true })
    });
  }

  productchange(index: any) {
    this.invoiceproducts = this.invoiceform.get("products") as FormArray;
    this.invoiceproduct = this.invoiceproducts.at(index) as FormGroup;
    let productcode = this.invoiceproduct.get("productid")?.value;
    this.proservice.GetproductbyId(productcode).subscribe(res => {
      let proddata: any;
      proddata = res;
      console.log(proddata);
      if (proddata != null) {

        this.invoiceproduct.get("name")?.setValue(proddata.name);
        this.invoiceproduct.get("price")?.setValue(proddata.price);
        this.Itemcalculation(index);
      }
    });
  }

  Itemcalculation(index: any) {
    this.invoiceproducts = this.invoiceform.get("products") as FormArray;
    this.invoiceproduct = this.invoiceproducts.at(index) as FormGroup;
    let qty = this.invoiceproduct.get("qty")?.value;
    let price = this.invoiceproduct.get("price")?.value;
    let total = qty * price;
    this.invoiceproduct.get("total")?.setValue(total);

    this.summarycalculation();
  }
  Removeproduct(index: any) {
    if (confirm('Do you want to remove?')) {
      this.invproducts.removeAt(index);
      this.summarycalculation();

    }
  }

  summarycalculation() {
    let array = this.invoiceform.getRawValue().products;
    let sumtotal = 0
    let sumtax = 0
    let nettotal = 0
    array.forEach((x: any) => {
      sumtotal = sumtotal + x.total;
    });

    // tax calculation
    if (this.taxType == 'Exclusive') {
      if (this.taxPerc > 0) {
        sumtax = (this.taxPerc / 100) * sumtotal;
        nettotal = sumtotal + sumtax;
      }

    } else if (this.taxType == 'Inclusive') {
      sumtax = sumtotal - (sumtotal * (100 / (100 + this.taxPerc)))
      nettotal = sumtotal - sumtax

    } else {
      sumtax = 0;
      nettotal = sumtotal;
    }


    this.invoiceform.get("total")?.setValue(sumtotal);
    this.invoiceform.get("tax")?.setValue(sumtax);
    this.invoiceform.get("nettotal")?.setValue(nettotal);

    this.summaryTotal = sumtotal
    this.summaryTax = sumtax
    this.summaryNetTotal = nettotal
  }


}
