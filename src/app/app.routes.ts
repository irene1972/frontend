import { Routes } from '@angular/router';
import { HomeComponentComponent } from './pages/home-component/home-component.component';
import { LoginComponentComponent } from './pages/login-component/login-component.component';
import { RegisterComponentComponent } from './pages/register-component/register-component.component';
import { UserFormComponentComponent } from './pages/user-form-component/user-form-component.component';
import { ProductViewComponentComponent } from './pages/product-view-component/product-view-component.component';
import { ProductFormComponentComponent } from './pages/product-form-component/product-form-component.component';
import { ProductCheckoutComponentComponent } from './pages/product-checkout-component/product-checkout-component.component';
import { FavoritesComponentComponent } from './pages/favorites-component/favorites-component.component';
import { UserMyPurchasesComponentComponent } from './pages/user-my-purchases-component/user-my-purchases-component.component';
import { MessagesComponentComponent } from './pages/messages-component/messages-component.component';
import { ModeratorPanelComponentComponent } from './components/organisms/moderator/moderator-panel-component/moderator-panel-component.component';
import { IncidentViewComponentComponent } from './components/organisms/moderator/incidents-component/incident-view-component/incident-view-component.component';
import { UserComponentComponent } from './pages/user-component/user-component.component';
import { ModeratorComponentComponent } from './pages/moderator-component/moderator-component.component';
import { AdminComponentComponent } from './pages/admin-component/admin-component.component';
import { C404componentComponent } from './errors/c404component/c404component.component';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';
import { ChatComponentComponent } from './pages/chat-component/chat-component.component';
import { C403componentComponent } from './errors/c403component/c403component.component';
import { C500componentComponent } from './errors/c500component/c500component.component';
import { UsuariosRoles } from './components/organisms/admin/usuarios-roles/usuarios-roles';
import { Panel } from './components/organisms/admin/panel/panel';
import { Categories } from './components/organisms/admin/categories/categories';
import { Statistics } from './components/organisms/admin/statistics/statistics';
import { Admin } from './pages/admin/admin';
import { HomeHeroComponent } from './pages/home-hero-component/home-hero-component';
import { Reports } from './components/organisms/admin/reports/reports';
import { DetalleUsuario } from './components/organisms/admin/detalle-usuario/detalle-usuario';
import { CreateCategory } from './components/organisms/admin/categories/create-category/create-category';
import { EditCategory } from './components/organisms/admin/categories/edit-category/edit-category';
import { UserPanel } from './pages/user-panel/user-panel';
import { Profile } from './components/organisms/user/profile/profile';
import { Favorites } from './components/organisms/user/favorites/favorites';
import { IncidentsComponentComponent } from './components/organisms/moderator/incidents-component/incidents-component.component';
import { HistoricModeratorComponentComponent } from './components/organisms/moderator/historic-moderator-component/historic-moderator-component.component';
import { ModeratorComponent } from './pages/moderator/moderator.component';
import { IncidentReportDetailComponent } from './components/organisms/moderator/incidents-component/incident-report-detail-component/incident-report-detail-component';
import { Sales } from './components/organisms/user/sales/sales';
import { EditArticle } from './components/organisms/user/edit-article/edit-article';
import { ExploreComponent } from './pages/explore-component/explore-component';
import { WriteReview } from './components/organisms/user/write-review/write-review';
import { ProductReportPage } from './pages/reports/product-report-page/product-report-page';
import { SellerProfile } from './pages/seller-profile/seller-profile';
import { ProductPublished } from './pages/product-published/product-published';
import { ReviewView } from './pages/review-view/review-view';
import { MyReviews } from './pages/my-reviews/my-reviews';
import { AdminModeratorProfileComponent } from './components/organisms/moderator/admin-moderator-profile/admin-moderator-profile.component';
import { ReportsDetailComponent } from './components/organisms/admin/reports/reports-detail/reports-detail.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponentComponent },
    { path: 'home-hero', component: HomeHeroComponent },
    { path: 'explore', component: ExploreComponent },
    { path: 'login', component: LoginComponentComponent },
    { path: 'register', component: RegisterComponentComponent },
    { path: 'product/:productID', component: ProductViewComponentComponent },
    { path: 'product/published/:productID', component: ProductPublished },

    // // Rutas Home: Usuario Normal. 
    {
        path: 'user', component: UserComponentComponent, canActivate: [authGuard], children: [
            { path: '', pathMatch: 'full', redirectTo: 'profile' },
            { path: 'new-product', component: ProductFormComponentComponent },
            { path: 'product/:productID', component: ProductViewComponentComponent },
            { path: 'product/edit/:productID', component: ProductFormComponentComponent },
            { path: 'product/checkout/:productID', component: ProductCheckoutComponentComponent },
            { path: 'panel', component: UserPanel,
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'profile' },
                    {
                        path: 'profile',
                        component: Profile
                    },
                    {
                        path: 'favorites',
                        component: Favorites
                    },
                    {
                        path: 'sales',
                        component: Sales
                    },
                    {
                        path: 'my-purchases',
                        component: UserMyPurchasesComponentComponent
                    },
                    {
                        path: 'my-purchases/write-review/:id',
                        component: WriteReview
                    },
                    {
                        path: 'my-reviews',
                        component: MyReviews
                    },
                    {
                        path: 'my-reviews/:reviewID',
                        component: ReviewView
                    },
                    {
                        path: 'article/edit/:id',
                        component: EditArticle
                    },
                    {
                        path: 'edit-profile/:userID',
                        component: UserFormComponentComponent
                    }
                ]
             },
            /*{ path: 'profile/:userID', component: UserProfileComponentComponent }, */

            { path: 'favorites', component: FavoritesComponentComponent },
            /*{ path: 'my-purchases', component: UserMyPurchasesComponentComponent },*/
            //reportes
            {path: 'report/product/:productID', component: ProductReportPage},
            // Ruta Mensajeria
            { path: 'messages', component: MessagesComponentComponent },
            { path: 'messages/:userID', component: ChatComponentComponent },
            { path: 'sellers/:userID', component: SellerProfile },
        ]
    },

    // // Rutas Moderator Panel: Usuario Moderador.

    {
        path: 'moderator', component: ModeratorComponentComponent, canActivate: [authGuard, roleGuard], data: {roles: ['Moderador', 'Administrador']}, children: [
            { path: '', pathMatch: 'full', redirectTo: 'panel' },
            { path: 'panel', component: ModeratorComponent, children: [
                    { path: '', pathMatch: 'full', redirectTo: 'main' },
                    { path: 'main', component: ModeratorPanelComponentComponent },
                    { path: 'incidents', component: IncidentsComponentComponent },
                    { path: 'incident/:articuloId', component: IncidentViewComponentComponent},
                    { path: 'incident/:articuloId/:reporteId', component: IncidentReportDetailComponent},
                    { path: 'historic', component: HistoricModeratorComponentComponent},
                    { path: 'profile', component: AdminModeratorProfileComponent }
                ]
            }
        ]
    },

    // // Rutas Admin Panel: Usuario Administrador. 

    {
        path: 'admin', component: AdminComponentComponent, canActivate: [authGuard, roleGuard], data: {roles: ['Administrador']}, children: [
            { path: '', pathMatch: 'full', redirectTo: 'panel' },
            { path: 'panel', component: Admin, children: [
                    { path: '', pathMatch: 'full', redirectTo: 'main' },
                    { path: 'main', component: Panel },
                    { path: 'users', component: UsuariosRoles },
                    { path: 'user/:id', component: DetalleUsuario },
                    { path: 'categories', component: Categories },
                    { path: 'categories/create', component: CreateCategory },
                    { path: 'categories/edit/:id', component: EditCategory },
                    { path: 'statistics', component: Statistics },
                    { path: 'reports', component: Reports },
                    { path: 'reports/:articuloId', component: ReportsDetailComponent },
                    { path: 'profile', component: AdminModeratorProfileComponent }
                ]
            }
        ]
    },
    //errors
    { path: '403error', component: C403componentComponent },
    { path: '500error', component: C500componentComponent },
    { path: '**', component: C404componentComponent }
];
