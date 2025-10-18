import { Component, OnInit } from '@angular/core';
import { TripsDataService } from '../../services/trips-data.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  trips: any[] = [];

  constructor(private tripsDataService: TripsDataService) {}

  ngOnInit(): void {
    this.tripsDataService
      .getTrips()
      .then((data: any[]) => {
        this.trips = data;
      })
      .catch((error) => {
        console.log('Error loading trips', error);
      });
  }
}
