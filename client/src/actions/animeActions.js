// animeActions.js
export const SET_ANIMES = 'SET_ANIMES';

export const setAnimes = (animes) => ({
  type: SET_ANIMES,
  payload: animes,
});