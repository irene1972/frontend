import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { C404 } from './components/c404/c404';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'login'},
    {path:'', /*componenteInicial*/ },
    {path:'/login', /*componenteLogin*/ },
    {path:'/register', /*componenteUserForm*/ },


    {path:'/home', /*componenteHome */ },
    
    {path:'/new-product', /*componenteProductForm*/ },
    {path:'/product/:productID', /*componenteProductView*/ },
    {path:'/product/edit/:productID', /*componenteProductForm*/ },
    {path:'/product/checkout/:productID', /*componenteProductCheckout*/ },
    {path:'/user/:userID', /*componenteUser*/ },
    {path:'/user/edit-profile/:userID', /*componenteUserForm*/ },
    {path:'/favorites', /*componenteFavoritos*/ },


    {path:'/moderator-panel', /*componenteModerator*/ },
    {path:'/moderator-panel/incidencia/:incidenciaID', /*componenteIncidenciaView*/ },


    {path:'/admin-panel', /*componenteAdminPanel*/ },
    {path:'/admin-panel/users', /*componenteAdminUsers*/ },
    {path:'/admin-panel/users/:userID', /*componenteAdminUsersView*/ },
    {path:'/admin-panel/categorias', /*componenteCategorias*/ },
    {path:'/admin-panel/categorias/:categoriaID', /*componenteCategoriasView*/ },
    {path:'/admin-panel/estadistics', /*componenteEstadisticas*/ },
    {path:'**',component:C404}
];
