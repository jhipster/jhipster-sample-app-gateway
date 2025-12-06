import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router, TitleStrategy } from '@angular/router';

import { of } from 'rxjs';

import { AppPageTitleStrategy } from 'app/app-page-title-strategy';
import { AccountService } from 'app/core/auth/account.service';

import Main from './main';

describe('Main', () => {
  let comp: Main;
  let fixture: ComponentFixture<Main>;
  let titleService: Title;
  const routerState: any = { snapshot: { root: { data: {} } } };
  let router: Router;
  let document: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        Title,
        {
          provide: AccountService,
          useValue: {
            identity: jest.fn(() => of(null)),
          },
        },
        { provide: TitleStrategy, useClass: AppPageTitleStrategy },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Main);
    comp = fixture.componentInstance;
    titleService = TestBed.inject(Title);
    router = TestBed.inject(Router);
    document = TestBed.inject(DOCUMENT);
  });

  describe('page title', () => {
    const defaultPageTitle = 'Jhipster Sample Gateway';
    const parentRoutePageTitle = 'parentTitle';
    const childRoutePageTitle = 'childTitle';

    beforeEach(() => {
      routerState.snapshot.root = { data: {} };
      jest.spyOn(titleService, 'setTitle');
      comp.ngOnInit();
    });

    describe('navigation end', () => {
      it('should set page title to default title if pageTitle is missing on routes', async () => {
        // WHEN
        await router.navigateByUrl('');

        // THEN
        expect(document.title).toBe(defaultPageTitle);
      });

      it('should set page title to root route pageTitle if there is no child routes', async () => {
        // GIVEN
        router.resetConfig([{ path: '', title: parentRoutePageTitle, component: Blank }]);

        // WHEN
        await router.navigateByUrl('');

        // THEN
        expect(document.title).toBe(parentRoutePageTitle);
      });

      it('should set page title to child route pageTitle if child routes exist and pageTitle is set for child route', async () => {
        // GIVEN
        router.resetConfig([
          {
            path: 'home',
            title: parentRoutePageTitle,
            children: [{ path: '', title: childRoutePageTitle, component: Blank }],
          },
        ]);

        // WHEN
        await router.navigateByUrl('home');

        // THEN
        expect(document.title).toBe(childRoutePageTitle);
      });

      it('should set page title to parent route pageTitle if child routes exists but pageTitle is not set for child route data', async () => {
        // GIVEN
        router.resetConfig([
          {
            path: 'home',
            title: parentRoutePageTitle,
            children: [{ path: '', component: Blank }],
          },
        ]);

        // WHEN
        await router.navigateByUrl('home');

        // THEN
        expect(document.title).toBe(parentRoutePageTitle);
      });
    });
  });
});

@Component({
  template: '',
})
export class Blank {}
