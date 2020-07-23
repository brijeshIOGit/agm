import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agmCode';
  places: Array<any> = [];
  placesBak: Array<any> = [];
  latitude = 0;
  longitude = 0;
  inputValue: any;
  blueIcon = 'http://team-scale.com/TestData/ng_text_v15/blue_marker.png';
  orangeIcon = 'http://team-scale.com/TestData/ng_text_v15/orange_marker.png';
  @ViewChild('myInput') myInput: ElementRef<HTMLElement>;
  constructor(private _http: HttpService) {
    this.getMarkers();
  }
  getMarkers() {
    const reqUrl = 'http://team-scale.com/TestData/ng_text_v15/api';
    this._http.getReq(reqUrl).subscribe(response => {
      this.places = response;
      this.placesBak = response;
      this.placesBak.map(item => (item.marker = this.blueIcon));
      this.places.map(item => (item.marker = this.blueIcon));
      this.latitude = this.places[0].lat;
      this.longitude = this.places[0].lon;
    });
  }
  assign() {
    this.places = Object.assign([], this.placesBak);
  }
  clickedMarker(place, index) {
    this.clearInput();
    if (this.placesBak[index].isRedMarker) {
      this.placesBak[index].marker = this.blueIcon;
      this.placesBak[index].isRedMarker = false;
      this.assign();
    } else {
      this.placesBak.map(item => {
        item.marker = this.blueIcon;
        item.isRedMarker = false;
      });
      this.placesBak[index].marker = this.orangeIcon;
      this.placesBak[index].isRedMarker = true;
      this.places = Object.assign([], this.placesBak).filter(
        item => item.id === place.id
      );
    }
  }
  clickPlace(place, index) {
    this.clearInput();
    if (this.placesBak[index].isRedMarker) {
      this.placesBak[index].marker = this.blueIcon;
      this.placesBak[index].isRedMarker = false;
      this.assign();
    } else {
      this.placesBak.map(item => {
        item.marker = this.blueIcon;
        item.isRedMarker = false;
      });
      this.placesBak[index].marker = this.orangeIcon;
      this.placesBak[index].isRedMarker = true;
    }
  }

  filterItem(value) {
    if (!value) {
      this.assign();
    } // when nothing has typed
    this.places = Object.assign([], this.placesBak).filter(
      item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }
  clearInput() {
    this.inputValue = '';
  }
}
