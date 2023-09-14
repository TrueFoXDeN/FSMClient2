import {NgModule, isDevMode} from '@angular/core';
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
import {FormsModule} from "@angular/forms";
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
import {GridsterModule} from "angular-gridster2";
import {
  ColumnBuilderButtonComponent
} from "./overlays/column-builder/column-builder-button/column-builder-button.component";
import {Util} from "./util";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FlightStripCompact} from "./flightstrip-container/flightstrip-directives/flightStripCompact.directive";
import {
  FlightstripButtonComponent
} from "./flightstrip-container/flightstrip/flightstrip-button/flightstrip-button.component";
import {SettingsComponent} from './overlays/settings/settings.component';
import {SidebarButtonPngComponent} from "./sidebar/sidebar-button-png/sidebar-button-png.component";
import {CdkMenuModule} from '@angular/cdk/menu';
import {ContextMenuComponent} from './flightstrip-container/context-menu/context-menu.component';
import {FsContextMenuDirective} from "./flightstrip-container/context-menu/fsContextMenu.directive";
import {FsContextMenuItemDirective} from "./flightstrip-container/context-menu/fsContextMenuItem.directive";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NetworkMenuComponent} from './overlays/network-menu/network-menu.component';
import {NetworkMenuDirective} from "./overlays/network-menu/networkMenu.directive";
import {MatMenuModule} from '@angular/material/menu';
import {NetworkMenuButtonDirective} from "./overlays/network-menu/networkMenuButton.directive";
import { ProfileSettingsComponent } from './overlays/profile-settings/profile-settings.component';
import {ProfileSettingsDirective} from "./overlays/profile-settings/profileSettings.directive";
import {MatSelectModule} from '@angular/material/select';
import {NgSelectModule} from "@ng-select/ng-select";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {ProfileSettingsInputDirective} from "./overlays/profile-settings/profileSettingsInput.directive";
import {
  ProfileSettingsInputContainerDirective
} from "./overlays/profile-settings/profileSettingsInputContainer.directive";
import {
  ProfileSettingsSaveButtonComponent
} from "./overlays/profile-settings/profile-settings-save-button/profile-settings-save-button.component";
import {
  ProfileSettingsSaveButtonDirective
} from "./overlays/profile-settings/profile-settings-save-button/profileSettingsSaveButton.directive";
import {CookieService} from "ngx-cookie-service";
import { ProximitySettingsComponent } from './overlays/proximity-settings/proximity-settings.component';
import { MultiplayerSettingsComponent } from './overlays/multiplayer-settings/multiplayer-settings.component';
import { HelpOverlayComponent } from './overlays/help-overlay/help-overlay.component';
import { StatisticsOverlayComponent } from './overlays/statistics-overlay/statistics-overlay.component';
import { SearchCallsignComponent } from './overlays/search-callsign/search-callsign.component';
import {SearchCallsignDirective} from "./overlays/search-callsign/searchCallsign.directive";
import {SearchCallsignInputDirective} from "./overlays/search-callsign/searchCallsignInput.directive";
import {
  SearchCallsignButtonComponent
} from "./overlays/search-callsign/search-callsign-button/search-callsign-button.component";
import {HttpInterceptorService} from "./http-interceptor/http-interceptor.service";
import {MatTable, MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ProximityTableDirective} from "./overlays/proximity-settings/proximity-table.directive";
import {MatSlider, MatSliderModule} from "@angular/material/slider";
import { GeneralDropdownComponent } from './general-dropdown/general-dropdown.component';
import {GeneralDropdownItemDirective} from "./general-dropdown/general-dropdownItem.directive";
import {GeneralProfileDropdownDirective} from "./general-dropdown/general-profile-dropdown.directive";
import {GeneralDropdownInputDirective} from "./general-dropdown/general-dropdownInput.directive";
import {Sidebar} from "./sidebar/sidebar-directives/sidebar.directive";
import { DropdownModule } from 'primeng/dropdown';
import { ProximityButtonComponent } from './overlays/proximity-settings/proximity-button/proximity-button.component';
import { ProximityRowComponent } from './overlays/proximity-settings/proximity-row/proximity-row.component';
import {InputSwitchModule} from "primeng/inputswitch";
import {SliderModule} from "primeng/slider";
import { ProximityRowButtonComponent } from './overlays/proximity-settings/proximity-row/proximity-row-button/proximity-row-button.component';
import {ButtonModule} from "primeng/button";
import { CookieDialogComponent } from './overlays/cookie-dialog/cookie-dialog.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HorizontalScrollComponent,
    ColumnComponent,
    FlightstripComponent,
    SidebarButtonComponent,
    SidebarComponent,
    ColumnButtonsComponent,
    FlightStripInput,
    ColumnWidth,
    ColumnHeaderHeight,
    ColumnHeaderFont,
    FlightstripContainerComponent,
    FlightstripCompactComponent,
    ColumnBuilderComponent,
    ColumnBuilderButtonComponent,
    Sidebar,
    FlightstripButtonComponent,
    FlightStripCompact,
    SettingsComponent,
    SidebarButtonPngComponent,
    ContextMenuComponent,
    FsContextMenuDirective,
    FsContextMenuItemDirective,
    NetworkMenuComponent,
    NetworkMenuDirective,
    NetworkMenuButtonDirective,
    ProfileSettingsComponent,
    ProfileSettingsDirective,
    ProfileSettingsInputDirective,
    ProfileSettingsInputContainerDirective,
    ProfileSettingsSaveButtonComponent,
    ProfileSettingsSaveButtonDirective,
    MultiplayerSettingsComponent,
    HelpOverlayComponent,
    StatisticsOverlayComponent,
    SearchCallsignComponent,
    SearchCallsignDirective,
    SearchCallsignInputDirective,
    SearchCallsignButtonComponent,
    ProximitySettingsComponent,
    ProximityTableDirective,
    GeneralDropdownComponent,
    GeneralDropdownItemDirective,
    GeneralProfileDropdownDirective,
    GeneralDropdownInputDirective,
    ProximityButtonComponent,
    ProximityRowComponent,
    ProximityRowButtonComponent,
    CookieDialogComponent
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
    MatMenuModule,
    MatSelectModule,
    NgSelectModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatSliderModule,
    DropdownModule,
    InputSwitchModule,
    SliderModule,
    ButtonModule,
    ProgressSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    CustomStyles,
    Util,
    {
      provide: MatDialogRef,
      useValue: {},

    },
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    CookieService,

  ],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule {
}
