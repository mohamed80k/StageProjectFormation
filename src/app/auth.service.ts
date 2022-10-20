export class AuthService{
    loggeIn : boolean = false;

    login(){
        this.loggeIn = true;
    }
    logout(){
        this.loggeIn = false;
    }
    IsAuthenticate(){
      return this.loggeIn;
    }
}