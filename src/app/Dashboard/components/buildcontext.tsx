"use client"
import { User } from 'firebase/auth';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

export interface Product {
    id: string | number;
    image: string;
    price: number;
    name: string;
    desc: string;
    type: string;
}

export interface BuilderContextType {
    selectp: Product[];
    setSelectP: Dispatch<SetStateAction<Product[]>>;
    ispaid: boolean;
    paymentSucess: () => void;
    loggedin: boolean,
    setLoggedin: Dispatch<SetStateAction<boolean>>
    isopen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
    activeform: string,
    setActiveform: Dispatch<SetStateAction<string>>
    setUser: Dispatch<SetStateAction<null | User>>
    user: User | null
}

export const BuilderContext = createContext<BuilderContextType | undefined>(undefined)

const BuildContext = ({ children }: { children: ReactNode }) => {
    const [selectp, setSelectP] = useState<Product[]>([])
    const [ispaid, setIdPaid] = useState(false)
    const paymentSucess = () => setIdPaid(true)

    const [loggedin, setLoggedin] = useState(false)
    const [activeform, setActiveform] = useState("login")
    const [isopen, setIsOpen] = useState(false)

    const [user, setUser] = useState<null | User>(null)

    return (
        <BuilderContext.Provider value={{ user, setUser, isopen, setIsOpen, activeform, setActiveform, loggedin, setLoggedin, selectp, setSelectP, ispaid, paymentSucess }}>
            {children}
        </BuilderContext.Provider>
    )
}

export default BuildContext