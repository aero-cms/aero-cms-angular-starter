import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsClientService, unwrapCmsData } from '@aero-cms/angular-sdk';
import type { PageDto } from '@aero-cms/core';

@Component({
  selector: 'app-cms-page',
  template: `
    <article class="section">
      <div class="container article">
        @if (!page) {
          <div class="error-box">Sayfa bulunamadı.</div>
        } @else {
          <h1>{{ page.title }}</h1>
          <div [innerHTML]="pageHtml"></div>
        }
      </div>
    </article>
  `,
})
export class CmsPageComponent implements OnInit {
  private cms = inject(CmsClientService);
  private route = inject(ActivatedRoute);
  page: PageDto | null = null;

  get pageHtml(): string {
    return this.page?.blocks.map((b) => b.content).join('') ?? '';
  }

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;
    try {
      this.page = await unwrapCmsData(await this.cms.getPage(slug));
    } catch {
      this.page = null;
    }
  }
}
