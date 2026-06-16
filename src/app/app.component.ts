import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { CmsClientService, unwrapCmsData } from '@aero-cms/angular-sdk';
import { mergeComponentContent } from '../lib/cms-content';
import { siteSeoSchema } from '../lib/schemas';
import { AppHeaderComponent } from './components/app-header.component';
import { AppFooterComponent } from './components/app-footer.component';
import { PreviewBannerComponent } from './components/preview-banner.component';
import { CmsPreviewService } from './services/cms-preview.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeaderComponent, AppFooterComponent, PreviewBannerComponent],
  template: `
    <div class="shell" [class.is-preview]="preview.isPreview()">
      <app-preview-banner />
      <app-header />
      <main class="main">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
  styles: `
    .shell.is-preview { padding-top: 32px; }
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  private previewService = inject(CmsPreviewService);
  private cms = inject(CmsClientService);
  private title = inject(Title);
  private meta = inject(Meta);
  preview = this.previewService;

  async ngOnInit() {
    this.previewService.init();
    try {
      const seo = mergeComponentContent(
        siteSeoSchema,
        await unwrapCmsData(await this.cms.getComponentContent(siteSeoSchema.key)),
      );
      this.title.setTitle(seo['siteTitle']);
      this.meta.updateTag({ name: 'description', content: seo['siteDescription'] });
    } catch {}
  }

  ngOnDestroy() {
    this.previewService.destroy();
  }
}
