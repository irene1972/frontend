import { Routes } from '@angular/router';
import { HomeComponentComponent } from './pages/home-component/home-component.component';
import { LoginComponentComponent } from './pages/login-component/login-component.component';
import { UserFormComponentComponent } from './pages/user-form-component/user-form-component.component';
import { ProductViewComponentComponent } from './pages/product-view-component/product-view-component.component';
import { ProductFormComponentComponent } from './pages/product-form-component/product-form-component.component';
import { ProductCheckoutComponentComponent } from './pages/product-checkout-component/product-checkout-component.component';
import { UserProfileComponentComponent } from './pages/user-profile-component/user-profile-component.component';
import { FavoritesComponentComponent } from './pages/favorites-component/favorites-component.component';
import { MessagesComponentComponent } from './pages/messages-component/messages-component.component';
import { ModeratorPanelComponentComponent } from './pages/moderator-panel-component/moderator-panel-component.component';
import { IncidentViewComponentComponent } from './pages/incident-view-component/incident-view-component.component';
import { AdminPanelComponentComponent } from './pages/admin-panel-component/admin-panel-component.component';
import { AdminUsersComponentComponent } from './pages/admin-users-component/admin-users-component.component';
import { AdminUsersViewComponentComponent } from './pages/admin-users-view-component/admin-users-view-component.component';
import { AdminCategoriesComponentComponent } from './pages/admin-categories-component/admin-categories-component.component';
import { AdminCategoriesViewComponentComponent } from './pages/admin-categories-view-component/admin-categories-view-component.component';
import { AdminStatisticsViewComponentComponent } from './pages/admin-statistics-view-component/admin-statistics-view-component.component';
import { UserComponentComponent } from './pages/user-component/user-component.component';
import { ModeratorComponentComponent } from './pages/moderator-component/moderator-component.component';
import { AdminComponentComponent } from './pages/admin-component/admin-component.component';
import { C404componentComponent } from './errors/c404component/c404component.component';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';
import { ChatComponentComponent } from './pages/chat-component/chat-component.component';
import { C403componentComponent } from './errors/c403component/c403component.component';
import { C500componentComponent } from './errors/c500component/c500component.component';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'home'},
    {path:'home', component: HomeComponentComponent },
    {path:'login', component: LoginComponentComponent },
    {path:'register', component: UserFormComponentComponent },
    {path:'product/:productID', component: ProductViewComponentComponent },

    // // Rutas Home: Usuario Normal. Falta implemetar el Guard y hacer sus hijos
    {path:'user', component: UserComponentComponent, canActivate: [authGuard], children:[
        {path: '', pathMatch:'full', redirectTo:'profile'},
        {path:'new-product', component: ProductFormComponentComponent },
        {path:'product/:productID', component: ProductViewComponentComponent },
        {path:'product/edit/:productID', component: ProductFormComponentComponent },
        {path:'product/checkout/:productID', component: ProductCheckoutComponentComponent },
        {path:'profile', component: UserProfileComponentComponent },
        {path:'edit-profile/:userID', component: UserFormComponentComponent },
        {path:'favorites', component: FavoritesComponentComponent },
         // Ruta Mensajeria
        {path:'messages', component: MessagesComponentComponent },
        {path:'messages/:chatID', component: ChatComponentComponent },
    ]},
    
    // // Rutas Moderator Panel: Usuario Moderador. Falta implemetar el Guard y hacer sus hijos

    {path:'moderator', component: ModeratorComponentComponent, canActivate: [authGuard, roleGuard],  children:[
        {path: '', pathMatch:'full', redirectTo:'panel'},
        {path:'panel', component: ModeratorPanelComponentComponent },
        {path:'incident/:incidentID', component: IncidentViewComponentComponent },
    ]},
    
    // // Rutas Admin Panel: Usuario Administrador. Falta implemetar el Guard y hacer sus hijos

    {path:'admin', component: AdminComponentComponent, canActivate: [authGuard, roleGuard],  children:[
        {path: '', pathMatch:'full', redirectTo:'panel'},
        {path: 'panel', component: AdminPanelComponentComponent },
         {path:'users', component: AdminUsersComponentComponent },
         {path:'users/:userID', component: AdminUsersViewComponentComponent},
         {path:'categories', component: AdminCategoriesComponentComponent },
         {path:'categories/:categoryID', component: AdminCategoriesViewComponentComponent },
         {path:'statistics', component: AdminStatisticsViewComponentComponent}
     ]},
    {path:'**',component:C404componentComponent},
    {path:'403error',component:C403componentComponent},
    {path:'500error',component:C500componentComponent}
];
