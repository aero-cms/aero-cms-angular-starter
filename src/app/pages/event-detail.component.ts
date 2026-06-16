import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CmsClientService, unwrapCmsData } from '@aero-cms/angular-sdk';
import type { EtkinlikDto } from '@aero-cms/core';

@Component({
  selector: 'app-event-detail',
  imports: [RouterLink, DatePipe],
  template: `
    <article class="section">
      <div class="container article">
        @if (!etkinlik) {
          <div class="error-box">Etkinlik bulunamadı.</div>
        } @else {
          <a routerLink="/etkinlikler">← Etkinlikler</a>
          <h1>{{ etkinlik.baslik }}</h1>
          <p class="meta">{{ etkinlik.konum }} · {{ etkinlik.baslangicTarihi | date: 'dd.MM.yyyy HH:mm' }}</p>
          <div [innerHTML]="etkinlik.aciklama"></div>
        }
      </div>
    </article>
  `,
})
export class EventDetailComponent implements OnInit {
  private cms = inject(CmsClientService);
  private route = inject(ActivatedRoute);
  etkinlik: EtkinlikDto | null = null;

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    try {
      this.etkinlik = await unwrapCmsData(await this.cms.getEventById(id));
    } catch {
      this.etkinlik = null;
    }
  }
}
