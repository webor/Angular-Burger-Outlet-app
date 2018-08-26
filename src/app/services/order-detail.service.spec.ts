import { TestBed, inject } from '@angular/core/testing';

import { OrderDetailService } from './services/order-detail.service';

describe('OrderDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderDetailService]
    });
  });

  it('should be created', inject([OrderDetailService], (service: OrderDetailService) => {
    expect(service).toBeTruthy();
  }));
});
