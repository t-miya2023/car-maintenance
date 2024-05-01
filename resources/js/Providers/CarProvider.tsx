import { Cars } from "@/types/cars";
import { usePage } from "@inertiajs/react";
import { createContext } from "react";

export const CarContext = createContext({});

type Props = {
    children:React.ReactNode;
}

export const CarProvider = (props:Props) => {
    const { children } = props;
    const { cars } = usePage().props;
    return(
        <CarContext.Provider value={{ cars }}> 
            { children }
        </CarContext.Provider>
    )
}