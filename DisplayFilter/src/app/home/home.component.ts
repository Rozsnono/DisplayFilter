import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  backendURL = "https://displayfilter.herokuapp.com";
  monitors : any=[];
  constructor(private http: HttpClient){
    this.getMonitors();
  }
  getMonitors() {

    this.http.get<any[]>(this.backendURL + "/api/monitors").subscribe(
      {
        next: (data: any) => {
          this.monitors = data;
          
        },
        error: error => console.log(error)
      }
    )
  }


}
