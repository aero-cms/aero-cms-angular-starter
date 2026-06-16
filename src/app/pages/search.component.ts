import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CmsClientService, unwrapCmsData } from '@aero-cms/angular-sdk';
import type { SearchResultDto } from '@aero-cms/core';

@Component({
  selector: 'app-search',
  imports: [RouterLink, FormsModule],
  template: `
    <div class="section">
      <div class="container">
        <h1 class="page-title">Arama</h1>
        <form class="search-form" (ngSubmit)="runSearch()">
          <input type="search" [(ngModel)]="searchInput" name="q" placeholder="Site içinde ara..." />
          <button class="submit-btn" type="submit">Ara</button>
        </form>
        @if (query && results.length) {
          <ul class="results">
            @for (item of results; track item.title) {
              <li>
                <a [routerLink]="item.url || '/'">{{ item.title }}</a>
                @if (item.excerpt) { <p>{{ item.excerpt }}</p> }
              </li>
            }
          </ul>
        } @else if (query) {
          <p class="empty">Sonuç bulunamadı.</p>
        }
      </div>
    </div>
  `,
})
export class SearchComponent implements OnInit {
  private cms = inject(CmsClientService);
  private route = inject(ActivatedRoute);
  searchInput = '';
  query = '';
  results: SearchResultDto[] = [];

  ngOnInit() {
    this.query = this.route.snapshot.queryParamMap.get('q')?.trim() ?? '';
    this.searchInput = this.query;
    if (this.query) void this.loadResults();
  }

  async runSearch() {
    this.query = this.searchInput.trim();
    await this.loadResults();
  }

  private async loadResults() {
    if (!this.query) {
      this.results = [];
      return;
    }
    try {
      this.results = await unwrapCmsData(await this.cms.search(this.query, { pageSize: 20 }));
    } catch {
      this.results = [];
    }
  }
}
