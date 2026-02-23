import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  constructor(public router: Router, public httpService: HttpServiceService){}

  form: any = {
    data: {}
  }

  isLogin() {
    let check = localStorage.getItem('firstName')

    if (check != 'null' && check != null) {
      this.form.data.firstName = localStorage.getItem('firstName');
      this.form.data.roleName = localStorage.getItem('role');
      this.form.data.id = localStorage.getItem('id');
      return true;
    }
    return false;
  }

  logout() {
    localStorage.clear()
    this.httpService.post('http://localhost:8080/Auth/logout', {}, function (res: any) {
      console.log("logout res: ", res)
    })
    this.router.navigateByUrl('login')

  }
}
