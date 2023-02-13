import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monitor-dialog',
  templateUrl: './monitor-dialog.component.html',
  styleUrls: ['./monitor-dialog.component.scss']
})
export class MonitorDialogComponent {
  @Input() data: any= {};

  constructor(private router: Router, private http: HttpClient){
  }

  backendURL = "https://displayfilter.herokuapp.com";

  loading = true;

  ngOnInit(){
    this.router.events.subscribe((url:any) => {
      url = url.routerEvent.url;

      this.http.get<any[]>(this.backendURL+"/api/monitor/"+url.split('/')[url.split('/').length-1]).subscribe(
        {
          next: (data: any) => {
            this.data = data;
            this.loading = false;
            console.log(data);
          },
          error: error => console.log(error)
        }
      )
    });
  }

  
}
