import { TestBed, inject } from '@angular/core/testing';

import { FetchProductsService } from './fetch-products.service';

describe('FetchProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchProductsService]
    });
  });

  it('should be created', inject([FetchProductsService], (service: FetchProductsService) => {
    expect(service).toBeTruthy();
  }));
});
