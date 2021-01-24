import React, {FC} from 'react';

import styles from '../../css/entry/TopPage.module.css';

type Props = {
  title: string;
}

/**
 * [Component] top
 *
 * @param props
 */
const TopPage: FC<Props> = props => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{props.title}</div>
      <span className={styles.sub}>Please wait for the admin's operation ...</span>
    </div>
  )
}

export default TopPage;
