import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.page.html',
  styleUrls: ['./detail-book.page.scss'],
})
export class DetailBookPage implements OnInit {

  aboutBook: boolean = true;
  bookOwner: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  showAboutBook(){
    this.aboutBook = true;
    this.bookOwner = false;
  }

  showBookOwner(){
    this.bookOwner = true;
    this.aboutBook = false;
  }

}
