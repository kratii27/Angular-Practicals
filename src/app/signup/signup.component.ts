import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(public httpService: HttpServiceService) {

  }

  endpoint = 'http://localhost:8080/Auth/signUp'

  form: any = {
    data:{},
    message: ""
  }

  signUp(){
    let self = this;
    console.log('firstName', this.form.data.firstName);
    console.log('lastName', this.form.data.lastName);
    console.log('login', this.form.data.login);
    console.log('password', this.form.data.password);
    console.log('dob', this.form.data.dob);

    this.httpService.post(this.endpoint, this.form.data, function (res: any){
      console.log("response: ", res);
      self.form.message = res.result.message;
    })
  }
}
