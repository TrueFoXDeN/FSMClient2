import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherModule } from 'angular-feather';
import { ArrowDownRight, ArrowUpRight, Repeat } from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  ArrowDownRight,
  ArrowUpRight,
  Repeat
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