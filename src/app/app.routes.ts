import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { NewsListComponent } from './pages/news-list.component';
import { NewsDetailComponent } from './pages/news-detail.component';
import { EventsListComponent } from './pages/events-list.component';
import { EventDetailComponent } from './pages/event-detail.component';
import { DocumentsComponent } from './pages/documents.component';
import { ContactComponent } from './pages/contact.component';
import { SearchComponent } from './pages/search.component';
import { CmsPageComponent } from './pages/cms-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'haberler', component: NewsListComponent },
  { path: 'haberler/:id', component: NewsDetailComponent },
  { path: 'etkinlikler', component: EventsListComponent },
  { path: 'etkinlikler/:id', component: EventDetailComponent },
  { path: 'dokumanlar', component: DocumentsComponent },
  { path: 'iletisim', component: ContactComponent },
  { path: 'arama', component: SearchComponent },
  { path: ':slug', component: CmsPageComponent },
];
