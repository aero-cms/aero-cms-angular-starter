import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CmsClientService, unwrapCmsData } from '@aero-cms/angular-sdk';
import type { EtkinlikDto, HaberDto } from '@aero-cms/core';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DatePipe],
  template: `
    <section class="hero">
      <div class="container">
        <h1>AeroCMS</h1>
        <p>Kurumsal web sitenizi kolayca yönetin</p>
        <div class="btn-row">
          <a class="btn btn-primary" routerLink="/haberler">Haberler</a>
          <a class="btn btn-secondary" routerLink="/etkinlikler">Etkinlikler</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="page-title">Son Haberler</h2>
        @if (haberler.length) {
          <div class="card-grid">
            @for (haber of haberler; track haber.id) {
              <a class="card" [routerLink]="['/haberler', haber.id]">
                @if (haber.gorselUrl) {
                  <img [src]="haber.gorselUrl" [alt]="haber.baslik" />
                }
                <div class="card-body">
                  <p class="meta">{{ haber.yayinTarihi | date: 'dd.MM.yyyy' }}</p>
                  <h3>{{ haber.baslik }}</h3>
                  <p>{{ haber.ozet }}</p>
                </div>
              </a>
            }
          </div>
        } @else {
          <p class="empty">Henüz haber bulunmuyor.</p>
        }
      </div>
    </section>

    <section class="section section-muted">
      <div class="container">
        <h2 class="page-title">Yaklaşan Etkinlikler</h2>
        @if (etkinlikler.length) {
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
    </section>
  `,
})
export class HomeComponent implements OnInit {
  private cms = inject(CmsClientService);
  haberler: HaberDto[] = [];
  etkinlikler: EtkinlikDto[] = [];

  async ngOnInit() {
    try {
      this.haberler = await unwrapCmsData(await this.cms.getNews({ pageSize: 6 }));
    } catch {}
    try {
      this.etkinlikler = await unwrapCmsData(await this.cms.getEvents({ pageSize: 4 }));
    } catch {}
  }
}
