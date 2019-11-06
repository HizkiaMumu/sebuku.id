import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-transaction',
  templateUrl: './detail-transaction.page.html',
  styleUrls: ['./detail-transaction.page.scss'],
})
export class DetailTransactionPage implements OnInit {

  detailData: any;

  constructor(private dataService: DataService) {
    this.detailData = dataService.getData();
    console.log(this.detailData);
  }

  ngOnInit() {
  }

}
