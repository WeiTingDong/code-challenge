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
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { EnergyChartComponent } from './components/energy-chart/energy-chart.component';
import { MinimapComponent } from './components/mini-map/mini-map.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CloseBtnComponent } from './components/close-btn/close-btn.component';

import { ParseLocationPipe } from './pipes/location.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DetailPanelComponent,
    SearchBarComponent,
    OverviewPanelComponent,
    EnergyChartComponent,
    MinimapComponent,
    DashboardComponent,
    CloseBtnComponent,
    ParseLocationPipe,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
