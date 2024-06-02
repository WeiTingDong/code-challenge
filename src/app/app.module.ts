import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { AppComponent } from './app.component';
import { DetailPanelComponent } from './components/detail-panel/detail-panel.component';
import { OverviewPanelComponent } from './components/overview-panel/overview-panel.component';

import { CloseBtnComponent } from './components/close-btn/close-btn.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EnergyChartComponent } from './components/energy-chart/energy-chart.component';
import { MinimapComponent } from './components/mini-map/mini-map.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

import { BellIconComponent } from './icons/bell-icon/bell-icon.component';
import { GearIconComponent } from './icons/gear-icon/gear-icon.component';
import { GridIconComponent } from './icons/grid-icon/grid-icon.component';
import { HashIconComponent } from './icons/hash-icon/hash-icon.component';
import { SearchIconComponent } from './icons/search-icon/search-icon.component';
import { UserIconComponent } from './icons/user-icon/user-icon.component';

import { ParseLocationPipe } from './pipes/location.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DetailPanelComponent,
    OverviewPanelComponent,
    SearchBarComponent,
    EnergyChartComponent,
    MinimapComponent,
    DashboardComponent,
    CloseBtnComponent,
    BellIconComponent,
    GearIconComponent,
    GridIconComponent,
    HashIconComponent,
    SearchIconComponent,
    UserIconComponent,
    ParseLocationPipe,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
