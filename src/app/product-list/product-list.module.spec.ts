import { ProductListModule } from './product-list.module';

describe('ProductListModule', () => {
  let productListModule: ProductListModule;

  beforeEach(() => {
    productListModule = new ProductListModule();
  });

  it('should create an instance', () => {
    expect(productListModule).toBeTruthy();
  });
});
