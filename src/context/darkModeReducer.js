const darkModeReducer = (state, action) => {
  console.log('~ action', action);
  console.log('~ state', state);
  switch (action.type) {
    case 'LIGHT':
      localStorage.setItem('dark', false);
      return {
        ...state,
        darkMode: false,
      };
    case 'DArk':
      localStorage.setItem('dark', true);
      return {
        ...state,
        darkMode: true,
      };
    case 'TOGGLE_DARK_MODE':
      localStorage.getItem('dark') === 'true'
        ? localStorage.setItem('dark', false)
        : localStorage.setItem('dark', true);
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};

export default darkModeReducer;
