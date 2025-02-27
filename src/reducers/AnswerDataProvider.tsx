import React, { ReactNode, createContext, useEffect, useReducer } from 'react';
import { sampleData } from './sampleData';

const USE_TEST_DATA = false;

export interface AnswerData {
  // Define the properties of the data object
  collect_data: "yes" | "no" | null;
  data: any;
  session_data?: any;
  fontSize: number;
  user: any;
  current_question: number;
}

export const cleanAnswerData = (data: any) : any => {
  for (const key in data) {
    if (!data[key]) {
      delete data[key];
    }
    if (data[key] instanceof Set) {
      // console.log('converting set to array', data[key]);
      if (!!(data[key] as any)?.currentKey) {
        data[key] = (data[key] as any).currentKey;
      } else if (data[key].size > 1) {
        data[key] = Array.from(data[key]);
      } else {
        data[key] = (data[key] as any).values().next().value;
      }
    } else if (!JSON.stringify(data[key])) {
      delete data[key];
    } else {
      data[key] = data[key];
      // console.log('storing data', data[key]);
    }
  }
  return data;
}

const storeInSessionStorage = (state: AnswerData) => {
  const data = { ...cleanAnswerData(state.data) };

  const cleanedState = { ...state, data };
  // console.log('storing in session storage', cleanedState, state);
  
  sessionStorage.setItem('answerData', JSON.stringify(cleanedState));
}

// Define the initial state
const initialState: AnswerData = USE_TEST_DATA ? sampleData : {
  collect_data: null,
  data: {},
  fontSize: 16,
  user: {},
  current_question: 0
};

// Define the reducer function
const reducer = (state: AnswerData, action: any) => {
  switch (action.type) {
    case "set_data":
      state = { ...action.payload };
      console.log('setting data', state);
      
      break;

    case "set_local_data":
      state = { ...action.payload, session_data: action.payload };
      break;

    case 'set_collect_data':
      state = { ...state, collect_data: action.payload };
      break;

    case 'add_answer':
      if (action.payload.answer === null) {
        console.error(`Adding Answer ${action.payload.questionNumber} is null`);
      }
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

    case 'set_font_size':
      state = { ...state, fontSize: action.payload };
      break;

    case 'set_user_data':
      state = {
        ...state,
        user: action.payload
      };
      break;

    case 'set_current_question':
      state = { ...state, current_question: action.payload };
      break;

    case 'restore_session_data':
      state = { ...state.session_data };
      delete state.session_data;
      break;

    case 'remove_session_data':
      sessionStorage.removeItem('answerData');
      state = initialState;
      break;

    default:
      break;
  }

  storeInSessionStorage(state);
  return state;
};

// Create the context
const AnswerDataContext = createContext<any>(initialState);
const useAnswerData: () => {
  state: AnswerData, 
  dispatch: (data: {type: string, payload?: any}) => void
} = () => React.useContext(AnswerDataContext);

interface AnswerDataProviderProps {
  children: ReactNode;
}

// Create the context provider component
const AnswerDataProvider: React.FC<AnswerDataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const storedData = sessionStorage.getItem('answerData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData && parsedData["data"]) {
        dispatch({ type: 'set_local_data', payload: parsedData });
      }
    }
  }, []);

  return (
    <AnswerDataContext.Provider value={{ state, dispatch }}>
      {children}
    </AnswerDataContext.Provider>
  );
};

export { AnswerDataContext, AnswerDataProvider, useAnswerData };
