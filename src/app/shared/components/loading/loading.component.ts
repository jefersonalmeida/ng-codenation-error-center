import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="card mt-1" *ngIf="loading">
      <div class="card-header text-center text-muted">
        <h4><i class="fa fa-cog fa-spin mr-2 fa-lg"></i>Carregando...</h4>
      </div>
    </div>
  `,
})
export class LoadingComponent {
  @Input()
  loading: boolean;
}
