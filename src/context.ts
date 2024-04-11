import {createContext} from 'react';

type FileContextType = {
    data: (number | null)[][];
    setData: React.Dispatch<React.SetStateAction<(number | null)[][]>>;
};

export const FileContext = createContext<FileContextType | undefined>(undefined);