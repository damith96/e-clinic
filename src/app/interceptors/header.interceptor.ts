import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if(token){
            const newReq = req.clone({
                setHeaders: { 'Authorization': `Bearer ${token}` }
            });
            return next.handle(newReq);
        }
        return next.handle(req);
    }
    
}