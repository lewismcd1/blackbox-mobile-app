import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultsPage } from './results';
import { GpsLocationComponent } from '../../components/gps-location/gps-location';
import { AccelerometerComponent } from '../../components/accelerometer/accelerometer';

@NgModule({
  declarations: [
    ResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultsPage),
    GpsLocationComponent,
    AccelerometerComponent,
  ],
})
export class ResultsPageModule {}
