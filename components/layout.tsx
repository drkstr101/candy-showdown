import { NAVIGATION } from '@lib/constants';
import { SkipNavContent } from '@reach/skip-nav';
import cn from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { CSSProperties } from 'react';
import Footer from './footer';
import Logo from './icons/icon-logo';
import styles from './layout.module.css';
import MobileMenu from './mobile-menu';
import ViewSource from './view-source';

type Props = {
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
  layoutStyles?: CSSProperties;
  isLive?: boolean;
};

export default function Layout({
  children,
  className,
  hideNav,
  layoutStyles,
  isLive = false,
}: Props) {
  const router = useRouter();
  const activeRoute = router.asPath;
  return (
    <>
      <div className={styles.background}>
        {!hideNav && (
          <header className={cn(styles.header)}>
            <div className={styles['header-logos']}>
              <MobileMenu key={router.asPath} />
              <Link href="/" className={styles.logo}>
                <Logo />
              </Link>
            </div>
            <div className={styles.tabs}>
              {NAVIGATION.map(({ name, route }) => (
                <Link
                  key={name}
                  href={route}
                  className={cn(styles.tab, {
                    [styles['tab-active']]: activeRoute.startsWith(route),
                  })}
                >
                  {name}
                </Link>
              ))}
            </div>

            <div className={cn(styles['header-right'])}>
              {activeRoute === '/' ? <div /> : <div />}
            </div>
          </header>
        )}
        <ViewSource />
        <div className={styles.page}>
          <main className={styles.main} style={layoutStyles}>
            <SkipNavContent />
            <div className={cn(styles.full, className)}>{children}</div>
          </main>
          {!activeRoute.startsWith('/stage') && <Footer />}
        </div>
      </div>
    </>
  );
}
