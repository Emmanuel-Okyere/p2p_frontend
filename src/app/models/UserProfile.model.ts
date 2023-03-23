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
export interface NextOfKin{
  fullName: string,
  emailAddress:string
}
interface Telephone{
  number:string,
}
export interface UserProfileResponse{
  userProfile:userProfile,
  status:string,
  message:string
}
export interface UserProfileRequest{
  telephoneNumber:Telephone[],
  dateOfBirth: Date,
  digitalAddress:string,
  nextOfKin:NextOfKin
}

export interface formRequest{
  userTelephoneNumber:string,
  dateOfBirth: Date,
  digitalAddress:string,
  nextOfKinFullName: string,
  nextOfKinEmailAddress:string,
  fullName:string,
  username:string,
  emailAddress:string,

}
