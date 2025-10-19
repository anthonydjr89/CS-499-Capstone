import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip.interface';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent, RouterModule],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css']
})
export class TripListingComponent implements OnInit {
  private tripService = inject(TripDataService);
  private auth = inject(AuthenticationService);

  trips: Trip[] = [];
  loading = false;
  error = '';
  page = 1;
  limit = 20;
  total = 0;

  ngOnInit(): void {
    // ENHANCEMENT – Fetch first page with pagination
    this.loadTrips();
  }

  loadTrips(): void {
    this.loading = true;
    this.tripService.getTrips(this.page, this.limit).subscribe({
      next: (res) => {
        // ENHANCEMENT – Handle structured response { data, page, limit, total }
        this.trips = res.data || [];
        this.page = res.page;
        this.limit = res.limit;
        this.total = res.total;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Failed to load trips';
        this.loading = false;
      }
    });
  }

  public isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
