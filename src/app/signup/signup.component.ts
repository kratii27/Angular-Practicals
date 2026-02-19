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
    data: {},
    errormsg: "",
    successmsg: "",
    inputerror: {}
  }

  signUp() {
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
        self.form.successmsg = res.result.message;
      }
    })


  }
}
