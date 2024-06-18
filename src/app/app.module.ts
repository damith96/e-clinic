import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio'; 

//Third Party Modules
// import { AgmCoreModule } from '@agm/core';
// import { AngularFileUploaderModule } from "angular-file-uploader";
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { FlexLayoutModule } from '@angular/flex-layout';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ReserveComponent } from './components/home/reserve/reserve.component';
import { AppointmentComponent } from './components/home/appointment/appointment.component';
import { ScheduleComponent } from './components/home/schedule/schedule.component';
import { PharmacyComponent } from './components/home/pharmacy/pharmacy.component';
import { ProfileComponent } from './components/home/profile/profile.component';
import { ChannelComponent } from './components/home/appointment/channel/channel.component';
import { ChannelDetailsComponent } from './components/home/appointment/channel-details/channel-details.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DoctorsComponent } from './components/home/appointment/doctors/doctors.component';
import { HomeComponent } from './components/home/home.component';
import { OsmViewComponent } from './components/osm-view/osm-view.component';

//Interceptors
import { HeaderInterceptor } from './interceptors/header.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SideNavComponent,
    ReserveComponent,
    AppointmentComponent,
    ScheduleComponent,
    PharmacyComponent,
    ProfileComponent,
    ChannelComponent,
    ChannelDetailsComponent,
    DialogComponent,
    DoctorsComponent,
    HomeComponent,
    OsmViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatBadgeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule
    //AgmCoreModule.forRoot({
      //apiKey:'AIzaSyCLJL6LzLlAwwiqt1ctMh5ZE9uhM10wzt4'
    //}),
    //AngularFileUploaderModule,
    //AngularOpenlayersModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'primary' },},
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true}
    // provideCharts(withDefaultRegisterables())
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
