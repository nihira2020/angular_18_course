import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Products } from '../../model/Productmodel';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Invoice } from '../../model/Invoice';
import { Router } from '@angular/router';
import { InvoiceService } from '../../service/invoice.service';
import { catchError, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule,
    CommonModule, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'address', 'nettotal', 'action'];
  dataSource!: MatTableDataSource<Invoice>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  invoiceList: Invoice[] = []
  subscription=new Subscription();

  constructor(private router: Router, private service: InvoiceService) {

  }
  ngOnInit(): void {
    this.Loadinvoice();
  }

  Createinvoice() {
    this.router.navigateByUrl('/createinvoice')
  }
  EditInvoice(id: any) {
    this.router.navigateByUrl('/editinvoice/' + id);
  }
  DeleteInvoice(id: any) {
    if (confirm('Do you want to remove?')) {
      let sub2 = this.service.DeleteInvoice(id).subscribe(item => {
        alert('Removed successfully.')
        this.Loadinvoice();
      });
      this.subscription.add(sub2)
    }
  }


  Loadinvoice() {
    let sub1 = this.service.GetAllInvoice().pipe(
      catchError(err => {
        console.log(err.message);
        return of([])
      })
    ).subscribe(item => {
      this.invoiceList = item;
      this.dataSource = new MatTableDataSource(this.invoiceList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


}
