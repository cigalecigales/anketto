import express from 'express';
const http = require('http');
const socketio = require('socket.io');
const next = require('next');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();


// server port
let port = 3000;

// socket all events
enum EventType {
  CONNECTION          = 'connection',
  MANAGEMENT_CURRENT  = 'management-current',
  MANAGEMENT_NEXT     = 'management-next',
  MANAGEMENT_RECEIVED = 'management-received',
  ENTRY_CURRENT       = 'entry-current',
  ENTRY_NEXT          = 'entry-next',
  ENTRY_ANSWER        = 'entry-answer'
}

// file path
const JSON_PATH = './src/data/data.json';
// default question's number
const DEFULT_QUESTION_NUMBER = -1;
// current question's number
let currentQuestionNo = DEFULT_QUESTION_NUMBER;


/**
 * load data from a json file
 */
const loadData = () => {
  const json = fs.readFileSync(JSON_PATH);
  const data = JSON.parse(json.toString());

  return data;
}
const questionsData = loadData();


/**
 * Scoket.io process
 */
io.on(EventType.CONNECTION, (socket) => {

  /**
   * get current question's data
   */
  const getCurrentQuestionData = () => {
    if (currentQuestionNo === DEFULT_QUESTION_NUMBER) {
      // if top page
      return questionsData.title;
    } else {
      // other
      return JSON.stringify({...questionsData.questions[currentQuestionNo]});
    }
  }

  /**
   * if current question is the last
   */
  const isLastQuestion = () => {
    // question's count
    const questionsTotalCount = questionsData.questions.length;
    return !(currentQuestionNo + 1 < questionsTotalCount);
  }

  /**
   * [Management] get current question's data
   */
  socket.on(EventType.MANAGEMENT_CURRENT, () => {

    // current question's data
    const data = getCurrentQuestionData();

    socket.emit(EventType.MANAGEMENT_CURRENT, {
      currentQuestionNo: currentQuestionNo,
      isLastQuestion: isLastQuestion(),
      questionData: data
    });
  });

  /**
   * [Management] get next question's data
   */
  socket.on(EventType.MANAGEMENT_NEXT, () => {

    if (!isLastQuestion()) {
      // +1 if current question's number isn't the last
      currentQuestionNo++;
    }

    // current question's data
    const data = getCurrentQuestionData();

    io.sockets.emit(EventType.MANAGEMENT_NEXT, {
      currentQuestionNo: currentQuestionNo,
      isLastQuestion: isLastQuestion(),
      questionData: data
    });
  });

  /**
   * [Entry] current question's data
   */
  socket.on(EventType.ENTRY_CURRENT, () => {

    // current question's data
    const data = getCurrentQuestionData();

    socket.emit(EventType.ENTRY_CURRENT, {
      currentQuestionNo: currentQuestionNo,
      isLastQuestion: isLastQuestion(),
      questionData: data
    });
  });

  /**
   * [Entry] answer question
   *
   * @param data answer: ex [0, 1, 2]
   */
  socket.on(EventType.ENTRY_ANSWER, (data) => {

    if (currentQuestionNo === DEFULT_QUESTION_NUMBER) {
      return;
    }

    // current question's data
    const currentQuestion = questionsData.questions[currentQuestionNo];

    // add answer's count
    currentQuestion.selections.forEach((s, sIdx) => {
        data.answer.forEach(answer => {
          if (answer === sIdx) {
            if (s.count) {
              s.count++;
            } else {
              s.count = 1;
            }
          }
        });
    });

    io.sockets.emit(EventType.ENTRY_ANSWER);
  });
});


nextApp.prepare().then(() => {
  app.get('*', (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
