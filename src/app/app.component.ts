import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  preview = this.previewService;

  ngOnInit() {
    this.previewService.init();
  }

  ngOnDestroy() {
    this.previewService.destroy();
  }
}
