import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent {

   form: any = {
    list: [],
    pageNo: 0,
    searchParam: {}
  }
  endpoint = 'http://localhost:8080/Role/search/' + this.form.pageNo

  constructor(public httpservice: HttpServiceService){}

  ngOnInit(): void {
    this.search();
  }

  search() {
    let self = this;
    this.httpservice.post(this.endpoint, this.form.searchParam, function (res: any) {
      console.log("res" + res.result.data)
      self.form.list = res.result.data;
    })
  }

  reset() {
    location.reload()
  }

}
