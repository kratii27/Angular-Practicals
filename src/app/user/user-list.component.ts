import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  

   form: any = {
    list: [],
    pageNo: 0,
    searchParam: {}
  }
  endpoint = 'http://localhost:8080/User/search/' + this.form.pageNo

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
