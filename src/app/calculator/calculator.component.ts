import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})

export class CalculatorComponent implements OnInit {
  simpleForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.simpleForm = this.fb.group({
      sideA: [null, Validators.required],
      sideB: [null, Validators.required],
      sideC: [null, Validators.required],
      calculatedArea: [{ value: '', disabled: true }],

      // Fields for triangles in simple form
      A1a: [null, Validators.required],
      A1b: [null, Validators.required],
      A1c: [null, Validators.required],
      A2a: [null, Validators.required],
      A2b: [null, Validators.required],
      A2c: [null, Validators.required],
      A3a: [null, Validators.required],
      A3b: [null, Validators.required],
      A3c: [null, Validators.required],
      Area1: [{ value: '', disabled: true }],
      Area2: [{ value: '', disabled: true }],
      Area3: [{ value: '', disabled: true }],
      TotalArea: [{ value: '', disabled: true }],

      // Fields for quadrilateral form
      T1a: [null, Validators.required], // Triangle 1 - side a
      T1b: [null, Validators.required], // Triangle 1 - side b
      T1Diag: [null, Validators.required], // Triangle 1 diagonal

      T2a: [null, Validators.required], // Triangle 2 - side a
      T2b: [null, Validators.required], // Triangle 2 - side b
      T2Diag: [null, Validators.required], // Triangle 2 diagonal

      AreaT1: [{ value: '', disabled: true }], // Area of Triangle 1 (Quad)
      AreaT2: [{ value: '', disabled: true }], // Area of Triangle 2 (Quad)
      TotalQuadArea: [{ value: '', disabled: true }], // Total Quadrilateral Area
    });
  }

  ngOnInit(): void {
    this.simpleForm.valueChanges.subscribe((values) => {
      this.calculateAreas(values);
    });
  }

  calculateAreas(values: any): void {

    const calculatedArea = this.calculateTriangleArea( values.sideA,values.sideB,values.sideC );
    this.simpleForm.get('calculatedArea')?.setValue(calculatedArea.toFixed(2), { emitEvent: false });

    // Calculate triangle areas
    const area1 = this.calculateTriangleArea(values.A1a, values.A1b, values.A1c);
    const area2 = this.calculateTriangleArea(values.A2a, values.A2b, values.A2c);
    const area3 = this.calculateTriangleArea(values.A3a, values.A3b, values.A3c);

    // Set triangle areas
    this.simpleForm.get('Area1')?.setValue(area1.toFixed(2), { emitEvent: false });
    this.simpleForm.get('Area2')?.setValue(area2.toFixed(2), { emitEvent: false });
    this.simpleForm.get('Area3')?.setValue(area3.toFixed(2), { emitEvent: false });

    // Calculate total area for triangles
    const totalArea = area1 + area2 + area3;
    this.simpleForm.get('TotalArea')?.setValue(totalArea.toFixed(2), { emitEvent: false });

    // Calculate quadrilateral areas
    const areaT1 = this.calculateTriangleArea(values.T1a, values.T1b, values.T1Diag);
    const areaT2 = this.calculateTriangleArea(values.T2a, values.T2b, values.T2Diag);

    // Set quadrilateral areas
    this.simpleForm.get('AreaT1')?.setValue(areaT1.toFixed(2), { emitEvent: false });
    this.simpleForm.get('AreaT2')?.setValue(areaT2.toFixed(2), { emitEvent: false });

    // Calculate total area for quadrilateral
    const totalQuadArea = areaT1 + areaT2;
    this.simpleForm.get('TotalQuadArea')?.setValue(totalQuadArea.toFixed(2), { emitEvent: false });
  }

  calculateTriangleArea(a: number, b: number, c: number): number {
    if (a <= 0 || b <= 0 || c <= 0) {
      return 0; // Invalid triangle sides
    }
    const s = (a + b + c) / 2; // Semi-perimeter
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return isNaN(area) ? 0 : area; // Return 0 if invalid
  }
}