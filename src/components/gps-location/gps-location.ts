import { Component } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { BackgroundGeolocation} from '@ionic-native/background-geolocation';
import { NgZone } from '@angular/core';

@Component({
  selector: 'gps-location',
  templateUrl: 'gps-location.html'
})
export class GpsLocationComponent {

  location: {latitude:number, longitude:number};
  public speed = 0;
  constructor(public geolocation:Geolocation, public backgroundGeolocation: BackgroundGeolocation, public zone: NgZone, public storage: Storage) {
    
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 3,
      distanceFilter: 5,
      debug: true,
      interval: 1000
    };
    this.backgroundGeolocation.configure(config).subscribe((location) => {
      this.zone.run(() => {
        this.location = {latitude: location.latitude, longitude: location.longitude};
        this.speed = location.speed; //metres per second
      });

    }, (err) => {
      console.log(err);

    });


    /*this.storage.get('location').then((loc) => {
      this.location = loc;
    });*/

    this.geolocation.watchPosition().subscribe((location) => {
      if(location.coords == undefined) return;
        //this.location = {latitude: location.coords.latitude, longitude: location.coords.longitude};
        //this.speed = {speed: location.coords.speed};
        console.log("THIS.LOCATION: "+location.coords.latitude);
        if(this.location != null)
          this.storage.set('location', location.coords.latitude).then(v => console.log("SET RESULT: "+v));
        this.zone.run(() => {
        this.location = {latitude: location.coords.latitude, longitude: location.coords.longitude};
      });
      
    });
  
  }

}
