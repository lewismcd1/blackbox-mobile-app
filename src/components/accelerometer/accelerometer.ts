import { Component, NgZone } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Storage } from '@ionic/storage';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

@Component({
  selector: 'device-motion',
  templateUrl: 'accelerometer.html'
})
export class AccelerometerComponent {
  acceleration: DeviceMotionAccelerationData;
  public timestamp;
  public x;
  location: { latitude: number, longitude: number };
  public subscription;

  accelerateHashly: boolean = false;
  spike: boolean = false;
  cornering: boolean = false;
  constructor(private deviceMotion: DeviceMotion, private zone: NgZone, private storage: Storage, public geolocation: Geolocation) {
    this.timestamp = "-";
    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) =>
        this.x = 0,
      (error: any) => console.log(error)
    );
    this.geolocation.watchPosition().subscribe((location) => {
      if (location.coords == undefined) return;
      this.location = { latitude: location.coords.latitude, longitude: location.coords.longitude };
    });

    let options = {
      frequency: 1000,
    }

    var NValues = [], lastDiffX = 0, lastDiffY = 0;
    this.subscription = this.deviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => {
      storage.get('IsTracking').then(ist => {
        if(ist != '+'){ //checking if program is running
          NValues = [], lastDiffX = 0, lastDiffY = 0; //reset
          return;
        }
      this.acceleration = acceleration;
      this.timestamp = acceleration.timestamp;
      
      var spikedb = (coord, locc) => {
        storage.get('Spike' + coord).then(arr => {
          arr = arr == null ? [] : JSON.parse(arr); //if null create array or parse last results
          var date = new Date(this.timestamp); //converting to human date H:i:s format
          var loc = {location:locc,timestamp:date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()};
          arr.push(loc);
          storage.set('Spike' + coord, JSON.stringify(arr)); //storing the updated results
        });
      };

      NValues.push(acceleration);
      if (NValues.length >= 30) { 
        var sum = [0, 0, 0];
        var short_sum = [0, 0, 0];
        var short_count = 0;
        for (var i = 0; i < NValues.length; i++) {
          sum[0] += NValues[i].x;
          sum[1] += NValues[i].y;
          sum[2] += NValues[i].z;
          if (this.timestamp - NValues[i].timestamp < 5) {
            short_sum[0] += NValues[i].x;
            short_sum[1] += NValues[i].y;
            short_sum[2] += NValues[i].z;
            short_count++;
          }
        }
        var drivingX = (sum[0] / NValues.length) - (short_sum[0] / short_count); //LongX - ShortX
        var drivingY = (sum[1] / NValues.length) - (short_sum[1] / short_count);
        var drivingZ = (sum[2] / NValues.length) - (short_sum[2] / short_count);
        if (lastDiffX > 0) {
          var track = Math.abs(drivingX) - lastDiffX;
          if (track > 5) {
            spikedb('X', this.location); //saves location for X coordinate in results
            console.log("X Accelerating: " + track);
            console.log("location: " + this.location.latitude, this.location.longitude);
          } else if (track < -5) {
            spikedb('X', this.location);
            console.log("X Decelerating: " + track);
            console.log("location: " + this.location.latitude);
          }
        }
        lastDiffX = Math.abs(drivingX);
        if (lastDiffY > 1) {
          var track = Math.abs(drivingY) - lastDiffY;
          if (track > 5) {
            spikedb('Y', this.location);
            console.log("Y Accelerating: " + track);
            console.log("location: " + JSON.stringify(this.location));
          } else if (track < -5) {
            spikedb('Y', this.location);
            console.log("Y Decelerating: " + track);
            console.log("location: " + JSON.stringify(this.location));
          }
        }
        lastDiffY = Math.abs(drivingY);
        //console.log(drivingX + " " + drivingY + " " + drivingZ);
        NValues.shift();
      } });

      //console.log(JSON.stringify(acceleration), this.timestamp)
    });
  }
  
    // Stop watch
    //subscription.unsubscribe();
  }


