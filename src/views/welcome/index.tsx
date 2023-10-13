import styles from './index.module.scss'

export default function Welcome() {
  return (
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div className={styles.subTitle}>欢迎体验</div>
        <div className={styles.title}>
          React18+ReactRouter6.x+Antd5.x+Typescript5.x 管理后台
        </div>
      </div>
    </div>
  )
}
