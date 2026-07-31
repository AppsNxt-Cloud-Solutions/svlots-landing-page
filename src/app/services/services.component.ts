import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})

export class ServicesComponent 
{
  formVisible: boolean = false; // Track the visibility of the form
  selectedService: string = "Request a Call Back"; // Example static service heading
  formData = {
    firstName: '',
    email: '',
    phone: '',
    city: '',
    serviceHeading: this.selectedService
  };

  // Inject HttpClient to make API requests
  constructor(private http: HttpClient) {}

  // Method to show the form
  showForm(serviceHeading: string): void {
    console.log("Show form for:", serviceHeading);
    this.selectedService = serviceHeading; // Set the selected service heading
    this.formData.serviceHeading = serviceHeading; // Set the service heading in form data
    this.formVisible = true; // Show the form
  }

  // Method to hide the form
  hideForm(): void {
    this.formVisible = false; // Hide the form
  }

  onSubmit(): void {
    if (this.formData.firstName && this.formData.email && this.formData.phone && this.formData.city) {
      // Call the service to submit the form data
      // this.http.post('https://localhost:7192/api/SVLots/AddServiceRequest', this.formData, { responseType: 'text' })
      //this.http.post('https://external.balajitransports.in/api/SVLots/AddServiceRequest', this.formData, { responseType: 'text' })
      this.http.post('https://loginapi.svlots.com/api/SVLots/AddServiceRequest', this.formData, { responseType: 'text' })
        .subscribe(
          response => {
            console.log('Service request submitted successfully:', response);
  
            // Check if the response indicates success
            if (response === 'Service request added successfully.') {
              // Hide the form after successful submission
              this.hideForm();
  
              // Display success notification
              Swal.fire('Success', 'Your service request has been submitted successfully.', 'success');
            } else {
              // Handle unexpected response or error
              Swal.fire('Error', 'Unexpected response from server. Please try again.', 'error');
            }
  
            // Optionally reset form data
            this.formData = {
              firstName: '',
              email: '',
              phone: '',
              city: '',
              serviceHeading: this.selectedService
            };
  
          },
          error => {
            console.error('Error submitting service request:', error);
  
            // Display error notification
            Swal.fire('Error', 'There was an error submitting your service request. Please try again later.', 'error');
          }
        );
    } else {
      // If required fields are missing, show error message
      Swal.fire('Error', 'Please fill in all the fields.', 'error');
    }
  }
  
  
  // Method to call the API and submit the service request
  addServiceRequest(formData: any): Observable<any> {
    // const apiUrl = 'https://localhost:7192/api/SVLots/AddServiceRequest'; 
    //const apiUrl = 'https://external.balajitransports.in/api/SVLots/AddServiceRequest'; 
    const apiUrl = 'https://loginapi.svlots.com/api/SVLots/AddServiceRequest'; 
    return this.http.post(apiUrl, formData);
  }
}
