import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { C404 } from './components/c404/c404';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'home'},
    {path:'home',component:Home},
    {path:'**',component:C404}
];
