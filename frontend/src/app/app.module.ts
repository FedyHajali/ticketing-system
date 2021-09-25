import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { LoginComponent } from './account/login/login.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { TopicsComponent } from './dashboard/topics/topics.component';
import { TicketsComponent } from './dashboard/tickets/tickets.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { TopicCreateComponent } from './dashboard/topics/topic-create/topic-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TicketDetailComponent } from './dashboard/tickets/ticket-detail/ticket-detail.component';
import { TicketCreateComponent } from './dashboard/tickets/ticket-create/ticket-create.component';
import { TicketDeleteComponent } from './dashboard/tickets/ticket-delete/ticket-delete.component';
import { TopicDeleteComponent } from './dashboard/topics/topic-delete/topic-delete.component';
import { GroupsComponent } from './dashboard/groups/groups.component';
import { GroupCreateComponent } from './dashboard/groups/group-create/group-create.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaterialModule } from '../app/material/material.module';
import { GroupSubscribeComponent } from './dashboard/groups/group-subscribe/group-subscribe.component';
import { TopicSubscribeComponent } from './dashboard/topics/topic-subscribe/topic-subscribe.component';
import { ChartsModule } from 'ng2-charts';
import { RadialChartComponent } from './reports/radial-chart/radial-chart.component';
import { TicketCountComponent } from './reports/ticket-count/ticket-count.component';
import { CompleteCountComponent } from './reports/complete-count/complete-count.component';
import { PendingCountComponent } from './reports/pending-count/pending-count.component';
import { OpenCountComponent } from './reports/open-count/open-count.component';
import { BubbleChartComponent } from './reports/bubble-chart/bubble-chart.component';
import { DynamicGraphComponent } from './reports/dynamic-graph/dynamic-graph.component';
import { ListComponent } from './reports/list/list.component';
import { GroupDeleteComponent } from './dashboard/groups/group-delete/group-delete.component';
import { TicketAddReceiverComponent } from './dashboard/tickets/ticket-detail/ticket-add-receiver/ticket-add-receiver.component';
import { TicketChangeStatusComponent } from './dashboard/tickets/ticket-detail/ticket-change-status/ticket-change-status.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { TicketCommentDeleteComponent } from './dashboard/tickets/ticket-detail/ticket-comment-delete/ticket-comment-delete.component';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    TopicsComponent,
    TicketsComponent,
    SidebarComponent,
    HomeComponent,
    ReportsComponent,
    SettingsComponent,
    TopicCreateComponent,
    TicketCreateComponent,
    TicketDetailComponent,
    TicketDeleteComponent,
    TopicDeleteComponent,
    PageNotFoundComponent,
    GroupsComponent,
    GroupCreateComponent,
    GroupSubscribeComponent,
    TopicSubscribeComponent,
    RadialChartComponent,
    TicketCountComponent,
    CompleteCountComponent,
    PendingCountComponent,
    OpenCountComponent,
    BubbleChartComponent,
    DynamicGraphComponent,
    ListComponent,
    GroupDeleteComponent,
    TicketAddReceiverComponent,
    TicketChangeStatusComponent,
    TicketCommentDeleteComponent,
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
