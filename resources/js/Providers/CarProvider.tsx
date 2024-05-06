import { Dispatch, SetStateAction, createContext, useState } from "react";

interface CarContextType {
    selectCar: number | null; // idまたは初期値null
    setSelectCar: Dispatch<SetStateAction<number | null>> 
    }

export const CarContext = createContext<CarContextType>({} as CarContextType);

type Props = {
    children:React.ReactNode;
}

export const CarProvider = (props:Props) => {
    const { children } = props;

    const [selectCar, setSelectCar ] = useState<number | null>(null);

    return(
        <CarContext.Provider value={{ selectCar, setSelectCar }}> 
            { children }
        </CarContext.Provider>
    )
}