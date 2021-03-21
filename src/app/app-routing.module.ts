import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { boardRutas } from './dashboard/dashboard.routes';
import { AuthGuard } from './services/auth.guard';


const rutas: Routes = [

    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegisterComponent},
    {
        path: '',
        component: DashboardComponent,
        children: boardRutas,
        canActivate: [AuthGuard]
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
