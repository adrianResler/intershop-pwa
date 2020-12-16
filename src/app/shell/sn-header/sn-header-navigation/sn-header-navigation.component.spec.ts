import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';

import { ShoppingFacade } from 'ish-core/facades/shopping.facade';
import { NavigationCategory } from 'ish-core/models/navigation-category/navigation-category.model';
import { SubCategoryNavigationComponent } from 'ish-shell/header/sub-category-navigation/sub-category-navigation.component';

import { SnHeaderNavigationComponent } from './sn-header-navigation.component';

describe.skip('Sn Header Navigation Component', () => {
  let component: SnHeaderNavigationComponent;
  let fixture: ComponentFixture<SnHeaderNavigationComponent>;
  let element: HTMLElement;
  let shoppingFacade: ShoppingFacade;

  beforeEach(async () => {
    shoppingFacade = mock(ShoppingFacade);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        MockComponent(FaIconComponent),
        MockComponent(SubCategoryNavigationComponent),
        SnHeaderNavigationComponent,
      ],
      providers: [{ provide: ShoppingFacade, useFactory: () => instance(shoppingFacade) }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnHeaderNavigationComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    const categories = [
      { uniqueId: 'A', name: 'CAT_A', url: '/cat/A', hasChildren: true },
      { uniqueId: 'B', name: 'CAT_B', url: '/cat/B' },
      { uniqueId: 'C', name: 'CAT_C', url: '/cat/C' },
    ] as NavigationCategory[];
    when(shoppingFacade.navigationCategories$()).thenReturn(of(categories));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
    expect(element).toMatchInlineSnapshot(`
      <ul class="navbar-nav main-navigation-list">
        <li class="dropdown">
          <a ng-reflect-router-link="/cat/A" data-testing-id="A-link" href="/cat/A"> CAT_A </a
          ><a class="dropdown-toggle"><fa-icon ng-reflect-icon="fas,plus"></fa-icon></a
          ><sn-sub-category-navigation
            ng-reflect-view="auto"
            ng-reflect-category-unique-id="A"
            ng-reflect-sub-categories-depth="1"
          ></sn-sub-category-navigation>
        </li>
        <li class="dropdown">
          <a style="width: 100%" ng-reflect-router-link="/cat/B" data-testing-id="B-link" href="/cat/B">
            CAT_B
          </a>
        </li>
        <li class="dropdown">
          <a style="width: 100%" ng-reflect-router-link="/cat/C" data-testing-id="C-link" href="/cat/C">
            CAT_C
          </a>
        </li>
      </ul>
    `);
  });
});
