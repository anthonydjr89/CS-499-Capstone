import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {
  private fb = inject(FormBuilder);
  private tripService = inject(TripDataService);
  private router = inject(Router);

  saving = false;
  error = '';

  // ENHANCEMENT – Client-side validation mirrors server rules
  form = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(/^[A-Z0-9-]+$/)]],
    name: ['', [Validators.required]],
    length: ['', [Validators.required]],
    start: ['', [Validators.required]],
    resort: ['', [Validators.required]],
    perPerson: [0, [Validators.required, Validators.min(0), Validators.max(10000)]],
    image: [''],
    description: ['']
  });

  ngOnInit(): void {}

  // ENHANCEMENT – Added inline comments for save flow and error mapping
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const value = { ...this.form.value } as any;
    value.start = new Date(value.start).toISOString();

    // Save trip to API
    this.tripService.addTrip(value).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.error =
          err?.error?.message || err?.message || 'Save failed';
        this.saving = false;
      }
    });
  }
}
