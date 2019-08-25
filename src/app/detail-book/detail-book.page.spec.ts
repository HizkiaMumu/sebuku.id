import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBookPage } from './detail-book.page';

describe('DetailBookPage', () => {
  let component: DetailBookPage;
  let fixture: ComponentFixture<DetailBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBookPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
