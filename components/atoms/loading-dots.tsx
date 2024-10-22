import px from '@lib/helpers/to-pixels';
import cn from 'clsx';
import styles from './loading-dots.module.css';

interface Props {
  size?: number;
  height?: number | string;
  reverse?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function LoadingDots({ className, size = 2, height, children, reverse }: Props) {
  return (
    <span
      className={cn(className, styles.loading, { [styles.reverse]: reverse })}
      style={{
        ['--loading-dots-height' as string]: height ? px(height) : undefined,
        ['--loading-dots-size' as string]: size !== 2 ? px(size) : undefined,
      }}
    >
      {children && <div className={styles.spacer}>{children}</div>}
      <span />
      <span />
      <span />
    </span>
  );
}
