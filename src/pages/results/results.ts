import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

  public SpikeX;
  public SpikeY;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
     storage.get('SpikeX').then(v => {
       console.log("Spikes in X: "+v); 
       this.SpikeX = JSON.parse(v); //we print the value of the spikes and parse it back
       //SpikeX and SpikeY are used for results page ngfor loops
    });
     storage.get('SpikeY').then(v =>{
       console.log("Spikes in Y: "+v);
       this.SpikeY = JSON.parse(v); 
    });
  }

}
