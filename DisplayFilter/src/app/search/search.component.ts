import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private http: HttpClient) {
    this.getMonitors();
  }

  ngOnInIt() {

  }

  offset = 0;
  limit = 10;

  loading = true;

  monitors = [];
  cmonitors = [];

  count = 0;

  newmonitors = "";

  testPic = "";

  AddNewMonitor() {
    this.newmonitors = JSON.parse(this.newmonitors);
    this.Timer(0);

  }

  Timer(p1: any) {
    let time = setInterval(() => {
      this.addToDatabase(p1);
      console.log(time);
      p1++;
    }, 850);
  }


  async addToDatabase(e: any) {
    let element: any = this.newmonitors[e];



    let tmpOBJ = {
      name: element.Manufacturer + element.Model,
      productname: element.Model,
      picture: "https://p1.akcdn.net/mid/618434731.acer-predator-xb273kgpbmiipprzx-um-hx3ee-p13.jpg",
      resolution: element.Resolution,
      description: element.Type,
      displaysize: element.Size1,
      responsetime: "1 ms",
      refreshrate: element.refresh,
      type: element.types,
      price: 1000,
      others: []
    }


    this.http.post<any[]>(this.backendURL + "/api/new", tmpOBJ).subscribe(
      {
        next: (data: any) => { },
        error: error => console.log(error.message)
      }
    )
  }

  getMonitors() {

    this.http.get<any[]>(this.backendURL + "/api/monitors").subscribe(
      {
        next: (data: any) => {
          this.monitors = data;
          this.cmonitors = this.monitors.slice(this.offset, this.offset + this.limit);

          this.count = this.monitors.length;
          this.loading = false;
        },
        error: error => console.log(error)
      }
    )
  }

  handlePageEvent(event: any) {
    this.getMonitors();
    this.limit = event.pageSize;
    console.log(event);

    this.offset = event.pageIndex * this.limit;


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
