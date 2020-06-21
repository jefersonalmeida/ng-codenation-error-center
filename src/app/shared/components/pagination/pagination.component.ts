import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { Search } from '../../interfaces/search.interface';

@Component({
  selector: 'app-pagination',
  template: `
    <nav>
      <ul *ngIf="pagination?.totalPages > 1" class="pagination m-0">
        <!--<li [ngClass]="{disabled:pagination?.page === 1}"><a (click)="setPage(1)">Primeira</a></li>-->
        <li [ngClass]="{disabled:pagination?.number === 1}" class="page-item"><a
          (click)="setPage(pagination?.number - 1)"
          aria-hidden="true"
          aria-label="Anterior"
          class="page-link">&laquo;</a></li>
        <li *ngFor="let page of getPages()" [ngClass]="{active:pagination?.number === page}" class="page-item"><a
          (click)="setPage(page)" class="page-link">{{page}}</a></li>
        <li [ngClass]="{disabled:pagination?.number === pagination?.totalPages}" class="page-item"><a
          (click)="setPage(pagination?.number + 1)"
          aria-hidden="true"
          aria-label="Próxima"
          class="page-link">&raquo;</a>
        </li>
        <!--<li [ngClass]="{disabled:pagination?.page === pagination?.total_pages}"><a (click)="setPage(pagination?.total_pages)">Última</a></li>-->
      </ul>
    </nav>
  `,
})
export class PaginationComponent implements OnInit {

  @Input()
  pagination: Search;

  @Output()
  changePage: EventEmitter<number> = new EventEmitter<number>();

  startPage: number;
  endPage: number;
  pages: number | any;

  constructor() {
  }

  setPage(page: number) {
    if (page < 1 || page > this.endPage) {
      return;
    }
    this.pagination.number = page;
    this.getPager();
    this.changePage.emit(page);
  }

  ngOnInit() {
  }

  getPager() {
    if (this.pagination.totalPages <= 10) {
      // less than 10 totalValue pages so show all
      this.startPage = 1;
      this.endPage = this.pagination.totalPages;
    } else {
      // more than 10 totalValue pages so calculate start and end pages
      if (this.pagination.number <= 6) {
        this.startPage = 1;
        this.endPage = 10;
      } else if (this.pagination.number + 4 >= this.pagination.totalPages) {
        this.startPage = this.pagination.totalPages - 9;
        this.endPage = this.pagination.totalPages;
      } else {
        this.startPage = this.pagination.number - 5;
        this.endPage = this.pagination.number + 4;
      }
    }
    // create an array of pages to ng-repeat in the pager control
    this.pages = _.range(this.startPage, this.endPage + 1);
  }

  getPages() {
    this.getPager();
    return this.pages;
  }
}
