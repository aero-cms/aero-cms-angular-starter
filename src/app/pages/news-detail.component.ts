import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CmsClientService, unwrapCmsData } from '@aero-cms/angular-sdk';
import type { HaberDto } from '@aero-cms/core';

@Component({
  selector: 'app-news-detail',
  imports: [RouterLink, DatePipe],
  template: `
    <article class="section">
      <div class="container article">
        @if (!haber) {
          <div class="error-box">Haber bulunamadı.</div>
        } @else {
          <a routerLink="/haberler">← Haberler</a>
          <h1>{{ haber.baslik }}</h1>
          <p class="meta">{{ haber.yayinTarihi | date: 'dd.MM.yyyy' }}</p>
          @if (haber.gorselUrl) {
            <img class="cover" [src]="haber.gorselUrl" [alt]="haber.baslik" />
          }
          <div [innerHTML]="haber.icerik"></div>
        }
      </div>
    </article>
  `,
})
export class NewsDetailComponent implements OnInit {
  private cms = inject(CmsClientService);
  private route = inject(ActivatedRoute);
  haber: HaberDto | null = null;

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    try {
      this.haber = await unwrapCmsData(await this.cms.getNewsById(id));
    } catch {
      this.haber = null;
    }
  }
}
