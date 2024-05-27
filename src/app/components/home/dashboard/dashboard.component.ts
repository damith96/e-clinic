import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
//import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
//import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('fade', [             //inside trigger we often have state and transition function calls
      transition('void => *', [   //goes void state to default state
        style({ opacity: 0 }),
        animate(3000),
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {

  clinicDays = 4;
  appointments = 1;
  medicines = 5;
  surgaries = 0;
  leftEye: number[] = [];
  rightEye: number[] = [];

  // public barChartOptions: ChartOptions = {
  //   responsive: true,
  //   // We use these empty structures as placeholders for dynamic theming.
  //   scales: {
  //     xAxes: [{}], yAxes: [{
  //       ticks: {
  //         max: 20,
  //         min: 10
  //       }
  //     }]
  //   },
  //   plugins: {
  //     datalabels: {
  //       anchor: 'end',
  //       align: 'end',
  //     }
  //   }
  // };
  // public barChartLabels: Label[] = ['Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9'];
  // public barChartType: ChartType = 'bar';
  // public barChartLegend = true;
  //public barChartPlugins = [pluginDataLabels];

  // public barChartData: ChartDataSets[] = [
  //   { data: this.leftEye, label: 'Left eye' },
  //   { data: this.rightEye, label: 'Right eye' }
  // ];


  //For linear chart
  // public lineChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Type A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Type B' },
  //   { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Type C', yAxisID: 'y-axis-1' }
  // ];
  // public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // public lineChartOptions: (ChartOptions & { annotation: any }) = {
  //   responsive: true,
  //   scales: {
  //     We use this empty structure as a placeholder for dynamic theming.
  //     xAxes: [{}],
  //     yAxes: [
  //       {
  //         id: 'y-axis-0',
  //         position: 'left',
  //       },
  //       {
  //         display: false,
  //         id: 'y-axis-1',
  //         position: 'right',
  //         gridLines: {
  //           color: 'rgba(255,0,0,0.3)',
  //         },
  //         ticks: {
  //           fontColor: 'red',
  //         }

  //       }
  //     ]
  //   },
  //   annotation: {
  //     annotations: [
  //       {
  //         type: 'line',
  //         mode: 'vertical',
  //         scaleID: 'x-axis-0',
  //         value: 'March',
  //         borderColor: 'orange',
  //         borderWidth: 2,
  //         label: {
  //           enabled: true,
  //           fontColor: 'orange',
  //           content: 'LineAnno'
  //         }
  //       },
  //     ],
  //   },
  // };
  // public lineChartColors: Color[] = [
  //   { // grey
  //     backgroundColor: 'rgba(148,159,177,0.2)',
  //     borderColor: 'rgba(148,159,177,1)',
  //     pointBackgroundColor: 'rgba(148,159,177,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   },
  //   { // dark grey
  //     backgroundColor: 'rgba(77,83,96,0.2)',
  //     borderColor: 'rgba(77,83,96,1)',
  //     pointBackgroundColor: 'rgba(77,83,96,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(77,83,96,1)'
  //   },
  //   { // red
  //     backgroundColor: 'rgba(255,0,0,0.3)',
  //     borderColor: 'red',
  //     pointBackgroundColor: 'rgba(148,159,177,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   }
  // ];
  // public lineChartLegend = true;
  // public lineChartType: ChartType = 'line';
  //public lineChartPlugins = [pluginAnnotations];

  //@ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private authService: AuthService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.setData();
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  //
  public chartAClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartAHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  setData(): void {
    // this.authService.getDashboard().subscribe(result => {
    //   if (result.success) {
    //     const data = result.data[0];
    //     this.clinicDays = data.clinicDays;
    //     this.appointments = data.appointments;
    //     this.medicines = data.medicines;
    //     this.surgaries = data.surgaries;
    //     this.leftEye.push(JSON.parse(data.week1).leftEye);
    //     this.leftEye.push(JSON.parse(data.week2).leftEye);
    //     this.leftEye.push(JSON.parse(data.week3).leftEye);
    //     this.leftEye.push(JSON.parse(data.week4).leftEye);
    //     this.leftEye.push(JSON.parse(data.week5).leftEye);
    //     this.leftEye.push(JSON.parse(data.week6).leftEye);
    //     this.leftEye.push(JSON.parse(data.week7).leftEye);

    //     this.rightEye.push(JSON.parse(data.week1).rightEye);
    //     this.rightEye.push(JSON.parse(data.week2).rightEye);
    //     this.rightEye.push(JSON.parse(data.week3).rightEye);
    //     this.rightEye.push(JSON.parse(data.week4).rightEye);
    //     this.rightEye.push(JSON.parse(data.week5).rightEye);
    //     this.rightEye.push(JSON.parse(data.week6).rightEye);
    //     this.rightEye.push(JSON.parse(data.week7).rightEye);

    //   } else {
    //     alert(result.message);
    //     this.router.navigateByUrl('/login', { replaceUrl: true });
    //   }
    // });
  }

}
