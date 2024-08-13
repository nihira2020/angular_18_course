import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Loginmodel } from '../../model/Loginmodel';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../service/master.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, FormsModule, CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private service: MasterService,private router:Router) {

  }
  ngOnInit(): void {
    localStorage.clear();
  }

  _logindata: Loginmodel = {
    username: '',
    password: ''
  }

  ProceedLogin(form: any) {
    if (form.valid) {
      this.service.Proceedlogin(this._logindata).subscribe(item => {
        let _resp = item;
        if(_resp.length>0){
          localStorage.setItem('username',this._logindata.username);
          this.router.navigateByUrl('');
        }else{
          alert('Invalid credentials');
        }
      })
    }

  }

}
