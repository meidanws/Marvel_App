class User {
    userId: Number;
    userName: String;
    password: String;
    email: String;
    permissions:number[];
  

  constructor(){
      this.userName = "";
      this.userId = 0;
      this.password="";
      this.email="";
      this.permissions = [0]
  }

  logout(cb: any){
       this.userName = "";
      this.userId = 0;
      this.password="";
      this.email="";
      this.permissions = [0]
  }

 
}

export default new User();