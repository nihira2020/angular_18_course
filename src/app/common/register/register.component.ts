import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { Role, user } from '../../model/Loginmodel';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule,
    MatCheckboxModule, MatRadioModule, MatSelectModule, RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  Roles: Role[] = [
    { value: 'salesman', viewValue: 'Salesman' },
    { value: 'supervisor', viewValue: 'Supervisor' },
    { value: 'manager', viewValue: 'Manager' },
  ];

  constructor(private builder:FormBuilder,private service:MasterService,private router:Router) {

  }

  registerform = this.builder.group({

    username: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    email: this.builder.control('', Validators.compose([Validators.email, Validators.required])),
    role: this.builder.control('salesman', Validators.required),
    gender: this.builder.control('m'),
    terms: this.builder.control(true)

  });

  ProceedRegister() {
    
    if(this.registerform.valid){
      if(this.registerform.value.terms){
        let _data:user={
          id: this.registerform.value.username as string,
          password: this.registerform.value.password as string,
          name: this.registerform.value.name as string,
          role: this.registerform.value.role as string,
          gender: this.registerform.value.gender as string,
          email:this.registerform.value.email as string
        }
        this.service.ProceedRegister(_data).subscribe(item=>{
          alert('Registered successfully.');
          this.router.navigateByUrl('/login');
 
        });
      }else{
        console.log(this.registerform.value.terms);
        alert('Please agree terms & conditions and proceed.');
      }
      
    }

    //this.registerform.setValue({username:'admin',name:'User'})

  }



}
