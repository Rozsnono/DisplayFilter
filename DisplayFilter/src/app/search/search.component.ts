import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  value = "";
  panelOpenState = false;


  
  backendURL = "https://displayfilter.herokuapp.com";

  constructor(private http: HttpClient){
    this.getMonitors();
  }

  ngOnInIt(){
    
  }

  monitors = [];

  getMonitors(){
    
    this.http.get<any[]>(this.backendURL+"/api/monitors").subscribe(
      {
        next: (data: any) => {
          this.monitors = data;
        },
        error: error => console.log(error)
      }
    )
  }
}
