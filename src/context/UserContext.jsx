import { createContext, useEffect, useState } from "react";

export let UserContext= createContext()
export default function UserContextProvider(props){
    const [userLogin, setuserLogin] = useState(null)

    useEffect(()=>{
        if(localStorage.getItem('userToken')!=null){
            setuserLogin(localStorage.getItem('userToken'))
        }

    }, [])

    return <UserContext.Provider value={{userLogin, setuserLogin}}>
        {/* app */}
        {props.children}
    </UserContext.Provider>
}

