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
    }, 2000);
  }

  Timer2(p1: any = 0) {
    let time = setInterval(() => {
      this.deleteAll(p1);
      p1++;
    }, 2000);
  }


  addToDatabase(e: any) {
    let element: any = this.newmonitors[e];

    this.http.post<any[]>(this.backendURL + "/api/pic", { search: (element.Manufacturer + " " + element.Model) }).subscribe(
      {
        next: (data: any) => {

          let tmpOBJ = {
            name: element.Manufacturer + " " + element.Model,
            productname: element.Model,
            picture: data[0].original,
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
              next: (data: any) => { console.log("Done!"); },
              error: error => console.log(error.message)
            }
          )

        },
        error: error => console.log(error.message)
      }
    )


  }

  deleteAll(id: any){
    this.http.delete<any[]>(this.backendURL + "/api/monitors/"+id).subscribe(
      {
        next: (data: any) => {console.log("Deleted ", id)},
        error: error => console.log(error)
        
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
