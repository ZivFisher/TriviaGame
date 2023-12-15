import axios from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface UserContextType {
    user: UserContextState;
    setUser: Dispatch<SetStateAction<UserContextState>>;
}

interface UserContextState {
    id: string;
    username: string;
    type: string;
    roles: string[];
    roleKeys: string[];
}

export const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
    const result = useContext(UserContext);
    if (!result) throw new Error("You forgot to put the PlayQuizProvider!");
    return result;
}

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userContextState, setUserContextState] = useState<UserContextState>({
        id: '',
        username: '',
        type: '',
        roles: [''],
        roleKeys: ['']
    })

    useEffect(() => {
        getUserByToken();
    }, [])

    const getUserByToken = async () => {
        try {
            const { data } = await axios('/auth/user');
            if (data) {
                setUserContextState({
                    id: data.id,
                    username: data.username,
                    type: data.type,
                    roles: data.roles,
                    roleKeys: data.roleKeys
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <UserContext.Provider value={{ user: userContextState, setUser: setUserContextState }}>
            {children}
        </UserContext.Provider>
    );
}