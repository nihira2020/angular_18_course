import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CounterbtnComponent } from '../counterbtn/counterbtn.component';
import { CounterdisplayComponent } from '../counterdisplay/counterdisplay.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CounterbtnComponent,CounterdisplayComponent,CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {

  routevalue:any;
  submenu:any;

  countries=['India','USA','CHINA','England','Australia'];

  constructor(private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.routevalue=this.route.snapshot.paramMap.get('id');
    this.submenu=this.route.snapshot.paramMap.get('submenu');
    console.log(this.routevalue);
    console.log(this.submenu);
  }
  

}
