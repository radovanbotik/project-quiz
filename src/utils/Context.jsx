import React from "react";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const API_ENDPOINT = "https://opentdb.com/api.php?";
const URL = "";
const TEMP_URL =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
  art: 25,
};

const Context = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  //index number of question
  const [index, setIndex] = useState(0);
  //number of correct answers
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [preferences, setPreferences] = useState({
    size: 10,
    category: "sports",
    difficulty: "easy",
  });

  const fetchData = async url => {
    setIsLoading(true);
    setWaiting(false);
    const resp = await axios(url).catch(err => console.log(err));
    if (resp) {
      const {
        data: { results },
      } = resp;
      if (results.length > 0) {
        setQuestions(results);
        setIsLoading(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const nextQuestion = () => {
    setIndex(prev => {
      const index = prev + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  const checkAnswer = value => {
    if (value) {
      setCorrectAnswers(prev => prev + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setWaiting(true);
    setCorrectAnswers(0);
    setShowModal(false);
  };

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setPreferences(prev => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    const { size, category, difficulty } = preferences;
    const TEMP_URL = `https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple`;
    const URL = `${API_ENDPOINT}amount=${size}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchData(URL);
  };
  return (
    <AppContext.Provider
      value={{
        waiting,
        isLoading,
        questions,
        index,
        correctAnswers,
        error,
        showModal,
        nextQuestion,
        checkAnswer,
        closeModal,
        handleChange,
        handleSubmit,
        preferences,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { Context, useGlobalContext };
