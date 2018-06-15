import { CommonModule, Location } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as using from 'jasmine-data-provider';
import { instance, mock, spy, verify } from 'ts-mockito/lib/ts-mockito';
import { ICM_BASE_URL } from '../../../../core/services/state-transfer/factories';
import { Product, ProductType } from '../../../../models/product/product.model';
import { ProductDetailActionsComponent } from './product-detail-actions.component';

describe('Product Detail Actions Component', () => {
  let component: ProductDetailActionsComponent;
  let fixture: ComponentFixture<ProductDetailActionsComponent>;
  let product: Product;
  let translate: TranslateService;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, TranslateModule.forRoot()],
      providers: [
        TranslateService,
        { provide: Location, useFactory: () => instance(mock(Location)) },
        { provide: ICM_BASE_URL, useValue: 'http://example.org' },
      ],
      declarations: [ProductDetailActionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailActionsComponent);
    component = fixture.componentInstance;
    translate = TestBed.get(TranslateService);
    translate.setDefaultLang('en');
    translate.use('en');
    product = { sku: 'sku' } as Product;
    product.availability = true;
    element = fixture.nativeElement;
    component.product = product;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  describe('link rendering', () => {
    function dataProvider() {
      return [
        {
          className: '.glyphicon-send',
          linkName: 'email to friend',
          localeKey: 'product.email_a_friend.link',
          localeValue: 'Email a friend',
        },
        {
          className: '.glyphicon-print',
          linkName: 'print page',
          localeKey: 'product.print_page.link',
          localeValue: 'Print Page',
        },
        {
          className: '.glyphicon-equalizer',
          linkName: 'compare',
          localeKey: 'product.compare.link',
          localeValue: 'Compare',
        },
      ];
    }
    using(dataProvider, dataSlice => {
      it(`should show "${dataSlice.linkName}" link when product inforamtion is available`, () => {
        translate.set(dataSlice.localeKey, dataSlice.localeValue);
        fixture.detectChanges();
        expect(element.querySelector(dataSlice.className).nextElementSibling.textContent).toContain(
          dataSlice.localeValue
        );
      });
    });

    it('should not show "compare" link when product inforamtion is available and productMaster = true', () => {
      component.product.type = ProductType.VariationProductMaster;
      fixture.detectChanges();
      expect(element.querySelector("[data-testing-id='compare-sku']")).toBeFalsy();
    });
  });

  it('should emit "product to compare" event when compare link is clicked', () => {
    const eventEmitter$ = spy(component.productToCompare);
    fixture.detectChanges();

    element.querySelector<HTMLElement>("[data-testing-id='compare-sku'] a").click();

    verify(eventEmitter$.emit()).once();
  });
});
