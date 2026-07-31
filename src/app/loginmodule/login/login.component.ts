import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service'; // Import AuthService
import { Router } from '@angular/router'; // Import Router for navigation
import Swal from 'sweetalert2';

interface LoginResponse {
  message: string; // The success message returned from the server
  email: string;   // The email of the logged-in user (required)
  role?: string;   // Optional role
  status: number;
  projectName: string;
  projectNames?: string[];
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  loginEmail: string = '';
  loginPassword: string = '';
  successMessage: string = '';
  message: string = '';
  isSuccess: boolean = false;
  isModalVisible: boolean = false;
  showPassword: boolean = false;
  loginProjectName: string = '';

  constructor(
    private authService: AuthService,
    private router: Router ,
    ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  handleLogin(): void {
    const hardcodedProjectName = 'SVLots';  // Hardcoded project name
  
    // Check that both email and password are entered
    if (!this.loginEmail || !this.loginPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please enter both email and password.',
        confirmButtonText: 'Okay'
      });
      return;
    }
  
    // Call login service
    this.authService.login(this.loginEmail, this.loginPassword).subscribe({
      next: (response: LoginResponse) => {
        console.log('Backend response:', response);  // Debug log to check the response
  
        // Correcting the property access to match the backend response (case-sensitive)
        const responseProjectNames = response.projectNames;  // Accessing the projectNames array
        console.log('Response Project Names:', responseProjectNames);  // Debug log for project names
  
        // Check if the project names array contains the hardcoded project name
        if (!responseProjectNames || !responseProjectNames.includes(hardcodedProjectName)) {
          Swal.fire({ 
            icon: 'error',
            title: 'Login Failed',
            text: `Invalid project name. Expected: ${hardcodedProjectName}`,
            confirmButtonText: 'Okay'
          });
          return;  // Stop further execution if project name doesn't match
        }
  
        // If the project name matches, proceed with login
        if (response.message === 'Login successful.') {
          this.authService.storeUserEmail(response.email);
          this.message = 'Login successful';
          this.isSuccess = true;
          this.isModalVisible = true;
  
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You are now logged in.',
            confirmButtonText: 'Continue'
          }).then(() => {
            this.navigateToCorrectComponent(); // Navigate after successful login
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: response.message,
            confirmButtonText: 'Okay'
          });
          this.isSuccess = false;
          this.isModalVisible = true;
        }
      },
      error: (error: any) => {
        console.error('Login error:', error);  // Debug log for any errors
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.error?.message ?? 'Login failed. Please check your credentials.',
          confirmButtonText: 'Okay'
        });
        this.isSuccess = false;
        this.isModalVisible = true;
      }
    });
}

  
  closeModal() {
    this.isModalVisible = false; // Close the modal
  }

  private navigateToCorrectComponent() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    let route: string;
  
    // Determine the route based on admin status
    if (isAdmin) {
      route = '/projectform';
    } else {
      route = '/projectform';  // You can change this to a different route if necessary for non-admin users
    }
  
    console.log('Navigating to:', route);
  
    // Navigate to the determined route
    this.router.navigate([route]).then(success => {
      if (success) {
        console.log('Navigation successful');
        // Delay refresh to ensure the component is fully loaded
        // setTimeout(() => {
        //   window.location.reload(); 
        // }, 100); 
      } else {
        console.error('Navigation failed!');
      }
    }).catch(error => {
      console.error('Navigation error:', error);
    });
  }
  
  handleForgotPassword(): void {
    this.router.navigate(['/forgot-password']); // Navigate to Forgot Password component
  }
  
  // Redirect to registration page
  handleRegister(): void {
    this.router.navigate(['/register']);
  }
}
