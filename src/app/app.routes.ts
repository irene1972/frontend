import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { C404 } from './components/c404/c404';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'login'},
    {path:'', /*LandingComponent*/ },
    {path:'login', /*LoginComponent*/ },
    {path:'register', /*UserFormComponent*/ },

    // Esqueleto

    // Rutas Home: Usuario Normal. Falta implemetar el Guard y hacer sus hijos

    {path:'home', /*HomeComponent */ },
    
    {path:'new-product', /*ProductFormComponent*/ },
    {path:'product/:productID', /*ProductViewComponent*/ },
    {path:'product/edit/:productID', /*ProductFormComponent*/ },
    {path:'product/checkout/:productID', /*ProductCheckoutComponent*/ },
    {path:'user/:userID', /*UserComponent*/ },
    {path:'user/edit-profile/:userID', /*UserFormComponent*/ },
    {path:'favorites', /*FavoritosComponent*/ },

        // Ruta Mensajeria
        {path:'messages', /*MessagesComponent*/ },
        {path:'messages/:chatID', /*ChatComponent*/ },

    // Rutas Moderator Panel: Usuario Moderador. Falta implemetar el Guard y hacer sus hijos

    {path:'moderator-panel', /*ModeratorPanelComponent*/ },
    {path:'moderator-panel/incident/:incidentID', /*IncidentViewComponent*/ },

    // Rutas Admin Panel: Usuario Administrador. Falta implemetar el Guard y hacer sus hijos

    {path:'admin-panel', /*AdminPanelComponent*/ },
    {path:'admin-panel/users', /*AdminUsersComponent*/ },
    {path:'admin-panel/users/:userID', /*AdminUsersViewComponent*/ },
    {path:'admin-panel/categories', /*CategoriesComponent*/ },
    {path:'admin-panel/categories/:categoryID', /*CategoriesViewComponent*/ },
    {path:'admin-panel/statistics', /*StatisticsComponent*/ },
    {path:'**',component:C404}
];
