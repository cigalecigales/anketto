import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { io } from 'socket.io-client';

import { SocketEvent } from '../types/SocketEvent';
import { AggregateType } from '../types/AggregateType';

import TopPage from '../components/management/TopPage';
import NextButton from '../components/management/NextButton';
import BarGraphPage from '../components/management/BarGraphPage';


/**
 * [Page] management
 */
const Management: NextPage = () => {

  // socket.io
  const [socket, _] = useState(() => io());
  // page contents
  const [pageContents, setPageContents] = useState<JSX.Element>(
    <div></div>
  );
  // display next button flag
  const [isNext, setNext] = useState<boolean>(true);

  useEffect(() => {
    socket.on(SocketEvent.MANAGEMENT_CURRENT, (data) => {
      if (data.currentQuestionNo === -1) {
        setPageContents(<TopPage title={data.questionData} />);
      } else {
        createGraph(data.questionData);
      }
      isLastQuestion(data);
    });

    socket.on(SocketEvent.MANAGEMENT_NEXT, (data) => {
      createGraph(data.questionData);
      isLastQuestion(data);
    });

    socket.on(SocketEvent.ENTRY_ANSWER, () => {
      socket.emit(SocketEvent.MANAGEMENT_CURRENT);
    });

    socket.emit(SocketEvent.MANAGEMENT_CURRENT);
  }, [])

  /**
   * create graph
   *
   * @param d question's data
   */
  const createGraph = (data) => {
    const parsedData = JSON.parse(data);

    if (parsedData.type === AggregateType.BAR_GRAPH) {
      // init data
      let barGraphData = {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [],
          borderWidth: 1
        }]
      }

      // create data for chart.js
      parsedData.selections.forEach(s => {
        // labels
        barGraphData.labels.push(s.selection);
        // data
        barGraphData.datasets[0].data.push(s.count ? s.count : 0);
        // bgcolor
        barGraphData.datasets[0].backgroundColor.push(s.color);
      });

      setPageContents(<BarGraphPage title={parsedData.title} data={barGraphData} />);
    }
  }

  /**
   * click the next button
   */
  const gotoNext = () => {
    socket.emit(SocketEvent.MANAGEMENT_NEXT);
  }

  /**
   * if it is the last question
   *
   * @param data
   */
  const isLastQuestion = (data) => {
    if (data.isLastQuestion) {
      setNext(false);
    }
  }

  return (
    <>
      {pageContents}
      {
        isNext &&
        <NextButton onClick={() => gotoNext()} />
      }
    </>
  )
};

export default Management;
