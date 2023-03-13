export interface userProfile{
  id:number,
  user:user,
  telephoneNumber:[Telephone],
  dateOfBirth: Date,
  digitalAddress:string,
  nextOfKin:NextOfKin
}
interface  user{
  fullName:string,
  username:string,
  id:number,
  emailAddress:string
  approved:boolean
}
interface NextOfKin{
  fullName: string,
  emailAddress:string
}
interface Telephone{
  number:string,
  verified:boolean,
}
export interface UserProfileResponse{
  userProfile:userProfile,
  status:string,
  message:string
}
