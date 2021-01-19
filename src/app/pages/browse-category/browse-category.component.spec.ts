import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseCategoryComponent } from './browse-category.component';

describe('BrowseCategoryComponent', () => {
  let component: BrowseCategoryComponent;
  let fixture: ComponentFixture<BrowseCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
