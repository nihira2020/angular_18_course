import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './common/about/about.component';
import { ContactComponent } from './common/contact/contact.component';
import { CustomerComponent } from './common/customer/customer.component';
import { AddComponent } from './common/add/add.component';
import { StatusComponent } from './common/status/status.component';
import { authGuard } from './Guard/auth.guard';
import { childauthGuard } from './Guard/childauth.guard';
import { authdGuard } from './Guard/authd.guard';
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './common/register/register.component';
import { ProductComponent } from './common/product/product.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent, canActivate: [authGuard]
    },
    {
        path: 'about', component: AboutComponent, canActivate: [authGuard]
    },
    {
        path: 'about/:submenu/:id', component: AboutComponent, canActivate: [authGuard]
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'contact', loadComponent: () => import('./common/contact/contact.component').then(m => m.ContactComponent),
        canActivate: [authGuard]
    },
    {
        path: 'customer', component: CustomerComponent,
        canActivate: [authGuard],
        canActivateChild: [childauthGuard],
        canDeactivate: [authdGuard],
        children: [
            {
                path: 'add', component: AddComponent, canActivate: [authGuard]
            },
            {
                path: 'edit/:id', component: AddComponent
            }
        ]
    },
    {
        path: 'product', component: ProductComponent,canActivate:[authGuard]
    },
    {
        path: '**', component: StatusComponent
    }
];
