import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../http-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(public httpService: HttpServiceService) { }

  ngOnInit(): void {
    this.preload();
  }

  endpoint = 'http://localhost:8080/User/save'
  preloadep = 'http://localhost:8080/User/preload'

  form: any = {
    data: {},
    errormsg: "",
    successmsg: "",
    inputerror: {},
    preload: []
  }


  save() {
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

  preload() {
    var self = this
    this.httpService.get(this.preloadep , function (res: any) {
      console.log("roleList", res)
      self.form.preload = res.result.roleList;
    });
  }
}
