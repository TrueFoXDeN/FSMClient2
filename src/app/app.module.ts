import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { HorizontalScrollComponent } from './main-container/horizontal-scroll.component';
import { ColumnComponent } from './column/column.component';
import { FlightstripComponent } from './flightstrip/flightstrip.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarButtonComponent } from './sidebar/sidebar-button/sidebar-button.component';
import { IconsModule } from './icons/icons.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ColumnButtonsComponent } from './column/column-button/column-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HorizontalScrollComponent,
    ColumnComponent,
    FlightstripComponent,
    SidebarButtonComponent,
    SidebarComponent,
    ColumnButtonsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    DragDropModule,
    MatGridListModule,
    ScrollingModule,
    MatSidenavModule,
    IconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
