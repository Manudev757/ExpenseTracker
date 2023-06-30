import { useState } from 'react';

type userType = {
 name : string
}
export const State = () => {
   const [name,setName] = useState<userType | null>(null)


   const Login = ()=>{
    setName({
        name : "Manudev"
    })
   }
   const Logout = ()=>{
    setName(null)
   }
  return (
    <div>
        <h3>Welcome {name?.name}</h3>
        <button onClick={Login}>Login</button>
        <button onClick={Logout}>Logout</button>
    </div>
  )
}
