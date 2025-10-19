import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip.interface';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({ providedIn: 'root' })
export class TripDataService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  // Trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(${this.baseUrl}/trips);
  }

  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(${this.baseUrl}/trips/${code});
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(${this.baseUrl}/trips, trip);
  }

  updateTrip(code: string, trip: Partial<Trip>): Observable<Trip> {
    return this.http.put<Trip>(${this.baseUrl}/trips/${code}, trip);
  }

  // Auth
  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  // Shared for login/register
  private handleAuthAPICall(
    endpoint: string,
    user: User,
    passwd: string
  ): Observable<AuthResponse> {
    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(${this.baseUrl}/${endpoint}, formData);
  }
}

