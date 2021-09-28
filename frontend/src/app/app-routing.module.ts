import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './account/login/login.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TicketCreateComponent } from './dashboard/tickets/ticket-create/ticket-create.component';
import { TicketDetailComponent } from './dashboard/tickets/ticket-detail/ticket-detail.component';
import { TicketsComponent } from './dashboard/tickets/tickets.component';
import { TopicsComponent } from './dashboard/topics/topics.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReportsComponent } from './reports/reports.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'groups/:group_id',
        component: TopicsComponent,
      },
      {
        path: 'groups/:group_id/topics/:topic_id',
        component: TicketsComponent,
      },
      {
        path: 'groups/:group_id/topics/:topic_id/tickets/:ticket_id',
        component: TicketDetailComponent,
      },
      {
        path: 'tickets/create',
        component: TicketCreateComponent,
      },
      {
        path: 'tickets/:ticket_id',
        component: TicketDetailComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
