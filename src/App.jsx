import "./App.css";
import { useGlobalContext } from "./utils/Context";
import Form from "./components/Form";
import Loading from "./components/Loading";
import Modal from "./components/Modal";

function App() {
  const {
    waiting,
    isLoading,
    questions,
    index,
    correctAnswers,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();

  if (waiting) {
    return <Form />;
  }
  if (isLoading) {
    return <Loading />;
  }

  const { question, correct_answer, incorrect_answers } = questions[index];
  // const answers = [correct_answer, ...incorrect_answers];

  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }
  return (
    <div className="App">
      <Modal />
      <section className="quiz">
        <div className="correct-asnwers" style={{ color: "blue" }}>
          correct answers: {correctAnswers}/{questions.length - 1}
        </div>
        <article className="control">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="answers">
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  dangerouslySetInnerHTML={{ __html: answer }}
                  onClick={() => checkAnswer(correct_answer === answer)}
                />
              );
            })}
          </div>
        </article>
        <button
          style={{ backgroundColor: "gold", margin: "2ex" }}
          onClick={nextQuestion}
        >
          next question
        </button>
      </section>
    </div>
  );
}

export default App;
