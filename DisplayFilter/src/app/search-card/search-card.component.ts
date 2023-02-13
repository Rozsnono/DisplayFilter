
import {Component, Inject, Input} from '@angular/core';


@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent {
  @Input() monitor: any = {};


  goTo(link: Number){
    window.location.href = window.location.href + "/" + link;
  }
}
