import axios from 'axios';

import { ROOT_URL } from '../../config';
import { getAuthHeader } from '../../authMiddleware';

export function getStudentQuestions() {
  return axios.get(`${ROOT_URL}/api/question`);
}

export function addQuestion(question) {
  const formData = new FormData();
  formData.append('type', question.type);
  formData.append('title', question.title);
  formData.append('body', question.body);
  formData.append('questioner', question.questioner);
  if (question.postImg) {
    question.postImg.forEach(img => {
      formData.append('postImg', img);
    });
  }
  return axios.post(`${ROOT_URL}/api/question`, formData, getAuthHeader());
}