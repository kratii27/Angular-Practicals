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

  constructor(public httpService: HttpServiceService, public httpClient: HttpClient, public activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe((pathVariable: any) => {
      this.form.data.id = pathVariable['id'];
    })

  }

  ngOnInit(): void {
    this.preload();
    if (this.form.data.id && this.form.data.id > 0) {
      this.display();
    }
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

  fileToUpload: any = null;


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

       if (self.fileToUpload != null) {
        self.uploadFile();
      }
      self.display();
    })
  }

  preload() {
    var self = this
    this.httpService.get(this.preloadep , function (res: any) {
      console.log("roleList", res)
      self.form.preload = res.result.roleList;
    });
  }

  display() {
    var self = this;
    this.httpService.get('http://localhost:8080/User/get/' + this.form.data.id, function (res: any) {
      self.form.data = res.result.data;
    })
  }

   onFileSelect(event: any) {
    this.fileToUpload = event.target.files.item(0);
    console.log('file===>', this.fileToUpload);
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    return this.httpService.post("http://localhost:8080/User/profilePic/" + this.form.data.id, formData, function (res: any) {
      console.log("imageId = " + res.result.imageId);
      res.result.imageId = res.result.imageId;
    });
  }
}
