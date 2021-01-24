import React, {FC} from 'react';

import styles from '../../css/management/NextButton.module.css';

type Props = {
  onClick: VoidFunction
}

/**
 * [Component] next button
 *
 * @param props
 */
const NextButton: FC<Props> = props => {
  return (
    <>
      <div className={styles.button} onClick={() => props.onClick()}>
        <span>▶</span>
      </div>
    </>
  )
}

export default NextButton;
