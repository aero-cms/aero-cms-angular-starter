import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CmsClientService, unwrapCmsData } from '@aero-cms/angular-sdk';
import type { HaberDto } from '@aero-cms/core';

@Component({
  selector: 'app-news-list',
  imports: [RouterLink, DatePipe],
  template: `
    <div class="section">
      <div class="container">
        <h1 class="page-title">Haberler</h1>
        @if (loadError) {
          <div class="error-box">Haberler yüklenemedi.</div>
        } @else if (haberler.length) {
          <div class="card-grid">
            @for (h of haberler; track h.id) {
              <a class="card" [routerLink]="['/haberler', h.id]">
                @if (h.gorselUrl) { <img [src]="h.gorselUrl" [alt]="h.baslik" /> }
                <div class="card-body">
                  <p class="meta">{{ h.yayinTarihi | date: 'dd.MM.yyyy' }}</p>
                  <h3>{{ h.baslik }}</h3>
                  <p>{{ h.ozet }}</p>
                </div>
              </a>
            }
          </div>
        } @else {
          <p class="empty">Henüz haber bulunmuyor.</p>
        }
      </div>
    </div>
  `,
})
export class NewsListComponent implements OnInit {
  private cms = inject(CmsClientService);
  haberler: HaberDto[] = [];
  loadError = false;

  async ngOnInit() {
    try {
      this.haberler = await unwrapCmsData(await this.cms.getNews({ pageSize: 12 }));
    } catch {
      this.loadError = true;
    }
  }
}
