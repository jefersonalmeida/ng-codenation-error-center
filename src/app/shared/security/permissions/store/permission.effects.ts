import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { PermissionService } from '../permission.service';
import { PermissionState } from './index';
import * as featureActions from './permission.actions';
import { selectEntities } from './permission.selector';

@Injectable({
  providedIn: 'root',
})
export class PermissionEffects {

  loadingEntities$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.LoadEntities, featureActions.LoadEntitiesFilter),
    mergeMap(action => this.service.index(action.query).pipe(
      map(result => featureActions.LoadEntitiesSuccess({
        entities: result.data,
        query: {
          ...action.query,
          ...result.meta.pagination,
        },
      })),
    )),
  ));

  loadingEntity$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.LoadEntity),
    withLatestFrom(this.store.pipe(select(selectEntities))),
    mergeMap(([action, entities]) => {
      const entity = entities.length ? entities.find(r => r.id === action.id) : null;
      return entity
        ? of(featureActions.LoadEntitySuccess({entity}))
        : this.service.find(action.id).pipe(
          mergeMap(res => of(featureActions.LoadEntitySuccess({entity: res}))),
        );
    }),
  ));

  createEntity$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.CreateEntity),
    mergeMap(action => this.service.store(action.entity).pipe(
      map(entity => featureActions.CreateEntitySuccess({entity})),
    )),
  ));

  updateEntity$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.UpdateEntity),
    mergeMap(action => this.service.update(action.entity).pipe(
      map(entity => featureActions.UpdateEntitySuccess({entity})),
    )),
  ));

  deleteEntity$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.DeleteEntity),
    mergeMap(action => this.service.delete(action.entity).pipe(
      map(_ => featureActions.DeleteEntitySuccess({id: action.entity.id})),
    )),
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly service: PermissionService,
    private readonly store: Store<PermissionState>,
  ) {
  }
}
