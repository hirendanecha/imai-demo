import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './angular-grid/search.component';
import { FeedComponent } from './feed/feed.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
  {
    path: 'profile/:id',
    component: FeedComponent,
  },
  { path:"**", component: SearchComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
