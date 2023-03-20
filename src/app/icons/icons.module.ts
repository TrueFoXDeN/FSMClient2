import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { ArrowDownRight, ArrowUpRight, Repeat, Columns, ZoomIn, ZoomOut } from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  ArrowDownRight,
  ArrowUpRight,
  Repeat,
  Columns,
  ZoomIn,
  ZoomOut
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
