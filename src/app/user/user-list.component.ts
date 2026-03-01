import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {


  form: any = {
    list: [],
    pageNo: 0,
    searchParam: {},
    preload: [],
    message: "",
    deleteParams: []
  }


  preloadep = 'http://localhost:8080/User/preload/'

  constructor(public httpservice: HttpServiceService, public router: Router) { }

  ngOnInit(): void {
    this.search();
    this.preload();
  }

  search() {
    let self = this;
    this.httpservice.post('http://localhost:8080/User/search/' + this.form.pageNo, this.form.searchParam, function (res: any) {
      console.log("res" + res.result.data)
      self.form.list = res.result.data;
    })
  }

  reset() {
    location.reload()
  }

  preload() {
    let self = this;
    this.httpservice.get(this.preloadep, function (res: any) {
      console.log("res" + res)
      self.form.preload = res.result.roleList;
    })
  }

  onCheckboxChange(userId: any, event: any) {
    if (event.target.checked) {
      this.form.deleteParams.push(userId); // add when checked
    } else {
      this.form.deleteParams = this.form.deleteParams.filter((id: any) => id !== userId); // remove when unchecked
    }
    console.log('ids: ', this.form.deleteParams);
  }

  delete() {
    var self = this;
    const ids = this.form.deleteParams.join(','); // "1,2,3"

    this.httpservice.get('http://localhost:8080/User/delete/' + ids, function (res: any) {
      console.log("res", res);
      if (res.success && res.result.message) {
        self.form.message = res.result.message;
      }
      self.form.deleteParams = []; // clear after delete
      self.search();
    });
  }

  edit(path: any) {
    console.log('path: ', path)
    this.router.navigateByUrl(path);
  }

  previous() {
    this.form.pageNo--;
    console.log(this.form.pageNo)
    this.search();
  }

  next() {
    this.form.pageNo++;
    console.log(this.form.pageNo)
    this.search();
  }

}
