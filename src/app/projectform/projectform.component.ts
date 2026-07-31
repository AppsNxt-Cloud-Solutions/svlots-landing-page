import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projectform',
  templateUrl: './projectform.component.html',
  styleUrls: ['./projectform.component.css']
})

export class ProjectformComponent {
  addProjectForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private s3Service: SharedService
  ) {
    this.addProjectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      type: ['', Validators.required],
      externalLink: ['', Validators.required],
    });
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
  }

  async submitProject() {
    if (this.addProjectForm.invalid || !this.selectedFile) {
      Swal.fire('Validation Error', 'Please fill out all required fields and select an image file.', 'warning');
      return;
    }
  
    try {
      // Upload file to S3 and get the file URL
      const s3Response = await this.s3Service.uploadFile(this.selectedFile);
      const imageUrl = s3Response.Location;
      const fileName = this.selectedFile.name; 
  
      // Prepare project data with file URL and file name
      const projectData = {
        ...this.addProjectForm.value,
        imageUrl,   
        fileName   
      };
  

      // this.http.post('https://localhost:7192/api/SVLots/AddProject', projectData, { responseType: 'text' })
      //this.http.post('https://external.balajitransports.in/api/SVLots/AddProject', projectData, { responseType: 'text' })
      this.http.post('https://loginapi.svlots.com/api/SVLots/AddProject', projectData, { responseType: 'text' })
        .subscribe(
          response => {
            console.log('Project added successfully:', response);
            Swal.fire('Success', 'Project added successfully!', 'success');
  
            // Reset form fields
            this.addProjectForm.reset();
            this.selectedFile = null; 
  
            // Manually reset the file input field
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput) {
              fileInput.value = '';  
            }
          },
          error => {
            console.error('Error adding project:', error);
            Swal.fire('Error', 'Failed to add project. Please try again.', 'error');
          }
        );
    } catch (error) {
      console.error('Error uploading image:', error);
      Swal.fire('Error', 'Failed to upload image. Please try again.', 'error');
    }
  }
}  