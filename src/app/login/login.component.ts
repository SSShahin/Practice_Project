import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform!:FormGroup
  
  constructor(private formBuilder:FormBuilder, private _http:HttpClient,private router:Router){

  }

  ngOnInit(): void {
    this.loginform=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  login(){
     this._http.get<any>("http://localhost:3000/signup").subscribe(res=>{
    const user=res.find((a:any)=>{
      return a.email===this.loginform.value.email && a.password===this.loginform.value.password
    })
    if(user){
      alert("Successfully Logged In");
      this.loginform.reset();
      this.router.navigate(['student'])
    }
    else{
      alert("User not found with These Credentials")
    }
   },
   err=>{
      alert("Semthing went Wrong!!")
   })
  }
}
