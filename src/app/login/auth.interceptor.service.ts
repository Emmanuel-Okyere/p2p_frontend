import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable, take} from "rxjs";
import {AppAuthService} from "../app.auth.service";

@Injectable()
export class AuthInterceptorService implements  HttpInterceptor{
  constructor(private authService:AppAuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(take(1),exhaustMap(user =>{
      if(!user){
        console.log("******* Iver here")
        console.log(req)
        return next.handle(req)
      }
      const modifiedRequest = req.clone({headers:new HttpHeaders().set("Authorization","Bearer "+user.accessToken)})
      return next.handle(modifiedRequest);
    }))

  }

}
