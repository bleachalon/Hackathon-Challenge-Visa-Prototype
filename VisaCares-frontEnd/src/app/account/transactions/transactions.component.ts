import { Component, OnInit } from '@angular/core';
import { AccountServices } from 'src/app/services/accountServices';
import {MatTabsModule} from '@angular/material/tabs';
import { ChartsModule, Color, BaseChartDirective, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  /*public lineChartData: ChartDataSets[] = [
    { data : [{
          t: new Date("2015-3-15 13:3"),
          y: 12
        },
        {
          t: new Date("2015-3-25 13:2"),
          y: 21
        },
        {
          t: new Date("2015-4-25 14:12"),
          y: 32
        }
      ], label: 'Series A'}
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];*/

  public lineChartData: ChartDataSets[] = [{ data: [], label: 'Charity A'}];
  public lineChartLabels: Label[] = [];
  

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day'
        },
        scaleLabel: {
          display: true,
          labelString: 'Day',
          fontSize: 20
        }
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: 'Amount ($)',
            fontSize: 20

          }
        }
      ]
    },
    annotation: {
      annotations: [
        
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
    
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  transactions: any;
  sum: any;

  constructor(
    private accountService: AccountServices
  ) { }

  ngOnInit(): void {
    this.findAllTransactions();
  }

  private async findAllTransactions() {
    this.transactions = await this.accountService.getTransaction();
    this.getTotalAmount(this.transactions.data);
    this.loadLineChart(this.transactions.data);
    console.log(this.transactions.data);
  }

  private getTotalAmount(all) {
    var tempSum = 0;
    all.forEach(function(value) {
      tempSum = tempSum + parseFloat(value.amount);
    });
    this.sum = tempSum.toFixed(2);
  }

  private loadLineChart(all) {
    var points = [];

    all.forEach(function(value) {
      var tempData = {};
      tempData['t'] = new Date(value.date);
      tempData['y'] = parseFloat(value.amount);
      points.push(tempData);
    });

    this.lineChartData[0].data = points;

    console.log(points);
    console.log(this.lineChartData[0].data);

    
    

  }

}
