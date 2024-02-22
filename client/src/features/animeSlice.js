// animeReducer.js
const initialState = {
  animes: [],
};

const animeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ANIMES':
      return {
        ...state,
        animes: action.payload,
      };
    default:
      return state;
  }
};

export default animeReducer;
