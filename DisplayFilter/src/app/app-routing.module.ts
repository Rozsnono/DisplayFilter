import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MonitorDialogComponent } from './monitor-dialog/monitor-dialog.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"search",component:SearchComponent},
  {path:"search/:id",component:MonitorDialogComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
