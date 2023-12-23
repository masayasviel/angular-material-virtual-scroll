import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualScrollTreeComponent } from './virtual-scroll-tree.component';

describe('VirtualScrollTreeComponent', () => {
  let component: VirtualScrollTreeComponent;
  let fixture: ComponentFixture<VirtualScrollTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualScrollTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VirtualScrollTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
