import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { BlogComponent } from './blog/blog.component';
import { ProductsComponent } from './products/products.component';
import { FlyersComponent } from './flyers/flyers.component';
import { DatacollectionComponent } from './datacollection/datacollection.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServicesComponent } from './services/services.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MainComponent } from './main/main.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProjectcardsComponent } from './projectcards/projectcards.component';
import { ProjectformComponent } from './projectform/projectform.component';
import { KnowmoreComponent } from './knowmore/knowmore.component';
// import { LoginmoduleModule } from './loginmodule/loginmodule.module';
import { CalculatorComponent } from './calculator/calculator.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' }, // Change this to redirect to MainComponent
  { path: 'main', component: MainComponent },
  { path: 'about-us', component: AboutusComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/flyers', component: FlyersComponent },
  { path: 'products/data-collection', component:DatacollectionComponent },
  { path: 'blog', component:BlogComponent },
  { path: 'gallery', component:GalleryComponent },
  { path: 'contactus', component:ContactusComponent },
  { path: 'projectcards', component:ProjectcardsComponent },
  { path: 'projectform', component:ProjectformComponent },
  { path: 'knowmore', component:KnowmoreComponent},
  { path: 'calculator', component:CalculatorComponent},
  { path: 'loginmodule', loadChildren: () => import('./loginmodule/loginmodule.module').then(m => m.LoginmoduleModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
