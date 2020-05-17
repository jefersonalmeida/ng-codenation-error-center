import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { RoleService } from '../role.service';
import { RoleState } from './index';
import * as featureActions from './role.actions';
import { selectEntities } from './role.selector';

@Injectable({
  providedIn: 'root',
})
export class RoleEffects {

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
    mergeMap(([action, roles]) => {
      const role = roles.length ? roles.find(r => r.id === action.id) : null;
      return role
        ? of(featureActions.LoadEntitySuccess({entity: role}))
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
    private readonly service: RoleService,
    private readonly store: Store<RoleState>,
  ) {
  }
}
