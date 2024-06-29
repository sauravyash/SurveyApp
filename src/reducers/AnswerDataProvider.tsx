import React, { ReactNode, createContext, useEffect, useReducer } from 'react';

interface AnswerData {
  // Define the properties of the data object
  collect_data: boolean;
  data: any;
  largeTextMode: boolean;
}

const storeInSessionStorage = (state: AnswerData) => {
  sessionStorage.setItem('answerData', JSON.stringify(state));
}

// Define the initial state
const initialState = {
  // Add your initial state properties here
  collect_data: true,
  data: {},
  largeTextMode: false
};

// Define the reducer function
const reducer = (state: AnswerData, action: any) => {
  switch (action.type) {
    case "set_data":
      state = { ...action.payload };
      break;
      
    case 'set_collect_data':
      state = { ...state, collect_data: action.payload };
      break;

    case 'add_answer':
      state = {
        ...state,
        data: {
          ...state.data,
          [action.payload.questionNumber]: action.payload.answer
        }
      };
      break;

    case 'remove_answer':
      state = {
        ...state,
        data: {
          ...state.data,
          [action.payload.questionNumber]: null
        }
      };
      break;

    case 'set_large_text_mode':
      state = { ...state, largeTextMode: action.payload };
      break;

    default:
      break;
  }
  
  storeInSessionStorage(state);
  return state;
};

// Create the context
const AnswerDataContext = createContext<any>(initialState);
const useAnswerData = () => React.useContext(AnswerDataContext);

interface AnswerDataProviderProps {
  children: ReactNode;
}

// Create the context provider component
const AnswerDataProvider: React.FC<AnswerDataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const storedData = sessionStorage.getItem('answerData');
    if (storedData) {
      dispatch({ type: 'set_data', payload: JSON.parse(storedData) });
    }
  }, []);

  return (
    <AnswerDataContext.Provider value={{ state, dispatch }}>
      {children}
    </AnswerDataContext.Provider>
  );
};

export { AnswerDataContext, AnswerDataProvider, useAnswerData };
