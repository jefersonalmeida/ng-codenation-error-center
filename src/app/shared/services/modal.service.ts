import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalOptions } from 'ngx-bootstrap/modal/modal-options.class';

@Injectable()
export class ModalService {
  constructor(private bsModalService: BsModalService) {

  }

  open(template, config: ModalOptions) {
    const setup = {
      class: `modal-md modal-dialog-centered`,
      keyboard: false,
      ignoreBackdropClick: true,
      ...config,
    };

    return this.bsModalService.show(
      template,
      Object.assign({}, setup),
    );
  }
}
