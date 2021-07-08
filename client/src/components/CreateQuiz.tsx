import React, { useState, useEffect } from 'react';
import Form from './QuestionForm';
import axios, { AxiosRequestConfig } from 'axios';

interface Quiz {
  title: string,
  subject: string,
  photoUrl: string,
  questions: Array<object>
}

const quizInitialState:Quiz = {
  title: '',
  subject: '',
  photoUrl: '',
  questions: [],
}

const CreateQuiz: React.FC = () => {
  const [count, setCount] = useState(1);
  const [questionList, setQuestionList] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState({});
  const [quizDetails, setQuizDetails] = useState({
    title: '',
    subject: '',
    photoUrl: '',
    questions: [],
  });

  useEffect(() => {
    createQuestion();
  }, [count])

  useEffect(() => {
    setQuizDetails((prevQuizDetails: any) => {return {...prevQuizDetails, questions: Object.values(quizQuestions)}});
  },[quizQuestions])

  const updateQuizDetails = (e: any) => {
    setQuizDetails((prevQuizDetails: any) => {return {...prevQuizDetails, [e.target.name]: e.target.value}})
  }

  const validateQuiz = (e: any) => {
    e.preventDefault();
    createQuiz();
  }

  const createQuiz = async () => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: '/api/quiz',
      data: quizDetails,
      headers: {
        'content-type': 'application/json'
      }
    }
    try {
      let { data } = await axios(config);
      // do something after form is submitted successfully
      console.log('id from created quiz: ', data);
    } catch(err) {
      console.error(err);
    } finally {
      setQuizDetails(quizInitialState);
    }
  }

  const createQuestion = () => {
    const question = (
      <div key={count}>
        <Form id={count} setQuizQuestions={setQuizQuestions}/>
      </div>
    )
    setQuestionList(prevQuestions => [...prevQuestions, question]);
  }

  return (
    <form onSubmit={validateQuiz}>
      <div>
        <label>Title
          <input type="text" name="title" value={quizDetails.title} onChange={updateQuizDetails}/>
        </label>
      </div>

      <div>
        <label>Subject
          <select name="subject" value={quizDetails.subject} onChange={updateQuizDetails}>
            <option value=""> None Selected </option>
            <option value="Math"> Math </option>
            <option value="Science"> Science </option>
            <option value="Social Studies"> Social Studies </option>
            <option value="English"> English </option>
          </select>
        </label>
      </div>

      <div>
        <label>Photo
          <input type="text" name="photoUrl" value={quizDetails.photoUrl} onChange={updateQuizDetails}/>
        </label>
      </div>

      {questionList}
      <div>
        <input type="button" value="Add a question" onClick={() => setCount(prevCount => prevCount + 1)}/>
      </div>
      <button type="submit">Create quiz</button>
    </form>
  )
}

export default CreateQuiz;