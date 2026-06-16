import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CmsPreviewService {
  readonly isPreview = signal(false);
  readonly previewData = signal<Record<string, Record<string, string>>>({});
  readonly highlightedComponent = signal<string | null>(null);

  private highlightTimer?: ReturnType<typeof setTimeout>;
  private readonly allowedOrigin = environment.adminOrigin;

  init(): void {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    this.isPreview.set(params.get('cms-preview') === 'true');
    if (!this.isPreview()) return;

    window.addEventListener('message', this.onMessage);
  }

  destroy(): void {
    if (typeof window === 'undefined') return;
    window.removeEventListener('message', this.onMessage);
  }

  getPreviewContent(componentKey: string): Record<string, string> | null {
    return this.previewData()[componentKey] ?? null;
  }

  mergeContent(componentKey: string, serverContent: Record<string, string>): Record<string, string> {
    const draft = this.getPreviewContent(componentKey);
    return this.isPreview() && draft ? { ...serverContent, ...draft } : serverContent;
  }

  isHighlighted(componentKey: string): boolean {
    return this.highlightedComponent() === componentKey;
  }

  private onMessage = (event: MessageEvent) => {
    if (event.origin !== this.allowedOrigin) return;

    const data = event.data;
    if (data?.type !== 'aero-cms-preview') return;

    switch (data.action) {
      case 'ping':
        window.parent.postMessage(
          { type: 'aero-cms-preview-ack', action: 'pong', ready: true },
          this.allowedOrigin,
        );
        break;
      case 'update':
        if (data.componentKey && data.fields) {
          this.previewData.update((prev) => ({
            ...prev,
            [data.componentKey]: data.fields,
          }));
        }
        break;
      case 'highlight':
        if (data.componentKey) {
          this.highlightedComponent.set(data.componentKey);
          if (this.highlightTimer) clearTimeout(this.highlightTimer);
          this.highlightTimer = setTimeout(() => this.highlightedComponent.set(null), 3000);
        }
        break;
    }
  };
}
