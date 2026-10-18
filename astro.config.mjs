// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://litemoa.n1e.net',

  integrations: [
    sitemap(),

    starlight({
      title: 'Litemoa Wiki',
      description: 'Litemoa Server（リテ鯖）の公式Wiki',
      favicon: '/server-icon.png',
      defaultLocale: 'root',
      locales: { root: { label: '日本語', lang: 'ja' } },
      pagefind: false,
      head: [
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://litemoa.n1e.net/og-image.png' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://litemoa.n1e.net/og-image.png' } },
      ],

      // 公式サイト / Wiki 共通の404を src/pages/404.astro で使います。
      disable404Route: true,

      customCss: [
        './src/styles/tokens.css',
        './src/styles/shared.css',
        './src/styles/wiki.css',
      ],

      components: {
        Footer: './src/components/WikiFooter.astro',
        Header: './src/components/WikiHeader.astro',
        SiteTitle: './src/components/Brand.astro',
        ThemeProvider: './src/components/ThemeProvider.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
        Search: './src/components/SearchLink.astro',
      },

      social: [
        {
          icon: 'discord',
          label: 'Discord',
          href: 'https://discord.gg/UyKV4BDxBR',
        },
        {
          icon: 'x.com',
          label: 'X',
          href: 'https://x.com/litemoa',
        },
        {
          icon: 'youtube',
          label: 'YouTube',
          href: 'https://www.youtube.com/channel/UC_p9eD-ZmbDRSJ5HsvDqcoQ?sub_confirmation=1',
        },
      ],

      sidebar: [
        {
          label: 'はじめに',
          items: [
            {
              label: 'Wikiトップ',
              slug: 'wiki',
            },
            {
              label: 'スターターガイド',
              slug: 'wiki/start',
            },
            {
              label: '参加方法',
              slug: 'wiki/join',
            },
          ],
        },
        {
          label: '暮らしと操作',
          items: [
            { label: 'サーバーの遊び方', slug: 'wiki/play' },
            { label: 'コマンド一覧', slug: 'wiki/commands' },
          ],
        },
        {
          label: 'ルール・ポリシー',
          items: [
            {
              label: '利用規約',
              slug: 'wiki/rules',
            },
            {
              label: 'プライバシーポリシー',
              slug: 'wiki/policy',
            },
          ],
        },
      ],
    }),
  ],
});
