import React, { useEffect, useState, useRef, useCallback } from 'react';
import { NextPage } from 'next';
import { io } from 'socket.io-client';

import { SocketEvent } from '../types/SocketEvent';

import TopPage from '../components/entry/TopPage';
import SelectionPage from '../components/entry/SelectionPage';


/**
 * [Page] entry
 */
const Entry: NextPage = () => {

  // socket.io
  const [socket, _] = useState(() => io());
  // page contents
  const [pageContents, setPageContents] = useState<JSX.Element>(
    <div></div>
  );
  // for radio/checkbox refs
  let refs = useRef(new Array());
  // current answer count
  let currentAnswerCount = 0;

  useEffect(() => {
    socket.on(SocketEvent.ENTRY_CURRENT, (data) => {
      displayPage(data);
    });

    socket.on(SocketEvent.MANAGEMENT_NEXT, (data) => {
      location.reload();
    })

    socket.emit(SocketEvent.ENTRY_CURRENT);
  }, [])

  /**
   * display page
   *
   * @param data
   */
  const displayPage = (data) => {
    if (data.currentQuestionNo === -1) {
      setPageContents(<TopPage title={data.questionData} />);
    } else {
      const d = JSON.parse(data.questionData);
      setPageContents(<SelectionPage data={d} refs={refs} onClick={() => answer()} />);
    }
  }

  /**
   * answer
   */
  const answer = () => {
    const answers = [];
    refs.current.forEach((i, idx) => {
      if (!i) return;
      if (i.checked) {
        answers.push(idx);
      }
    });

    if (answers.length === 0) {
      alert('Please select one or more.')
      return;
    }

    currentAnswerCount++;
    if (currentAnswerCount > 1) {
      alert('You have already answered. Please wait for the admin\'s operation.')
      return;
    }

    const sendingData = {
      answer: answers
    }
    socket.emit(SocketEvent.ENTRY_ANSWER, sendingData);

    alert('Thank you for answering !!')
  }

  return (
    <>
      {pageContents}
    </>
  )
}

export default Entry;
