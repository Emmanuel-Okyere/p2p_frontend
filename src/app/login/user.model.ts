export  class UserModel{
  constructor(
    public emailAddress:string,
    public id:number,
    public username:string,
    private _accessTokenExpirationDate:Date,
    private _accessToken:string,
    private _refreshToken:string) {

  }

  get accessToken(){
    if(!this._accessTokenExpirationDate || new Date() > this._accessTokenExpirationDate){
      return null;
    }
    return this._accessToken
  }
  get accessTokenExpirationDate(){
    return this._accessTokenExpirationDate
  }
}
