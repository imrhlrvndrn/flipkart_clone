import { createContext, useContext, useReducer } from 'react';
import { initial_state, reducers } from './data.reducer';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    return (
        <DataContext.Provider value={useReducer(reducers, initial_state)}>
            {children}
        </DataContext.Provider>
    );
};
