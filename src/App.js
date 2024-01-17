import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import $ from "jquery";
import React, { useState, useEffect } from 'react'
import { useNavigate, Navigate } from "react-router-dom"
import Login from './Components/AdminLogin/Login'
import Dashboard from './Components/Dashboard/Index'
import Quiz from './Components/Quiz/Index'
import YearlyCourse from './Components/YearlyCourse/Index1'
import TopicInduction from './Components/TopicInduction/Index'
import Users from './Components/UserListing/Index'
import RequestedUsers from './Components/UserListing/RequestedUserList'
import Profile from './Components/AdminLogin/Profile';
import EditUser from './Components/UserListing/edit-user';
//month long topic
import Topic from './Components/Topic/Index';
import ViewTopic from './Components/Topic/view-topic';
import AddTopic from './Components/Topic/add-topic';
import EditTopic from './Components/Topic/editTopic';

//year long topic
import YearTopic from './Components/YearlyCourse/Index'
import AddYearTopic from './Components/YearlyCourse/add-YearTopic'
import EditYearTopic from './Components/YearlyCourse/edit-YearTopic'
import ViewYearTopic from './Components/YearlyCourse/view-YearTopic'

//audio suggestion
import AudioSuggession from './Components/AudioSuggesion/index'
import AddAudioSuggession from './Components/AudioSuggesion/add-audio-suggesion';
import EditAudioSuggession from './Components/AudioSuggesion/edit-audio-suggesion';

//quiz and questions
import Quizs from './Components/Quiz/Quizs';
import ViewQuiz from './Components/Quiz/ViewQuiz';
import AddQuestion from './Components/Quiz/AddQuestion';

import './css/style.css';
import Modules from './Components/MontlyCourse/Modules';
import ViewModule from './Components/MontlyCourse/ViewModule';
import EditModule from './Components/MontlyCourse/EditModule';

import FlashcardModule from './Components/Flashcard/FlashcardModule';
import AddFlashcard from './Components/Flashcard/AddFlashcard';
import ViewFlashcard from './Components/Flashcard/ViewFlashcard';
import EditFlashcard from './Components/Flashcard/EditFlashcard';

import EditQuestion from './Components/Quiz/EditQuestion';

function App() {
  const history = useNavigate();

  var loggedInUser = false;
  useEffect(() => {
    loggedInUser = localStorage.getItem("token");

  }, []);
  return (
    <>

      <Routes>
        <Route exact path='/' element={loggedInUser ? <Navigate to="/dashboard" /> : <Login />} />
        {/* <Route element={<SidebarLayout />} > */}

        <Route exact path='dashboard' element={<Dashboard />} />
        <Route exact path='profile' element={<Profile />} />
        <Route exact path='users' element={<Users />} />
        <Route exact path='requested-users' element={<RequestedUsers />} />
        <Route exact path='modules' element={<Modules />} />
        <Route exact path='view-module' element={<ViewModule />} />
        <Route exact path='edit-module' element={<EditModule />} />
        <Route exact path='edit-user' element={<EditUser />} />
        <Route exact path='topic' element={<Topic />} />
        <Route exact path='view-topic' element={<ViewTopic />} />
        <Route exact path='add-topic' element={<AddTopic />} />
        <Route exact path='edit-topic' element={<EditTopic />} />
        {/* year long course topic */}
        <Route exact path='year-topic' element={<YearTopic />} />
        <Route exact path='add-YearTopic' element={<AddYearTopic />} />
        <Route exact path='view-YearTopic' element={<ViewYearTopic />} />
        <Route exact path='edit-YearTopic' element={<EditYearTopic />} />
        {/* quize */}
        <Route exact path='/quiz/view' element={<ViewQuiz />} />
        <Route exact path='/add-question' element={<AddQuestion />} />
        <Route exact path='/quiz' element={<Quizs />} />

        {/* Audio suggestion */}
        <Route exact path='/audio-suggesion' element={<AudioSuggession />} />
        <Route exact path='/add-audio-suggesion' element={<AddAudioSuggession />} />
        <Route exact path='/edit-audio-suggesion' element={<EditAudioSuggession />} />

        <Route exact path='/quiz/:page' element={<Quiz />} />
        <Route exact path='/yearlycourse/:page' element={<YearlyCourse />} />
        <Route exact path='/TopicInduction/:page' element={<TopicInduction />} />
        {/* <Route exact path='/UserListing/:page' element={<UserListing />} /> */}
        <Route exact path='/edit-question' element={<EditQuestion />} />

        <Route exact path='/flashcard' element={<FlashcardModule />} />
        <Route exact path='/add-flashcard' element={<AddFlashcard />} />
        <Route exact path='/view-flashcard' element={<ViewFlashcard />} />
        <Route exact path='/edit-flashcard' element={<EditFlashcard />} />


        <Route path="*" element={<>404 Not Found</>} />

        {/* </Route> */}
      </Routes>


    </>
  );
}

export default App;
