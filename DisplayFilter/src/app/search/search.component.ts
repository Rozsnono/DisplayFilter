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

  offset = 0;
  limit = 10;

  loading = true;

  monitors = [];
  count = 0;

  getMonitors(){
    
    this.http.get<any[]>(this.backendURL+"/api/monitors").subscribe(
      {
        next: (data: any) => {
          this.monitors = data;
          this.count = this.monitors.length;
          this.loading = false;
        },
        error: error => console.log(error)
      }
    )
  }

  handlePageEvent(event: any){
    this.getMonitors();
  }


  // getPagination(){
  //   this.http.get<any[]>(this.backendURL+"/api/pagination/"+this.offset+"/"+this.limit+"/1/1").subscribe(
  //     {
  //       next: (data: any) => {
  //         console.log(data);
  //         this.count = data.count;
  //         this.monitors = data.monitors;
  //         this.loading = false;
  //       },
  //       error: error => console.log(error)
  //     }
  //   )
  // }
}
