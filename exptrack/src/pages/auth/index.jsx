import {auth, provider} from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";    
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./style.css"
export const Auth =()=>{
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();
  const signInwithGoogle=async()=>{
      try {
           
            const results = await signInWithPopup(auth, provider);
            console.log("User signed in:", results);
            const authInfo = {
              userID: results.user.uid,
              name:results.user.displayName,
              profilephoto: results.user.photoURL,
              isAuth:true,
            }
            localStorage.setItem("auth", JSON.stringify(authInfo));
            navigate("/expense-tracker");
          } catch (error) {
            console.error("Google Sign-In Error:", error.message);
          }
        
      }


      if (isAuth) {
        return <Navigate to="/expense-tracker" />;
      }


     return (  
      <div className="login-page"> 
            <p> Signin with google </p>
             <button className="Login with goglee" onClick={signInwithGoogle}>
               {""}
               Signin with Google
            </button>
      </div>
     );
};
