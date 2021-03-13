import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { boardRutas } from './dashboard/dashboard.routes';


const rutas: Routes = [

    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegisterComponent},
    {
        path: '',
        component: DashboardComponent,
        children: boardRutas
    },
    {path: '**', redirectTo: ''},
];

@NgModule({

    imports: [
        RouterModule.forRoot(rutas)
    ],
    exports: [
        RouterModule
    ]

})

export class AppRoutingModule { }
