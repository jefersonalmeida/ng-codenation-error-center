import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { LogService } from '../log.service';
import { LogState } from './index';
import * as featureActions from './log.actions';
import { LogViewModalComponent } from '../components/modal/log-view-modal.component';
import { selectEntity, selectQuery } from './log.selector';
import { ModalService } from '../../../shared/services/modal.service';
import { AnalyticsService } from '../../../shared/services/analytics.service';

@Injectable({
  providedIn: 'root',
})
export class LogEffects {

  loadingEntities$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.LoadEntities, featureActions.LoadEntitiesFilter),
    mergeMap(action => this.service.index(action.query).pipe(
      map(result => featureActions.LoadEntitiesSuccess({ result })),
    )),
  ));

  loadingEntity$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.LoadEntity),
    mergeMap(action => this.service.find(action.id).pipe(
      map(result => featureActions.LoadEntitySuccess({ result }))),
    ),
  ));

  loadingEntitySuccess$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.LoadEntitySuccess),
    tap(_ => AnalyticsService.eventEmitter('view_log', 'engagement', 'View Log', 1)),
    withLatestFrom(this.store.pipe(select(selectEntity))),
    tap(([action, entity]) => {
      this.modalService.open(LogViewModalComponent, {
        initialState: {
          entity: action.result.data,
          title: `Visualizar Log [${entity.description}]`,
        },
        class: `modal-lg modal-dialog-centered`,
      });
    }),
  ), { dispatch: false });

  createEntity$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.CreateEntity),
    withLatestFrom(this.store.pipe(select(selectQuery))),
    tap(_ => AnalyticsService.eventEmitter('register_log', 'engagement', 'Register Log', 1)),
    mergeMap(([action, query]) => this.service.store(action.entity).pipe(
      map(result => {
        return featureActions.LoadEntitiesFilter({ query: query });
      }),
    )),
  ));

  updateEntity$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.UpdateEntity),
    mergeMap(action => this.service.update(action.entity).pipe(
      map(result => featureActions.UpdateEntitySuccess({ result })),
    )),
  ));

  deleteEntity$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.DeleteEntity),
    mergeMap(action => this.service.delete(action.entity).pipe(
      map(_ => featureActions.DeleteEntitySuccess({ id: action.entity.id })),
    )),
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly service: LogService,
    private readonly modalService: ModalService,
    private readonly store: Store<LogState>,
  ) {
  }
}
