import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OntologyComponent } from './ontology/ontology.component';

const routes: Routes = [
  { path: 'ontology', component: OntologyComponent }, // readonly view component
  { path: '**', redirectTo: '/', pathMatch: 'full' }, // readonly view is the default if no endpoint is specified

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
