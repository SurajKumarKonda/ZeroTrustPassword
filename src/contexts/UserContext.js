import { createContext } from "react";

export const UserContext = createContext({
    username: null,
    nickname: null,
    mother: null,
    father: null
})