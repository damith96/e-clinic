import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  telephone: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',telephone:'225/226'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',telephone:'225/226'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',telephone:'225/226'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',telephone:'225/226'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B',telephone:'225/226'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',telephone:'225/226'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N',telephone:'225/226'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O',telephone:'225/226'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F',telephone:'225/226'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne',telephone:'225/226'},
// ];


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('fade', [             //inside trigger we often have state and transition function calls
      transition('void => *', [   //goes void state to default state
        style({opacity:0, marginTop:20}),
        animate(1000),
      ])
    ])
  ]
})

export class CardComponent {

  displayedColumns: string[] = ['date', 'time', 'room_number', 'consultant','telephone'];
  dataSource: any[] = [];

  constructor(private authService: AuthService) {
    this.setSchedule();
  }

  setSchedule():void{
    this.authService.getSchedule().subscribe(result=>{
      if(result.success){
        console.log(result);
        this.dataSource = result.data;
      }else{
        
      }
    });
  }

}
