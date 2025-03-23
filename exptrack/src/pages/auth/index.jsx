import {auth, provider} from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";     
export const Auth =()=>{

const signInwithGoogle=async()=>{
      const results = await signInWithPopup(auth , provider)
      localStorage.setItem("auth", JSON.stringify({ userID: results.user.uid }))
};



     return <div className="login-page"> 
      <p> Signin with google </p>
      <button className="Login with goglee" onClick={signInwithGoogle}>Signin with Google</button>
      </div>;
};
