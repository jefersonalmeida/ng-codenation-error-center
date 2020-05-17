import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrandButtonsComponent } from './brand-buttons.component';
// Buttons Routing
import { ButtonsRoutingModule } from './buttons-routing.module';

import { ButtonsComponent } from './buttons.component';
import { DropdownsComponent } from './dropdowns.component';

// Angular

@NgModule({
  imports: [
    CommonModule,
    ButtonsRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule
  ],
  declarations: [
    ButtonsComponent,
    DropdownsComponent,
    BrandButtonsComponent
  ]
})
export class ButtonsModule { }
