import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockComponent, MockPipe } from 'ng-mocks';
import { EMPTY, of } from 'rxjs';
import { anything, instance, mock, when } from 'ts-mockito';

import { AccountFacade } from 'ish-core/facades/account.facade';
import { CheckoutFacade } from 'ish-core/facades/checkout.facade';
import { ShoppingFacade } from 'ish-core/facades/shopping.facade';
import { PricePipe } from 'ish-core/models/price/price.pipe';
import { ProductView } from 'ish-core/models/product-view/product-view.model';
import { ProductRoutePipe } from 'ish-core/routing/product/product-route.pipe';
import { BasketMockData } from 'ish-core/utils/dev/basket-mock-data';
import { SnProductImageComponent } from 'ish-shell/sn-header/sn-product-image/sn-product-image.component';

import { SnMiniBasketComponent } from './sn-mini-basket.component';

describe.skip('Sn Mini Basket Component', () => {
  let component: SnMiniBasketComponent;
  let fixture: ComponentFixture<SnMiniBasketComponent>;
  let element: HTMLElement;
  let checkoutFacade: CheckoutFacade;

  beforeEach(async () => {
    checkoutFacade = mock(CheckoutFacade);
    const accountFacade = mock(AccountFacade);
    when(accountFacade.userPriceDisplayType$).thenReturn(of('gross'));
    const shoppingFacade = mock(ShoppingFacade);
    when(shoppingFacade.product$(anything(), anything())).thenReturn(of({} as ProductView));

    await TestBed.configureTestingModule({
      declarations: [
        MockComponent(FaIconComponent),
        MockComponent(SnProductImageComponent),
        MockPipe(ProductRoutePipe),
        PricePipe,
        SnMiniBasketComponent,
      ],
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: CheckoutFacade, useFactory: () => instance(checkoutFacade) },
        { provide: AccountFacade, useFactory: () => instance(accountFacade) },
        { provide: ShoppingFacade, useFactory: () => instance(shoppingFacade) },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnMiniBasketComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    const translate = TestBed.inject(TranslateService);
    translate.setDefaultLang('en');
    translate.use('en');
    translate.setTranslation('en', {
      'shopping_cart.ministatus.items.text': { other: '# items' },
      'shopping_cart.pli.qty.label': 'x',
      'shopping_cart.ministatus.view_cart.link': 'VIEW CART',
    });
    const lineItem = BasketMockData.getBasketItem();

    when(checkoutFacade.basketItemCount$).thenReturn(of(lineItem.quantity.value * 3));
    when(checkoutFacade.basketItemTotal$).thenReturn(of(BasketMockData.getTotals().itemTotal));
    when(checkoutFacade.basketLineItems$).thenReturn(of([lineItem, lineItem, lineItem]));
    when(checkoutFacade.basketError$).thenReturn(EMPTY);
    when(checkoutFacade.basketChange$).thenReturn(EMPTY);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should not render product rows if collapsed', () => {
    fixture.detectChanges();
    expect(element.getElementsByClassName('product-row')).toHaveLength(0);
  });

  it('should render product rows if expanded', () => {
    component.open();
    fixture.detectChanges();
    expect(element.getElementsByClassName('product-row')).toHaveLength(3);
  });

  it('should display summary when collapsed', () => {
    fixture.detectChanges();
    expect(element.textContent.replace(/ /g, '')).toMatchInlineSnapshot(`"30items/$141,796.98"`);
  });

  it('should display right amounts, lineItems and totals when expanded', () => {
    component.open();
    fixture.detectChanges();
    expect(element.textContent.replace(/ /g, '')).toMatchInlineSnapshot(
      `"30items/$141,796.98$3.00x10$3.00x10$3.00x10VIEWCART"`
    );
  });

  it('should render product image component on expanded component', () => {
    component.open();
    fixture.detectChanges();
    expect(element.getElementsByTagName('sn-product-image')).toHaveLength(3);
  });

  it('should set isCollapsed to proper value if toggleCollapsed is called', () => {
    component.isCollapsed = true;
    component.toggleCollapse();
    expect(component.isCollapsed).toBeFalsy();
    component.toggleCollapse();
    expect(component.isCollapsed).toBeTruthy();
  });

  it('should set isCollapsed to true if collapse() is called', () => {
    component.collapse();
    expect(component.isCollapsed).toBeTruthy();
  });

  it('should set isCollapsed to false if open() is called', () => {
    component.open();
    expect(component.isCollapsed).toBeFalsy();
  });
});
