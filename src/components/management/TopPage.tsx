import React, {FC} from 'react';

import styles from '../../css/management/TopPage.module.css';

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
    <div className={styles.title}>
      <span>{props.title}</span>
    </div>
  )
}

export default TopPage;
