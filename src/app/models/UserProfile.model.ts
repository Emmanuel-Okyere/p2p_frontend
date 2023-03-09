export interface userProfile{
  fullName:string,
  id:number,
  emailAddress:string
  approved:boolean
  telephoneNumber:[Telephone],
  dateOfBirth: Date,
  digitalAddress:string,
  nextOfKin:NextOfKin
}
interface NextOfKin{
  fullName: string,
  emailAddress:string
}
interface Telephone{
  number:string
}
export interface UserProfileResponse{
  userProfile:userProfile,
  status:string,
  message:string
}
