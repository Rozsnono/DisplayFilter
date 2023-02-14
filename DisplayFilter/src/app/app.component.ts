import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'DisplayFilter';

  backendURL = "https://displayfilter.herokuapp.com";

  compare : any;

  checkComapre(){
    this.compare = localStorage.getItem("compare");
  }
}
