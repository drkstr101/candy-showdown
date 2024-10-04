import styles from './app-container.module.css';

export default function AppContainer({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
