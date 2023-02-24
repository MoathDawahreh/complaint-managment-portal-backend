import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{
 login(){
    return 'login service'
 }
 signup(){
    return 'signup service'
 }
}