import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './components/home/appointment/appointment.component';
import { DoctorsComponent } from './components/home/appointment/doctors/doctors.component';
import { CardComponent } from './components/card/card.component';
import { ChannelComponent } from './components/home/appointment/channel/channel.component';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { PharmacyComponent } from './components/home/pharmacy/pharmacy.component';
import { ProfileComponent } from './components/home/profile/profile.component';
import { ReserveComponent } from './components/home/reserve/reserve.component';
import { HomeComponent } from './components/home/home.component';
import { ChannelDetailsComponent } from './components/home/appointment/channel-details/channel-details.component';

const routes: Routes = [ // routes order is very important
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'app', component: HomeComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'reserve', component: ReserveComponent },
      {
        path: 'appointment', component: AppointmentComponent, children: [
          { path: '', component: DoctorsComponent },
          { path: ':doctorIndex', component: ChannelComponent },
          { path: ':doctorIndex/:dayIndex', component: ChannelDetailsComponent }
        ], canActivate: [AuthGuard]
      },
      { path: 'schedule', component: CardComponent, canActivate: [AuthGuard] },
      { path: 'pharmacy', component: PharmacyComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    ], canActivate: [AuthGuard]
  },
  // {path: 'appointment/:index',component: ChannelComponent},
  //{path: '**',component: NotFoundComponent} activate when user navigate to invalid route
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
