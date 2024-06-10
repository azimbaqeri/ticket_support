import { Routes } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page-404/page-404.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { administrateurGuard } from './administrateur.guard';
import { intervenantGuard } from './intervenant.guard';
import { TicketComponent } from './ticket/ticket.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'add-user', component: EditUserComponent, canActivate: [administrateurGuard]},
    { path: 'add-ticket', component: AddTicketComponent},
    { path: 'edit-user/:id', component: EditUserComponent, canActivate: [administrateurGuard] },
    { path: 'connexion', component: ConnexionComponent},
    { path: 'manage-user', component: ManageUserComponent, canActivate: [intervenantGuard]},
    { path: 'ticket/:ticket_id', component: TicketComponent},
    { path: '', redirectTo:'home', pathMatch: 'full'},
    { path: '**', component: Page404Component},
        
];
