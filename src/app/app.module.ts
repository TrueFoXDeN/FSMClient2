import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {HorizontalScrollComponent} from './main-container/horizontal-scroll.component';
import {ColumnComponent} from './column/column.component';
import {FlightstripComponent} from './flightstrip-container/flightstrip/flightstrip.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatGridListModule} from '@angular/material/grid-list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SidebarButtonComponent} from './sidebar/sidebar-button/sidebar-button.component';
import {IconsModule} from './icons/icons.module';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ColumnButtonsComponent} from './column/column-button/column-button.component';
import {BlurOnDirective} from "./directives/general-directives/blur-on.directive";
import {FormsModule} from "@angular/forms";
import {MaxHeightDirective} from "./directives/general-directives/max-height.directive";
import {BodyBackground} from "./directives/general-directives/bodyBackground.directive";
import {FlightStripContainer} from "./directives/flightstrip-directives/flightStripContainer.directive";
import {CustomStyles} from "./customStyles";
import {FlightStripInput} from "./directives/flightstrip-directives/flightStripInput.directive";
import {SidebarWidth} from "./directives/general-directives/sidebarWidth.directive";
import {ColumnWidth} from "./directives/column-directives/columnWidth.directive";
import {ColumnHeaderHeight} from "./directives/column-directives/columnHeaderHeight.directive";
import {ColumnHeaderFont} from "./directives/column-directives/columnHeaderFont.directive";
import {FlightStripCallsign} from "./directives/flightstrip-directives/flightStripCallsign.directive";
import {FlightStripAirline} from "./directives/flightstrip-directives/flightStripAirline.directive";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FlightstripContainerComponent} from './flightstrip-container/flightstrip-container.component';
import {FlightstripCompactComponent} from './flightstrip-container/flightstrip-compact/flightstrip-compact.component';
import {ColumnBuilderComponent} from './overlays/column-builder/column-builder.component';
import {DialogModule} from '@angular/cdk/dialog';
import {Data} from "./data";
import {GridsterModule} from "angular-gridster2";
import {
  ColumnBuilderButtonComponent
} from "./overlays/column-builder/column-builder-button/column-builder-button.component";
import {Util} from "./util";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {Sidebar} from "./directives/sidebar-directives/sidebar.directive";
import {SidebarButton} from "./directives/sidebar-directives/sidebarButton.directive";
import {MainContainer} from "./directives/general-directives/mainContainer.directive";
import {ColumnColor} from "./directives/column-directives/columnColor.directive";
import {ColumnButtonColor} from "./directives/column-directives/columnButtonColor.directive";
import {AppInput} from "./directives/general-directives/appInput.directive";

@NgModule({
  declarations: [
    AppComponent,
    HorizontalScrollComponent,
    ColumnComponent,
    FlightstripComponent,
    SidebarButtonComponent,
    SidebarComponent,
    ColumnButtonsComponent,
    BlurOnDirective,
    MaxHeightDirective,
    BodyBackground,
    FlightStripContainer,
    FlightStripInput,
    SidebarWidth,
    ColumnWidth,
    ColumnHeaderHeight,
    ColumnHeaderFont,
    FlightStripCallsign,
    FlightStripAirline,
    FlightstripContainerComponent,
    FlightstripCompactComponent,
    ColumnBuilderComponent,
    ColumnBuilderButtonComponent,
    Sidebar,
    SidebarButton,
    MainContainer,
    ColumnColor,
    ColumnButtonColor,
    AppInput
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    DragDropModule,
    MatGridListModule,
    ScrollingModule,
    MatSidenavModule,
    IconsModule,
    FormsModule,
    MatTooltipModule,
    MatSnackBarModule,
    DialogModule,
    GridsterModule,
    MatDialogModule

  ],
  providers: [
    CustomStyles,
    Data,
    Util,
    Util,
    {provide: MatDialogRef, useValue:{}}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
