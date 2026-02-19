import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  constructor(public router: Router){}

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
    this.router.navigateByUrl('login')

  }
}
