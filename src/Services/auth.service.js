import { logDOM } from "@testing-library/react";
import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://54.241.89.231/";
// const API_URL = "http://localhost:8080/";


const adminLogin = (adminLogin) => {
  return axios.post(API_URL + "api/admin/signin", adminLogin);
};

const getAdminUser = (getAdminUser) => {
  return axios.get(API_URL + "api/admin/users/?status=false", { headers: authHeader() })
}
const getAdminUserById = (getAdminUserById) => {
  return axios.get(API_URL + "api/admin/users/" + getAdminUserById, { headers: authHeader() })
}
const deleteAdminUser = (deleteAdminUser) => {
  return axios.delete(API_URL + "api/admin/users/" + deleteAdminUser, { headers: authHeader() });
};
const editAdminUser = (userId, editAdminUser) => {
  return axios.put(API_URL + "api/admin/users/" + userId, editAdminUser, { headers: authHeader() })
}

//month long course topic
const getTopicListing = (getTopicListing) => {
  return axios.post(API_URL + "api/topic/filter", getTopicListing, { headers: authHeader() })
}
const addTopic = (addTopic) => {
  return axios.post(API_URL + "api/topic", addTopic, { headers: authHeader() })
}
const getTopicById = (getTopicById) => {
  return axios.get(API_URL + "api/topic/" + getTopicById, { headers: authHeader() })
}
const deleteTopic = (deleteTopic) => {
  return axios.patch(API_URL + "api/topic", deleteTopic, {
    headers: authHeader(),
  })
}
const editTopic = (editTopic) => {
  return axios.put(API_URL + "api/topic/update", editTopic, { headers: authHeader() })
}
// const getModule = (getModule) => {
//   return axios.post(API_URL + "api/module/filter", getModule, { headers: authHeader() }) //with filter by course type
// }
const getModuleById = (getModuleById) => {
  return axios.get(API_URL + "api/module/" + getModuleById, { headers: authHeader() })
}

const getQuize = () => {
  return axios.get(API_URL + "api/topic/filter_quiz", { headers: authHeader() }) //with filter by course type
}
const getQuizeById = (getQuizeById) => {
  return axios.get(API_URL + "api/quiz/" + getQuizeById, { headers: authHeader() })
}

// mn start
const Createmodule = (Createmodule) => {
  return axios.post(API_URL + "api/module", Createmodule, {
    headers: authHeader(),
  })
}
const GetModuleListing = (data) => {
  return axios.post(API_URL + "api/module/filter", data, {
    headers: authHeader(),
  })
}

const Deletemodule = (Deletemodule) => {
  return axios.delete(API_URL + "api/module/" + Deletemodule, {
    headers: authHeader(),
  })
}
const EditModule = (EditModuleID, EditModuleData) => {
  return axios.put(API_URL + "api/module/" + EditModuleID, EditModuleData, {
    headers: authHeader(),
  })
}
const ViewModule = (ViewModule) => {
  return axios.get(API_URL + "api/module/" + ViewModule, {
    headers: authHeader(),
  })
}
const GetAllTopicsById = (GetAllTopicsById) => {
  return axios.get(API_URL + "api/topic/filter/" + GetAllTopicsById, {
    headers: authHeader(),
  })
}
// quize

const deleteQuizById = (deleteQuizById) => {
  return axios.delete(API_URL + "api/quiz/" + deleteQuizById + "/dlt", { headers: authHeader() });
};


const getQuestionByQuizId = (QuizID) => {
  return axios.get(API_URL + "api/quiz-question/" + QuizID + "/all", { headers: authHeader() });
}


const addQuizQuestion = (addQuizQuestion) => {
  return axios.post(API_URL + "api/quiz-question", addQuizQuestion, { headers: authHeader() });
} 

// -----------
const TopicReorders = (TopicReorders, data) => {
  return axios.put(API_URL + "api/topic/reorder" + TopicReorders, data, {
    headers: authHeader(),
  })
}
const CreateQuiz = (CreateQuiz, data) => {
  return axios.post(API_URL + "api/quiz" + CreateQuiz, data, {
    headers: authHeader(),
  })
}
const GetQuizListing = (GetQuizListing) => {
  return axios.get(API_URL + "api/quiz/all" + GetQuizListing, {
    headers: authHeader(),
  })
}
const GetQuizListingById = (GetQuizListingById) => {
  return axios.get(API_URL + "api/quiz/" + GetQuizListingById, {
    headers: authHeader(),
  })
} 
//end quiz

//induction list 
const getInductionList = () => {
  return axios.get(API_URL + "api/topic/filter_induction", { headers: authHeader() })
}
//techniques list 
const getTechniquesList = () => {
  return axios.get(API_URL + "api/topic/filter_technique", { headers: authHeader() })
}

//get Audio Suggestion
const getAudioSuggestion = () => {
  return axios.get(API_URL + "api/audioSuggesion/get", { headers: authHeader() })
}

const getAudioSuggesion = (data) =>{
  return axios.get(API_URL + "api/audioSuggesion/get",{headers: authHeader()})
}


const addAudioSuggesion = (data) =>{
  return axios.post(API_URL + "api/audioSuggesion/add", data ,{headers: authHeader()})
}


const editAudioSuggesion = (data) =>{
  return axios.put(API_URL + "api/audioSuggesion/update", data ,{headers: authHeader()})
}


const deleteAudioSuggesion = (data) =>{
  return axios.patch(API_URL + "api/audioSuggesion/delete/"+data,'',{headers: authHeader()})
}


const getAudioSuggesionById = (data) =>{
  return axios.get(API_URL + "api/audioSuggesion/get/"+data,{headers: authHeader()})
}

//image upload topic

const uploadTopicSign = (data) => {
  return axios.post(API_URL + "api/upload/compress_image/topic/" + localStorage.getItem('user_id'), data)
}
const ImgTopic = (ImgTopic) => {
  return axios.post(API_URL + "api/upload/image/topic/633151dfb5fefb20920d8fea", ImgTopic)
}

const ImgDeleteTopic = (ImgDeleteTopic) => {
  return axios.post(API_URL + "/api/upload/media-dlt/quiz", ImgDeleteTopic, { headers: { 'user_id': localStorage.getItem('user_id') } })
}

const mediaDeleteTopic = (data) => {
  return axios.post(API_URL + "api/upload/media-dlt/topic", data, { headers: { 'user_id': localStorage.getItem('user_id') } })
}

const uploadTopicMedia = (data) => {
  return axios.post(API_URL + "api/upload/image/topic/" + localStorage.getItem('user_id'), data, { headers: { 'user_id': localStorage.getItem('user_id') } })
}


const addFlashcard = (addFlashcard, data) => {
  return axios.post(API_URL + "api/flashCard" + addFlashcard, data, {
    headers: authHeader(),
  })
}

const GetFlashcardListing = () => {
  return axios.get(API_URL + "api/flashCard", {
    headers: authHeader(),
  })

}
const GetFlashcardByID = (GetFlashcardByID) => {
  console.log(GetFlashcardByID,"GetFlashcardByID")
  return axios.get(API_URL + "api/flashCard/" + GetFlashcardByID, {
    headers: authHeader(),
  })
}
const DeleteFlashcardByID = (DeleteFlashcardByID) => {
  return axios.delete(API_URL + "api/flashCard/" + DeleteFlashcardByID, {
    headers: authHeader(),
  })
}


const uploadQuestionOption = (uploadQuestionOption) => {
  return axios.post(API_URL + "api/upload/compress_image/profile/"+localStorage.getItem('user_id'), uploadQuestionOption,{ headers: authHeader() })
}

const deleteQuestionById = (deleteQuestionById) => {
  return axios.patch(API_URL +"api/quiz-question/"+deleteQuestionById+"/dlt",'',{ headers: authHeader() });
};

const getQuestionById = (getQuestionById) => {
  return axios.get(API_URL +"api/quiz-question/"+getQuestionById,{ headers: authHeader() });
};

const updateQuizQuestion = (updateQuizQuestion) =>{
  return axios.put(API_URL + "api/quiz-question/edit",updateQuizQuestion ,{ headers: authHeader() });
}

const updateQuizListingById = (data) => {
  return axios.put(API_URL + "api/quiz/edit", data ,{headers: authHeader()})
}



export default {
  adminLogin,
  getAdminUser,
  getAdminUserById,
  deleteAdminUser,
  editAdminUser,

  //month topic
  addTopic,
  getTopicListing,
  getTopicById,
  deleteTopic,
  editTopic,
  // getModule,
  getModuleById,

  //get Quize

  TopicReorders,
  CreateQuiz,
  GetQuizListing,
  GetQuizListingById,
  updateQuizListingById,

  getQuize,
  getQuizeById,
  deleteQuizById,
  getQuestionByQuizId,
  addQuizQuestion,
  uploadQuestionOption,

  //induction and techniques dropdown
  getInductionList,
  getTechniquesList,

  //get audio suggestion
  getAudioSuggestion,

  //images
  uploadTopicSign,
  ImgTopic,
  ImgDeleteTopic,

  uploadTopicMedia,
  mediaDeleteTopic,
  Createmodule,
  GetModuleListing,
  Deletemodule,
  EditModule,
  ViewModule,
  GetAllTopicsById,
  addFlashcard,
  GetFlashcardListing,
  GetFlashcardByID,
  DeleteFlashcardByID,  
  updateQuizQuestion, 
    
  getQuestionById,
  getAudioSuggesion,
  addAudioSuggesion,
  editAudioSuggesion,
  deleteAudioSuggesion,
  getAudioSuggesionById,
}