import { Component, inject } from '@angular/core';
import { CmsPreviewService } from '../services/cms-preview.service';

@Component({
  selector: 'app-preview-banner',
  template: `
    @if (preview.isPreview()) {
      <div class="preview-banner">
        <span aria-hidden="true">👁</span>
        CMS Canlı Önizleme Modu — Değişiklikler henüz kaydedilmedi
      </div>
    }
  `,
  styles: `
    .preview-banner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 99999;
      background: linear-gradient(135deg, #7c3aed, #6d28d9);
      color: #fff;
      padding: 6px 16px;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
    }
  `,
})
export class PreviewBannerComponent {
  preview = inject(CmsPreviewService);
}
