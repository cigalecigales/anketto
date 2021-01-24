import React from 'react';
import { NextPage } from 'next';

import styles from '../css/Index.module.css';

/**
 * [Page] index
 */
const Index: NextPage = () => {

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>Welcome</div>
        <div>
          <span>If you are a speaker ={'>'} </span>
          <a href="/management">click here (management)</a>
        </div>
        <div>
          <span>Other ={'>'} </span>
          <a href="/entry">click here</a>
        </div>
      </div>
    </>
  )
}

export default Index;
