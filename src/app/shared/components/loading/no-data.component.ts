import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  template: `
    <div class="card mt-1" *ngIf="!loading && !entities.length">
      <div class="card-header text-center text-muted">
        <h4><i class="fa fa-search mr-2 fa-lg"></i>{{getMessage()}}</h4>
      </div>
    </div>
  `,
})
export class NoDataComponent {
  @Input()
  loading: boolean;

  @Input()
  entities: any[];

  @Input()
  search: string = null;

  getMessage() {
    return this.search ? `O termo "${this.search}" não retornou resultado... :(` : 'Não encontramos nada por aqui... :(';
  }
}
