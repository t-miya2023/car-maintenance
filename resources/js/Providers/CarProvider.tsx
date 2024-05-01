import { createContext } from "react";

export const CarContext = createContext({});

type Props = {
    children:React.ReactNode;
    cars: any[];
}


export const CarProvider = (props:Props) => {
    const { children, cars } = props;
    return(
        <CarContext.Provider value={{ cars }}> 
            { children }
        </CarContext.Provider>
    )
}