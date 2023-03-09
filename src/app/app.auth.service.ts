import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {UserModel} from "./login/user.model";
import {Router} from "@angular/router";
import {UserProfileResponse} from "./models/UserProfile.model";


interface SignUpResponseData{
  message:string,
  status: string
}
interface LoginResponse{
  accessToken:string,
  message:string,
  refreshToken:string,
  status:string,
  id:number,
  username:string,
  emailAddress:string,
  role:string
}
@Injectable({providedIn:'root'})
export class AppAuthService{
  // @ts-ignore
  user = new BehaviorSubject<UserModel>(null);
  private tokenExpirationTimer :any;
  constructor(private http: HttpClient, private router:Router) {
  }
  signUp(username:String, fullName:String,emailAddress:String,role:string, password:String, confirmPassword:String): Observable<SignUpResponseData>{
    return this.http.post<SignUpResponseData>('http://localhost:8080/api/v1/auth/register',{
      username:username,
      fullName:fullName,
      emailAddress: emailAddress,
      role:role,
      password:password,
      confirmPassword:confirmPassword
    })
  }

  loginUser(emailAddress:String, password:String):Observable<LoginResponse>{
    return this.http.post<LoginResponse>("http://localhost:8080/api/v1/auth/login",{
      emailAddress:emailAddress,
      password:password
    }).pipe(tap(resData => {
      const user= new UserModel(
        resData.emailAddress,
        resData.id,resData.username
        ,new Date(new Date().getTime()+3600000)
        ,resData.accessToken,
        resData.refreshToken);
      this.user.next(user);
      // this.autoLogout(new Date().getTime()+3600000)
      localStorage.setItem("userData", JSON.stringify(user));
    }))
  }
  autoLogin(){
    let userData: { emailAddress: string; id: number; username: string; _accessTokenExpirationDate: Date; _accessToken: string; _refreshToken: string };
    // @ts-ignore
    userData = JSON.parse(localStorage.getItem("userData"));
    if(!userData){
      return;
    }
    const loadedUser = new UserModel(
      userData.emailAddress,
      userData.id,
      userData.username,
      new Date(userData._accessTokenExpirationDate),
      userData._accessToken,
      userData._refreshToken);
    if(loadedUser.accessToken){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._accessTokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }
  logout(){
    // @ts-ignore
    this.user.next(null);
    this.router.navigate(["login"]);
    localStorage.removeItem("userData");
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer=null;
  }

  autoLogout(expirationDuration:number){
    this.tokenExpirationTimer  = setTimeout(()=>{
      this.logout();
    }
    ,expirationDuration)
  }

  getUserProfile():Observable<UserProfileResponse>{
    return this.http.get<UserProfileResponse>("http://localhost:8080/api/v1/profile");
  }
}
