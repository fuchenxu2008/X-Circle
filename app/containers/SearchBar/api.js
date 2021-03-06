import axios from 'axios';

import { ROOT_URL } from '../../config';
import { getAuthHeader } from '../../authMiddleware';

export function searchQuestion(searchPhrase) {
  return axios.get(
    `${ROOT_URL}/api/search?type=${encodeURIComponent(searchPhrase.type)}&major=${encodeURIComponent(
      searchPhrase.major
    )}&keyword=${encodeURIComponent(searchPhrase.keyword)}`,
    getAuthHeader()
  );
}
