import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 constructor(public httpService: HttpServiceService, public router: Router) {

  }

  endpoint = 'http://localhost:8080/Auth/login'

  form: any = {
    data:{},
    errormsg: "",
    successmsg: "",
    inputerror: {}
  }

  signIn(){
    let self = this;
    console.log('res', this.form.data);


    this.httpService.post(this.endpoint, this.form.data, function (res: any) {
      console.log("response: ", res);


      if (!res.success && res.result.inputerror) {
        self.form.inputerror = res.result.inputerror;
      }

      if (!res.success && res.result.message) {
        self.form.errormsg = res.result.message;
      }

      if (res.success) {
        localStorage.setItem('firstName', res.result.data.firstName);
        localStorage.setItem('role', res.result.data.roleName);
        localStorage.setItem('id', res.result.data.id);
        self.form.successmsg = res.result.message;
        self.router.navigateByUrl('welcome');
      }
    })
  }
}
