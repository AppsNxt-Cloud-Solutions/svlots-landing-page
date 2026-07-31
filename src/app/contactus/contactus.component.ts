import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
  contactForm: FormGroup;
  loading: boolean = false; 

  constructor(private fb: FormBuilder, private http: HttpClient , private router : Router) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(180)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.loading = true;
  
      // Define URL and any required params or form data
      const url = 'https://localhost:7192/api/SVLots/SubmitContactForm';
      const formData = this.contactForm.value;
      const params = {}; // Adjust if needed
  
      this.http.post(url, formData, { params, observe: 'response' }).subscribe(
        (response) => {
          this.loading = false;
          this.hideLoadingPopup();
  
          // Check if response status is 200 for success
          if (response.status === 200) {
            console.log('Response Body:', response);
  
            Swal.fire("Success", 'Data Added Successfully', 'success').then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          } else {
            console.error('Unexpected status code:', response.status);
          }
        },
        (error) => {
          this.loading = false;
          this.hideLoadingPopup();
  
          // Handle errors based on status code ranges
          if (error.status >= 200 && error.status < 300) {
            Swal.fire("Success", 'Data Added Successfully', 'success').then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          } else if (error.status >= 400 && error.status < 500) {
            Swal.fire("Error", 'Please fill all data', 'error');
            console.error('Error Status:', error.status);
            console.error('Error Message:', error.message);
            console.error('Error Response:', error.error);
          } else {
            console.error('Unexpected error:', error);
            Swal.fire('Error', 'Failed to upload files', 'error');
          }
        }
      );
    } else {
      Swal.fire("Warning", 'Please fill in all required fields.', 'warning');
    }
  }

  showLoadingPopup() {
    Swal.fire({
      title: 'Loading',
      html: '<div class="d-flex justify-content-center" style="overflow: hidden;"><div class="spinner-border" role="status" style="height: 200px; width: 200px;"><span class="sr-only" id="loading"></span></div></div>',
      allowOutsideClick: false,
      showConfirmButton: false
    });
  }
  
  hideLoadingPopup() {
    Swal.close();
  }
  
  goToHome() {
    this.router.navigate(['/main']);
  }
}
