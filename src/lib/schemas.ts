import { defineSchema } from '@aero-cms/react-sdk';

export const heroSchema = defineSchema('hero-section', {
  title: { type: 'text', label: 'Başlık', default: 'AeroCMS' },
  subtitle: { type: 'textarea', label: 'Alt Başlık', default: 'Kurumsal web sitenizi kolayca yönetin' },
  ctaText1: { type: 'text', label: 'Buton 1 Metni', default: 'Haberler' },
  ctaLink1: { type: 'url', label: 'Buton 1 Linki', default: '/haberler' },
  ctaText2: { type: 'text', label: 'Buton 2 Metni', default: 'Etkinlikler' },
  ctaLink2: { type: 'url', label: 'Buton 2 Linki', default: '/etkinlikler' },
}, { label: 'Hero Section', category: 'Ana Sayfa', icon: '🎯' });

export const siteHeaderSchema = defineSchema('site-header', {
  siteName: { type: 'text', label: 'Site Adı', default: 'AeroCMS' },
}, { label: 'Site Header', category: 'Genel', icon: '🏛️' });

export const siteFooterSchema = defineSchema('site-footer', {
  siteName: { type: 'text', label: 'Site Adı', default: 'AeroCMS' },
  description: { type: 'textarea', label: 'Açıklama', default: 'Kurumsal web sitesi yonetim sistemi.' },
  copyright: { type: 'text', label: 'Telif Metni', default: 'AeroCMS. Tum haklari saklidir.' },
}, { label: 'Footer', category: 'Genel', icon: '🔻' });

export const siteSeoSchema = defineSchema('site-seo', {
  siteTitle: { type: 'text', label: 'Site Başlığı', default: 'AeroCMS' },
  siteDescription: { type: 'textarea', label: 'Site Açıklaması', default: 'Kurumsal web sitesi' },
}, { label: 'Site SEO', category: 'SEO', icon: '🔍' });

export const newsListSchema = defineSchema('news-list', {
  sectionTitle: { type: 'text', label: 'Bölüm Başlığı', default: 'Son Haberler' },
  viewAllText: { type: 'text', label: 'Tümünü Gör Metni', default: 'Tumunu Gor' },
}, { label: 'Haber Listesi', category: 'Ana Sayfa', icon: '📰' });

export const eventsListSchema = defineSchema('events-list', {
  sectionTitle: { type: 'text', label: 'Bölüm Başlığı', default: 'Yaklasan Etkinlikler' },
  viewAllText: { type: 'text', label: 'Tümünü Gör Metni', default: 'Tumunu Gor' },
}, { label: 'Etkinlik Listesi', category: 'Ana Sayfa', icon: '📅' });

export const allSchemas = [
  heroSchema,
  siteHeaderSchema,
  siteFooterSchema,
  siteSeoSchema,
  newsListSchema,
  eventsListSchema,
];
