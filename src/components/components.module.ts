import { NgModule } from '@angular/core';
import { GpsLocationComponent } from './gps-location/gps-location';
import { DateTimeComponent } from './date-time/date-time';
import { AccelerometerComponent } from './accelerometer/accelerometer';

@NgModule({
	declarations: [
    GpsLocationComponent,
    AccelerometerComponent,
    DateTimeComponent],
	imports: [],
	exports: [
    GpsLocationComponent,
    AccelerometerComponent,
    DateTimeComponent]
})
export class ComponentsModule {}
