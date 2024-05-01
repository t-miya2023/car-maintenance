import { Dispatch, SetStateAction, createContext, useState } from "react";

interface CarContextType {
    selectCar: string; // または適切な型
    setSelectCar: Dispatch<SetStateAction<string>> // または適切な型
  }

export const CarContext = createContext<CarContextType>({} as CarContextType);

type Props = {
    children:React.ReactNode;
}

export const CarProvider = (props:Props) => {
    const { children } = props;

    const [selectCar, setSelectCar ] = useState('');

    return(
        <CarContext.Provider value={{ selectCar, setSelectCar }}> 
            { children }
        </CarContext.Provider>
    )
}