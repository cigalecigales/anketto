import React, { FC, useState } from 'react';

import styles from '../../css/entry/SelectionPage.module.css';
import { BarGraphType } from '../../types/BarGraph';

type Props = {
  data: BarGraphType;
  refs: any,
  onClick: VoidFunction;
}

/**
 * 選択画面用
 *
 * @param props
 */
const SelectionPage: FC<Props> = props => {

  let count = 0;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>{props.data.title}</div>
        {
          props.data.selections && props.data.selections.map((s, sIdx) => {
            return (
              <div key={s.selection} className={styles.selection}>
                <label>
                  <input
                    type={(props.data.maxSelectableCount === 1) ? 'radio' : 'checkbox'}
                    name="selection"
                    value={count++}
                    ref={(element) => props.refs.current.push(element)}
                    className={styles.checkbox}
                  />
                  <span>{s.selection}</span>
                </label>
              </div>
            )
          })
        }
        <div className={styles.buttonArea}>
          <button
            onClick={() => {props.onClick()}}
            className={styles.button}>
            send
          </button>
        </div>
      </div>
    </>
  )
}

export default SelectionPage;

