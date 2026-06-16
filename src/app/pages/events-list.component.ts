import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CmsClientService, unwrapCmsData } from '@aero-cms/angular-sdk';
import type { EtkinlikDto } from '@aero-cms/core';

@Component({
  selector: 'app-events-list',
  imports: [RouterLink],
  template: `
    <div class="section">
      <div class="container">
        <h1 class="page-title">Etkinlikler</h1>
        @if (loadError) {
          <div class="error-box">Etkinlikler yüklenemedi.</div>
        } @else if (etkinlikler.length) {
          <div class="card-grid">
            @for (e of etkinlikler; track e.id) {
              <a class="card" [routerLink]="['/etkinlikler', e.id]">
                <div class="card-body">
                  <h3>{{ e.baslik }}</h3>
                  <p>{{ e.konum }}</p>
                  <p>{{ e.aciklama }}</p>
                </div>
              </a>
            }
          </div>
        } @else {
          <p class="empty">Henüz etkinlik bulunmuyor.</p>
        }
      </div>
    </div>
  `,
})
export class EventsListComponent implements OnInit {
  private cms = inject(CmsClientService);
  etkinlikler: EtkinlikDto[] = [];
  loadError = false;

  async ngOnInit() {
    try {
      this.etkinlikler = await unwrapCmsData(await this.cms.getEvents({ pageSize: 12 }));
    } catch {
      this.loadError = true;
    }
  }
}
