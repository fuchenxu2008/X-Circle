/*
 *
 * QuestionDetail actions
 *
 */

import {
  GET_QUESTION,
  DELETE_QUESTION,
  CLEAR_DETAIL_PAGE,
  ANSWER_QUESTION,
  DELETE_ANSWER,
  PICK_ANSWER,
} from './constants';
import * as api from './api';

export function getQuestion(id) {
  return {
    type: GET_QUESTION,
    payload: api.getQuestion(id),
  };
}

export function deleteQuestion(id) {
  return {
    type: DELETE_QUESTION,
    payload: api.deleteQuestion(id),
  };
}

export function clearDetailPage() {
  return {
    type: CLEAR_DETAIL_PAGE,
  };
}

export function answerQuestion(fields) {
  return {
    type: ANSWER_QUESTION,
    payload: api.answerQuestion(fields),
  };
}

export function deleteAnswer(id) {
  return {
    type: DELETE_ANSWER,
    payload: api.deleteAnswer(id),
  };
}

export function pickAnswer(questionId, answerId) {
  return {
    type: PICK_ANSWER,
    payload: api.pickAnswer(questionId, answerId),
  };
}
