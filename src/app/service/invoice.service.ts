import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customers } from '../model/masterModel';
import { Associate } from '../model/customer';
import { Tax } from '../model/Tax';
import { Invoice } from '../model/Invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http:HttpClient) { }

  Getallcustomer(){
    return this.http.get<Associate[]>('http://localhost:3000/customer')
  }
  Getcustomer(customerid:string){
    return this.http.get<Associate>('http://localhost:3000/customer/'+customerid)
  }

  Getalltaxes(){
    return this.http.get<Tax[]>('http://localhost:3000/tax')
  }
  Gettax(customerid:string){
    return this.http.get<Tax>('http://localhost:3000/tax/'+customerid)
  }

  SaveInvoice(invoicedata:any){
    return this.http.post('http://localhost:3000/invoice',invoicedata);
  }
  GetAllInvoice(){
    return this.http.get<Invoice[]>('http://localhost:3000/invoice');
  }
  GetInvoicebyCode(invoiceNo:Invoice){
    return this.http.get<Invoice>('http://localhost:3000/invoice/'+invoiceNo);
  }
  UpdateInvoice(invoicedata:Invoice){
    return this.http.put('http://localhost:3000/invoice/'+invoicedata.id,invoicedata);
  }
  DeleteInvoice(invoiceNo:any){
    return this.http.delete('http://localhost:3000/invoice/'+invoiceNo);
  }
}
