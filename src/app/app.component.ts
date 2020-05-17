import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { filter, map, mergeMap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import * as fromApp from './store';

declare let gtag: Function;

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  eventNavigationEnd: NavigationEnd;
  private title = '';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private notification: ToastrService,
              private titleService: Title,
              private metaService: Meta,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(fromApp.SetInitialUser());
    this.metaService.updateTag({name: 'author', content: 'me@jeferson.net.br'});

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => this.eventNavigationEnd = event),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      map(route => {
        if (route.parent
          && route.parent.data
          && route.parent.data['value']
          && route.parent.data['value'].title) {
          this.title = `${route.parent.data['value'].title}`;
        } else {
          this.title = '';
        }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data),
    ).subscribe((event) => {
      this.title = `${event['title']} ${this.title ? '|' : ''} ${this.title} | Admin`;
      this.titleService.setTitle(this.title);
      this.metaService.updateTag({name: 'description', content: 'Gestão sobre as movimentações junto ao Gestor Food'});
      this.metaService.updateTag({name: 'keywords', content: 'Food,Gestor Tech,Angular,Dashboard,Typescript'});

      if (environment.services.google.analytics.enabled) {
        gtag('config', environment.services.google.analytics.key, {
          page_title: this.titleService.getTitle(),
          page_path: this.eventNavigationEnd.urlAfterRedirects,
        });
      }
    });
  }
}
