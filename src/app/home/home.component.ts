import { Component, signal, ViewChild } from '@angular/core';
import { ReversePipe } from '../custom/reverse.pipe';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../service/master.service';
import { Customers } from '../model/masterModel';
import { ChildComponent } from '../common/child/child.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, CommonModule, ReversePipe, FormsModule,ChildComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private service: MasterService) {
   this.Getallcustomer();
   setTimeout(()=>{
    this.title1.set("Angular for begginners");
   },10000)
  }
  _custdata!: Customers[];

  @ViewChild(ChildComponent) _child!:ChildComponent;


  title = 'Angular 18 Tutorial';
  title1 =signal<string>('Angular 18 Tutorial');
  subtitle = 'Angular for begginers'
  todaydate = new Date();
  salary = 1000233444;
  _obj = { "name": "NT" }
  firstname='';
  lastname='';

  isdisabled = true;
  _class = 'inactive';
  _color = 'blue'
  _font = '34'

  isshow = false;

  ticketinfo = [
    { 'id': 1, 'name': 'angular', color: 'green' },
    { 'id': 2, 'name': 'react', color: 'red' },
    { 'id': 3, 'name': 'vuejs', color: 'blue' }
  ]

  _view = 'about1';

  Changetitle() {
    this.title = "Angular 18 Full Tutorail";
  }

  updatetitle(event: any) {
    this.title = event.target.value;
  }
  updatetitle1(title:string) {
    this.title = title;
  }

  addfruit(fruit:any){
   let resp= this._child.Updatefruits(fruit);
   console.log(resp);
  }

  Getallcustomer() {
    this.service.GetallCustomerold().subscribe(item => {
      this._custdata = item;
      console.log(this._custdata);
    });
  }
}
