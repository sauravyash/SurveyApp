import React, { ReactNode, createContext, useEffect, useReducer } from 'react';

interface AnswerData {
  // Define the properties of the data object
  collect_data: boolean;
  data: any;
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
      return { ...action.payload };
    // Add your action handlers here
    case 'set_collect_data':
      return { ...state, collect_data: action.payload };

    case 'add_answer':
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.questionNumber]: action.payload.answer
        }
      };

    case 'remove_answer':
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.questionNumber]: null
        }
      };

    case 'set_large_text_mode':
      return { ...state, largeTextMode: action.payload };

    default:
      return state;
  }
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

  useEffect(() => {
    storeInSessionStorage(state);
  }, [state]);

  return (
    <AnswerDataContext.Provider value={{ state, dispatch }}>
      {children}
    </AnswerDataContext.Provider>
  );
};

export { AnswerDataContext, AnswerDataProvider, useAnswerData };
