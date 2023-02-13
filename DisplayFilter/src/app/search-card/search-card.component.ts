import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent {
  @Input() monitor: any = {};

  constructor(){
    
  }

  ngOnInit(){
    console.log(this.monitor);
  }
}
