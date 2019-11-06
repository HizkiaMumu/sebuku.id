import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTransactionPage } from './detail-transaction.page';

describe('DetailTransactionPage', () => {
  let component: DetailTransactionPage;
  let fixture: ComponentFixture<DetailTransactionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTransactionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTransactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
