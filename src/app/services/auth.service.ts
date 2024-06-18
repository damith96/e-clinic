import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserAuthenticated = false;
  private tokenTimer: any;

  constructor(private http: HttpClient, public router: Router) { }

  getIsAuth() {
    return this.isUserAuthenticated;
  }

  login(data: any) {
    this.http.post<{ success: boolean, message: string, token: string, id: string, expiresIn: number }>(baseUrl + "/login", data)
      .subscribe(result => {
        if (result.success) {
          const expiresInDuration = result.expiresIn;
          this.setAuthTimer(expiresInDuration);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(result.token,result.id,expirationDate);
          this.isUserAuthenticated = true;
          this.router.navigateByUrl('app/dashboard', { replaceUrl: true });
        } else {
          alert(result.message);
        }
      });
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      this.isUserAuthenticated = true;
      const currentRoute = localStorage.getItem('route');
      this.setAuthTimer(expiresIn / 1000);
      if(currentRoute){
        this.router.navigate([currentRoute], { replaceUrl: true });
      }
      //this.authStatusListener.next(true);
    }
  }

  logout(): void {
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.isUserAuthenticated = false;
    this.router.navigateByUrl('/login');
  }

  private saveAuthData(token: string, id: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    localStorage.setItem('expiration',expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("expiration");
    localStorage.removeItem("route");
  }

  private getAuthData(): any{
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if(!token || !expirationDate){
      return;
    }
    return{
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  reservation(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(baseUrl + "/reserve",data);
  }

  appointment(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(baseUrl + "/appointment",data);
  }

  pharmacy(data:any): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.put(baseUrl + "/pharmacy",data);
  }

  getSchedule(): Observable<any> {
    return this.http.get(baseUrl + '/schedule/regular_eye_clinics');
  }

  getDashboard(): Observable<any> {
    const id = localStorage.getItem('id');
    return this.http.get(baseUrl + '/dashboard/' + id);
  }

  getDoctors(): Observable<any> {
    return this.http.get(
      baseUrl + '/doctors'
    );
  }

  getDoctor(doctorId: number): Observable<any> {
    return this.http.get(
      baseUrl + '/doctor/' + doctorId
    );
  }

  getDays(doctorId: number): Observable<any> {
    return this.http.get(
      baseUrl + '/days/' + doctorId
    );
  }

  updatePatient(doctorId: number, date: string, no: number): Observable<any> {
    console.log(baseUrl + '/appointment/' + doctorId + "/30-09-2021")
    return this.http.put(
      baseUrl + '/appointment/' + doctorId + '/' + "30-09-2021",
      { patientNo: no }
    );
  }
}
