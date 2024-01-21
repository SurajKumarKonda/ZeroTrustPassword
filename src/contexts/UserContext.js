import { createContext } from "react";

export const UserContext = createContext({
    username: null,
    nickname: null,
    mother: null,
    father: null,
    sister: null,
    brother: null,
    spouse: null,
    dob: null,
})