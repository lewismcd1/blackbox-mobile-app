import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ResultsPage } from '../pages/results/results';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation} from '@ionic-native/background-geolocation';
import { DeviceMotion } from '@ionic-native/device-motion';

import { GpsLocationComponent } from '../components/gps-location/gps-location';
import { DateTimeComponent } from '../components/date-time/date-time';
import { AccelerometerComponent } from '../components/accelerometer/accelerometer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResultsPage,
    GpsLocationComponent,
    DateTimeComponent,
    AccelerometerComponent,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ResultsPage,//did you change this, no
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundGeolocation,
    Geolocation,
    DeviceMotion,
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
