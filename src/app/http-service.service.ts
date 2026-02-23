import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(public httpClient: HttpClient, public router: Router) { }

  post(endpoint: any, bean: any, callback: any) {

    this.httpClient.post(endpoint, bean, { withCredentials: true }).subscribe((response) => {
       callback(response);
    }, (error) => {
      if (error.status == 401) {
        this.router.navigateByUrl('/login')
      }
    })

  }

  get(endpoint: any, callback: any) {
    this.httpClient.get(endpoint, { withCredentials: true }).subscribe((response) => {
      callback(response);
    }, (error) => {
      if (error.status == 401) {
        this.router.navigateByUrl('/login')
      }
    })
  }


}
