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

  form = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(2)]],
    name: ['', [Validators.required]],
    length: ['', [Validators.required]],
    start: ['', [Validators.required]],  // yyyy-MM-dd from date input
    resort: ['', [Validators.required]],
    perPerson: [0, [Validators.required, Validators.min(0)]],
    image: [''],
    description: ['']
  });

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving = true;
    const value = { ...this.form.value } as any;
    value.start = new Date(value.start).toISOString();

    this.tripService.addTrip(value).subscribe({
      next: () => { this.saving = false; this.router.navigateByUrl('/'); },
      error: (err) => { this.error = err?.error?.message || err?.message || 'Save failed'; this.saving = false; }
    });
  }
}

