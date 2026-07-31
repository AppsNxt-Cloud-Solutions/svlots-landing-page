import { Component , OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import * as AWS from 'aws-sdk';
import { SharedService } from '../shared.service';
import { BooleanNullable } from 'aws-sdk/clients/glue';

declare var CryptoJS: any;


interface Project {
  title: string;
  imageUrl: string;
  description: string;
  location: string;
  type: string;
  externalLink: string;
  loading:Boolean;
}

@Component({
  selector: 'app-projectcards',
  templateUrl: './projectcards.component.html',
  styleUrls: ['./projectcards.component.css']
})

  export class ProjectcardsComponent {
    projects: any[] = [];
    filteredProjects: Project[] = [];
    selectedLocation: string = '';
    selectedType: string = '';

    uniqueLocations: string[] = [];
    uniqueTypes: string[] = [];


    AmazonS3AccessKey:any;
    AmazonS3SecretKey:any;

    constructor(private http: HttpClient , 
      private sanitizer: DomSanitizer,
      private sharedService:SharedService,
    ) {}

    ngOnInit(): void {
      this.fetchProjects();
    }

    fetchProjects(): void {
      //this.http.get<any[]>('https://external.balajitransports.in/api/SVLots/GetProjects')
      this.http.get<any[]>('https://loginapi.svlots.com/api/SVLots/GetProjects')
        .subscribe(
          (data) => {
            console.log('Fetched projects:', data); // Debugging: check the fetched data
            this.projects = data;
            this.filteredProjects = this.projects;
    
            // Initialize loading status for each project
            this.projects.forEach(project => {
              project.loading = true;  // Set loading to true initially
              
              if (project.fileName) {
                console.log('FileName exists, fetching image from S3:', project.fileName);
                this.fetchImageFromS3(project);
              } else {
                console.error('FileName is missing for project:', project);
              }
            });
    
            this.uniqueLocations = this.getUniqueValues('location');
            this.uniqueTypes = this.getUniqueValues('type');
          },
          (error) => {
            console.error('Error fetching projects:', error);
            Swal.fire('Error', 'Failed to load project data.', 'error');
          }
        );
    }
    
    async fetchImageFromS3(project: any): Promise<void> {
      await this.sharedService.initS3();

      if (typeof project.fileName !== 'string' || !project.fileName.trim()) {
        console.error('Invalid or missing fileName for project:', project);
        return;
      }
    
      // AWS.config.update({
      //   accessKeyId: 'AKIA33UFO4R4PNH4MC2Z',
      //   secretAccessKey: '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',
      //   region: 'ap-south-1'
      // });
    
      const s3 = new AWS.S3();
      const params = {
        Bucket: 'spropertydetails',  // S3 bucket name
        Key: project.fileName,  // The file name (key) in S3
      };
    
      console.log('Requesting image from S3 with params:', params);
    
      s3.getObject(params).promise()
        .then(data => {
          console.log('S3 response received for image:', data);
    
          // Create a Blob from the image data
          const mimeType = this.getFileMimeType(project.fileName);
          const blob = new Blob([data.Body as ArrayBuffer], { type: mimeType });
          const url = URL.createObjectURL(blob);
    
          // Sanitize the URL and update the project with the image URL
          project.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          project.loading = false;  // Set loading to false after image has loaded
          console.log('Updated project image URL:', project.imageUrl);
    
        })
        .catch(error => {
          console.error('Error fetching image from S3 for project:', error);
          project.loading = false;  // Hide loading spinner on error
        });
    }
    
    onImageLoad(project: any): void {
      project.loading = false; // Set loading to false once the image has loaded
    }
    
  getFileMimeType(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return 'image/jpeg';
      default:
        return 'application/octet-stream';
    }
  }
    
    
    getUniqueValues(field: keyof typeof this.projects[0]): string[] {
      const values = this.projects.map(project => project[field]);
      return Array.from(new Set(values));
    }

    applyFilters(): void {
      this.filteredProjects = this.projects.filter(project => {
        const matchesLocation = this.selectedLocation ? project.location === this.selectedLocation : true;
        const matchesType = this.selectedType ? project.type === this.selectedType : true;
        return matchesLocation && matchesType;
      });
    }

    viewMore(externalLink: string): void {
      console.log('Original externalLink:', externalLink);  // Debugging: check the passed URL
      
      // Check if externalLink starts with 'http://' or 'https://'
      if (!/^https?:\/\//i.test(externalLink)) {
        console.log('No protocol found, adding https://');  // Debugging: show message if no protocol
        externalLink = 'https://' + externalLink;
      }
      
      console.log('Final externalLink:', externalLink);  // Debugging: check the final URL
      
      // Navigate to the external link
      window.open(externalLink, '_blank');
    }
    
  }