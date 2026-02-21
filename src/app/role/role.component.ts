import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {

  constructor(public httpService: HttpServiceService){}

  endpoint = 'http://localhost:8080/Role/save'

  form: any = {
    data: {},
    errormsg: "",
    successmsg: "",
    inputerror: {}
  }

  save(){
    let self = this;
    console.log('data', this.form.data);

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
