import cn from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { SITE_NAME } from '@lib/constants';
import getUrl from '@lib/helpers/get-url';

type Meta = {
  title: string | null;
  description: string | null;
  image?: string | null;
  url?: string | null;
};

type Props = {
  meta: Meta;
  children: React.ReactNode;
  fullViewport?: boolean;
};

export default function Page({ meta, children, fullViewport = false }: Props) {
  const router = useRouter();
  const image = meta.image || '/twitter-card.png';
  const title = meta.title || SITE_NAME;
  const url = meta.url || getUrl(router.asPath);
  const description = meta.description || SITE_NAME;

  return (
    <div className={cn('page-container', { full: fullViewport })}>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0a0a0a" />
        <meta name="apple-mobile-web-app-title" content="Candy Showdown" />
        <meta name="application-name" content="Candy Showdown" />
        <meta name="msapplication-TileColor" content="#fafafa" />
        <meta name="theme-color" content="#fafafa" />
        <link
          rel="preload"
          href="https://assets.vercel.com/raw/upload/v1587415301/fonts/2/inter-var-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta property="og:image" content={image.startsWith('http') ? image : getUrl(image)} />
      </Head>
      {children}
    </div>
  );
}
