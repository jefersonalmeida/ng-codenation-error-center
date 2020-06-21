import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-utc-datepicker',
  template: `
    <input type="text"
           class="form-control"
           bsDatepicker
           [placeholder]="placeholder"
           [bsValue]="value"
           [bsConfig]="bsConfig"
           (bsValueChange)="bsValueChange($event)">
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UtcDatepickerComponent),
    multi: true,
  }],
})
export class UtcDatepickerComponent implements OnInit, ControlValueAccessor {
  value: any;
  onChange: (value: any) => void;
  bsConfig: Partial<BsDatepickerConfig>;
  @Input() placeholder: string;

  constructor(private localeService: BsLocaleService) {
    localeService.use('pt-br');
  }

  ngOnInit() {
    this.bsConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'DD/MM/YYYY HH:mm:ss',
    });
  }

  bsValueChange(val) {
    setTimeout(() => {
      this.value = val;
      if (val instanceof Date) {
        // this.onChange(new Date(val.getTime() - val.getTimezoneOffset() * 60 * 1000));
        this.onChange(new Date(val.getTime()).toJSON());
      } else {
        this.onChange(val);
      }
    });
  }

  writeValue(val: any): void {
    if (val) {
      if (val instanceof Date) {
        // this.value = new Date(val.getTime() + val.getTimezoneOffset() * 60 * 1000);
        this.value = new Date(val.getTime());
      } else {
        this.value = val;
      }
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }
}
