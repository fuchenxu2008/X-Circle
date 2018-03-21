import { createSelector } from 'reselect';

/**
 * Direct selector to the homePage state domain
 */
const selectHomePageDomain = state => state.get('homePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = createSelector(
  selectHomePageDomain,
  state => state.toJS()
);

export default makeSelectHomePage;
export {
  selectHomePageDomain,
};