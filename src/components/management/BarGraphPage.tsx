import React, { FC } from 'react';
import { Bar } from 'react-chartjs-2';

import styles from '../../css/management/BarGraphPage.module.css';

type Props = {
  title: string;
  data: any;
}

/**
 * [Component] bar graph
 *
 * @param props
 */
const BarGraphPage: FC<Props> = props => {

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <span>{props.title}</span>
        </div>
        <div className={styles.graph}>
          <Bar
            data={props.data}
            width={400}
            height={200}
            options={{
              maintainAspectRatio: false,
              legend: {
                display: false
              },
              scales: {
                xAxes: [{
                  ticks: {
                    fontSize: 40
                  }
                }],
                yAxes: [{
                  ticks: {
                    fontSize: 20,
                    stepSize: 1,
                    beginAtZero: true
                  }
                }]
              }
            }}
          />
        </div>
      </div>
    </>
  )
}

export default BarGraphPage;

