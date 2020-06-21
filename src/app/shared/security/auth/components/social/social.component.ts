import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../../store';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'social.component.html',
})
export class SocialComponent {
  public token: string = null;

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<fromApp.AppState>,
              private notification: ToastrService) {

    this.token = this.activatedRoute.snapshot.params.token;

    if (this.token) {
      this.store.dispatch(fromApp.LoginSocialToken({ payload: this.token }));
    } else {
      this.notification.warning('Não encontramos sua conta em nosso sistema');
      this.store.dispatch(fromApp.LoginSocialFailure());
    }
  }
}
