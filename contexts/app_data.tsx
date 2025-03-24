import React, {
  useContext,
  createContext,
  type PropsWithChildren,
  useReducer,
} from 'react';
import { job_posting_examples } from '@/constants/job_posting_example';

const AppDataContext = createContext<any>({});

export function useAppData() {
  const value = useContext(AppDataContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useAppData must be wrapped in a <AppDataProvider />');
    }
  }

  return value;
}


function handleLike(
  state: Set<number>,
  action: { type: 'like' | 'unlike', payload: number }
): Set<number> {
  switch (action.type) {
    case 'like':
      state.add(action.payload);
      return new Set(state);
    case 'unlike':
      state.delete(action.payload);
      return new Set(state);
    default:
      return state;
  }
}

export function AppDataProvider({ children }: PropsWithChildren) {
  const data = job_posting_examples;
  const [liked, setLiked] = useReducer(
    handleLike,
    new Set<number>()
  )

  function handlePressLike(
    jobId: number,
    // Optional callback
    cb?: () => void
  ) {
    if (liked.has(jobId)) {
      setLiked({ type: 'unlike', payload: jobId });
    } else {
      setLiked({ type: 'like', payload: jobId });

      if (cb) {
        cb();
      }
    }
  }

  return (
    <AppDataContext.Provider value={{
      data,
      liked,
      handlePressLike,
    }}>
      {children}
    </AppDataContext.Provider>
  );
}