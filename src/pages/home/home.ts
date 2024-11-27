import { Component, NgZone } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public storage;
public isRunning;
constructor(public navCtrl: NavController, public storageobj: Storage) {
  this.storage = storageobj;
  this.stopTrack(); 
  console.log("ready to start");
}

public startTrack(){
  this.storage.set("SpikeX",null); //resetting results on start
  this.storage.set("SpikeY",null);
  this.storage.set("IsTracking",'+'); //enabled tracking
  this.isRunning = true; //isRunning updates button status
}
public stopTrack(){
  this.storage.set("IsTracking",'-'); //disabled tracking
  this.isRunning = false;
}
}