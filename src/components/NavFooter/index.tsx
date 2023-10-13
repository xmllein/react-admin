import styles from './index.module.scss'

interface Props {}

export default function ({}: Props) {
  return (
    <div className={styles.footer}>
      <div>Copyright ©2023 All Rights Reserved.</div>
    </div>
  )
}
