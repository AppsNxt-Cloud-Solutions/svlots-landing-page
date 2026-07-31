import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServicesComponent } from './services/services.component';
import { ProductsComponent } from './products/products.component';
import { BlogComponent } from './blog/blog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FlyersComponent } from './flyers/flyers.component';
import { DatacollectionComponent } from './datacollection/datacollection.component';
import { ProjectcardsComponent } from './projectcards/projectcards.component';
import { ProjectformComponent } from './projectform/projectform.component';
import { LoginmoduleModule } from './loginmodule/loginmodule.module';
import { KnowmoreComponent } from './knowmore/knowmore.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    ProjectsComponent,
    ServicesComponent,
    ProductsComponent,
    BlogComponent,
    MainComponent,
    GalleryComponent,
    ContactusComponent,
    FlyersComponent,
    DatacollectionComponent,
    ProjectcardsComponent,
    ProjectformComponent,
    KnowmoreComponent,
    CalculatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginmoduleModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
