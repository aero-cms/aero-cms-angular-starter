import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CmsClientService, unwrapCmsData } from '@aero-cms/angular-sdk';
import type { EtkinlikDto, HaberDto } from '@aero-cms/core';
import { mergeComponentContent } from '../../lib/cms-content';
import { eventsListSchema, heroSchema, newsListSchema } from '../../lib/schemas';
import { CmsPreviewService } from '../services/cms-preview.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DatePipe],
  template: `
    <section
      class="hero"
      data-cms-component="hero-section"
      [class.is-highlighted]="preview.isHighlighted('hero-section')"
    >
      <div class="container">
        <h1>{{ heroContent()['title'] }}</h1>
        <p>{{ heroContent()['subtitle'] }}</p>
        <div class="btn-row">
          <a class="btn btn-primary" [routerLink]="heroContent()['ctaLink1']">{{ heroContent()['ctaText1'] }}</a>
          <a class="btn btn-secondary" [routerLink]="heroContent()['ctaLink2']">{{ heroContent()['ctaText2'] }}</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div
          class="section-header"
          data-cms-component="news-list"
          [class.is-highlighted]="preview.isHighlighted('news-list')"
        >
          <h2 class="page-title">{{ newsListContent()['sectionTitle'] }}</h2>
          <a class="view-all" routerLink="/haberler">{{ newsListContent()['viewAllText'] }}</a>
        </div>
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
        <div
          class="section-header"
          data-cms-component="events-list"
          [class.is-highlighted]="preview.isHighlighted('events-list')"
        >
          <h2 class="page-title">{{ eventsListContent()['sectionTitle'] }}</h2>
          <a class="view-all" routerLink="/etkinlikler">{{ eventsListContent()['viewAllText'] }}</a>
        </div>
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
  styles: `
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .page-title { margin: 0; }
    .view-all { font-size: 0.875rem; color: #2563eb; text-decoration: none; }
    .view-all:hover { text-decoration: underline; }
    .is-highlighted {
      outline: 2px solid #7c3aed;
      outline-offset: 2px;
      border-radius: 4px;
    }
  `,
})
export class HomeComponent implements OnInit {
  private cms = inject(CmsClientService);
  readonly preview = inject(CmsPreviewService);

  haberler: HaberDto[] = [];
  etkinlikler: EtkinlikDto[] = [];

  private heroServer = signal(mergeComponentContent(heroSchema));
  private newsListServer = signal(mergeComponentContent(newsListSchema));
  private eventsListServer = signal(mergeComponentContent(eventsListSchema));

  readonly heroContent = computed(() =>
    this.preview.mergeContent('hero-section', this.heroServer()),
  );
  readonly newsListContent = computed(() =>
    this.preview.mergeContent('news-list', this.newsListServer()),
  );
  readonly eventsListContent = computed(() =>
    this.preview.mergeContent('events-list', this.eventsListServer()),
  );

  async ngOnInit() {
    try {
      this.heroServer.set(
        mergeComponentContent(
          heroSchema,
          await unwrapCmsData(await this.cms.getComponentContent(heroSchema.key)),
        ),
      );
    } catch {}
    try {
      this.newsListServer.set(
        mergeComponentContent(
          newsListSchema,
          await unwrapCmsData(await this.cms.getComponentContent(newsListSchema.key)),
        ),
      );
    } catch {}
    try {
      this.eventsListServer.set(
        mergeComponentContent(
          eventsListSchema,
          await unwrapCmsData(await this.cms.getComponentContent(eventsListSchema.key)),
        ),
      );
    } catch {}
    try {
      this.haberler = await unwrapCmsData(await this.cms.getNews({ pageSize: 6 }));
    } catch {}
    try {
      this.etkinlikler = await unwrapCmsData(await this.cms.getEvents({ pageSize: 4 }));
    } catch {}
  }
}
