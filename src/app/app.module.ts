import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HttpClient,
} from '@angular/common/http';

import {
  TranslateModule,
  TranslateLoader,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { DetailPanelComponent } from './components/detail-panel/detail-panel.component';
import { OverviewPanelComponent } from './components/overview-panel/overview-panel.component';

import { AssetInfoComponent } from './components/detail-panel/asset-info/asset-info.component';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { CloseBtnComponent } from './components/close-btn/close-btn.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EnergyChartComponent } from './components/energy-chart/energy-chart.component';
import { MinimapComponent } from './components/mini-map/mini-map.component';
import { PerformanceInfoComponent } from './components/detail-panel/performance-info/performance-info.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

import { BellIconComponent } from './icons/bell-icon/bell-icon.component';
import { GearIconComponent } from './icons/gear-icon/gear-icon.component';
import { GridIconComponent } from './icons/grid-icon/grid-icon.component';
import { HashIconComponent } from './icons/hash-icon/hash-icon.component';
import { SearchIconComponent } from './icons/search-icon/search-icon.component';
import { UserIconComponent } from './icons/user-icon/user-icon.component';

import { ParseDatePipe } from './pipes/parseDate.pipe';
import { ParseLastDatePipe } from './pipes/lastDate.pipe';
import { ParseLocationPipe } from './pipes/location.pipe';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DetailPanelComponent,
    OverviewPanelComponent,
    AssetInfoComponent,
    AutoCompleteComponent,
    CloseBtnComponent,
    DashboardComponent,
    EnergyChartComponent,
    MinimapComponent,
    PerformanceInfoComponent,
    SearchBarComponent,
    BellIconComponent,
    GearIconComponent,
    GridIconComponent,
    HashIconComponent,
    SearchIconComponent,
    UserIconComponent,
    ParseDatePipe,
    ParseLastDatePipe,
    ParseLocationPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
