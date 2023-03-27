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
import {BodyBackground} from "./directives/general-directives/bodyBackground.directive";
import {FlightStripContainer} from "./flightstrip-container/flightstrip-directives/flightStrip.directive";
import {CustomStyles} from "./customStyles";
import {FlightStripInput} from "./flightstrip-container/flightstrip-directives/flightStripInput.directive";
import {ColumnWidth} from "./column/column-directives/columnWidth.directive";
import {ColumnHeaderHeight} from "./column/column-directives/columnHeaderHeight.directive";
import {ColumnHeaderFont} from "./column/column-directives/columnHeaderFont.directive";
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
import {Sidebar} from "./sidebar/sidebar-directives/sidebar.directive";
import {SidebarButton} from "./sidebar/sidebar-directives/sidebarButton.directive";
import {MainContainer} from "./directives/general-directives/mainContainer.directive";
import {ColumnColor} from "./column/column-directives/columnColor.directive";
import {ColumnButtonColor} from "./column/column-directives/columnButtonColor.directive";
import {FlightStripCompact} from "./flightstrip-container/flightstrip-directives/flightStripCompact.directive";
import {FlightstripIcon} from "./flightstrip-container/flightstrip-directives/flightstripIcon.directive";
import {
  FlightstripButtonComponent
} from "./flightstrip-container/flightstrip/flightstrip-button/flightstrip-button.component";
import {ColumnBuilderInputDirective} from "./overlays/column-builder/columnBuilder.directive";
import { SettingsComponent } from './overlays/settings/settings.component';
import { ThemeBuilderComponent } from './overlays/theme-builder/theme-builder.component';
import {SidebarButtonPngComponent} from "./sidebar/sidebar-button-png/sidebar-button-png.component";
import {CdkMenuModule} from '@angular/cdk/menu';
import { ContextMenuComponent } from './flightstrip-container/context-menu/context-menu.component';
import {FsContextMenuDirective} from "./flightstrip-container/context-menu/fsContextMenu.directive";
import {FsContextMenuItemDirective} from "./flightstrip-container/context-menu/fsContextMenuItem.directive";
import { FlightstripCompactBorderDirective } from './flightstrip-container/flightstrip-directives/flightstrip-compact-border.directive';
import { HttpClientModule } from '@angular/common/http';
import {ColumnBuilderFooterDirective} from "./overlays/column-builder/columnBuilderFooter.directive";
import { NetworkMenuComponent } from './overlays/network-menu/network-menu.component';
import {NetworkMenuDirective} from "./overlays/network-menu/networkMenu.directive";
import {MatMenuModule} from '@angular/material/menu';
import {NetworkMenuButtonDirective} from "./overlays/network-menu/networkMenuButton.directive";
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
    BodyBackground,
    FlightStripContainer,
    FlightStripInput,
    ColumnWidth,
    ColumnHeaderHeight,
    ColumnHeaderFont,
    FlightstripContainerComponent,
    FlightstripCompactComponent,
    ColumnBuilderComponent,
    ColumnBuilderButtonComponent,
    Sidebar,
    SidebarButton,
    MainContainer,
    ColumnColor,
    ColumnButtonColor,
    FlightstripIcon,
    FlightstripButtonComponent,
    FlightStripCompact,
    ColumnBuilderInputDirective,
    SettingsComponent,
    ThemeBuilderComponent,
    SidebarButtonPngComponent,
    ContextMenuComponent,
    FsContextMenuDirective,
    FsContextMenuItemDirective,
    FlightstripCompactBorderDirective,
    ColumnBuilderFooterDirective,
    NetworkMenuComponent,
    NetworkMenuDirective,
    NetworkMenuButtonDirective
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
    MatDialogModule,
    CdkMenuModule,
    HttpClientModule,
    MatMenuModule
  ],
  providers: [
    CustomStyles,
    Data,
    Util,
    {provide: MatDialogRef, useValue:{}}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
