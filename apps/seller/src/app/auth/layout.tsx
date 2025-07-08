// src/app/auth/layout.tsx
import type { TChildrenComponent } from '../../types/base.types';
import styles from './styles.module.css';

export const AuthLayout = ({ children }: TChildrenComponent) => {
  return (
    <div className={styles['auth-container']}>
      <div className={styles['auth-content']}>
        <section className={styles['auth-left']}>
          <h1 style={{ fontFamily: 'var(--TikTokMedium)' }}>
            Cùng phát triển doanh nghiệp với
            <span className={styles['highlight']}> DEAL Shop </span>
            ngay hôm nay!
          </h1>
        </section>

        <section className={styles['auth-right']}>
          <div className={styles['auth-card']}>
            {children}
          </div>
        </section>
      </div>
    </div>
  );
};
