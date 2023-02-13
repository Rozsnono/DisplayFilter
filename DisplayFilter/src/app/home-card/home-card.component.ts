import { Component,Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent {
  @Input() name : string ="";
  @Input() resolution : string ="";
  @Input() image : string ="";
  @Input() refreshrate : string="";
  @Input() responsetime : string ="";
  @Input() displaysize : string="";

}
