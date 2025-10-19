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

  // ENHANCEMENT – Added pagination to match backend structure
  getTrips(page = 1, limit = 20): Observable<{ data: Trip[]; page: number; limit: number; total: number }> {
    return this.http.get<{ data: Trip[]; page: number; limit: number; total: number }>(
      `${this.baseUrl}/trips?page=${page}&limit=${limit}`
    );
  }

  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/trips/${code}`);
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.baseUrl}/trips`, trip);
  }

  updateTrip(code: string, trip: Partial<Trip>): Observable<Trip> {
    return this.http.put<Trip>(`${this.baseUrl}/trips/${code}`, trip);
  }

  // ENHANCEMENT – Auth: name ignored for login, used for register
  login(user: User, passwd: string): Observable<AuthResponse> {
    const loginUser = { email: user.email, password: passwd };
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, loginUser);
  }

  register(user: User, passwd: string): Observable<AuthResponse> {
    const registerUser = { name: user.name, email: user.email, password: passwd };
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, registerUser);
  }
}
