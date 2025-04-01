import { useState } from "react";
import {useAddTransaction} from "../../hooks/useAddTransaction"
import {useGetTransactions} from "../../hooks/useGetTransaction"
import {useGetUserInfo} from "../../hooks/useGetUserInfo"
import "./style.css"
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {
   const { addTransaction } = useAddTransaction();
   const {transactions, transactionTotals} = useGetTransactions()
    const {name, profilephoto} = useGetUserInfo();
    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactiontype, settransactiontype] = useState("expense");
    const { balance, income, expenses } = transactionTotals;


    const navigate = useNavigate();
    const onsubmit = (e) => {
      e.preventDefault();
      addTransaction({
        description,
        transactionAmount,
        transactiontype,
        });

        setDescription("");
        setTransactionAmount(0);


    }

    const signUserOut = async() => {
       try{
           await signOut(auth);
           localStorage.clear();
           navigate("/");
          alert("Sign out successfully")
       }
       catch(error){
        console.log("error signnign out");
        
       }


      
    }




  

    return (
        <>
<div>
    <div className="expense-tracker">
      <div className="container">
        <h1> {name}'s Expense Tracker</h1>
        <div className="balance">
          <h3>Your Current Balance :</h3>
          
          {balance >= 0 ? <h2> ${balance}</h2> : <h2> -${balance * -1}</h2>}
        </div>
        <div className="summary">
          <div className="income">
             <h4>Income </h4>
             <p>${income}</p>
          </div>
          <div className="expenses"> 
             <h4>Expenses</h4>
             <p>${expenses}</p>
          </div>
        </div>
      </div>
        <form className="add-transaction" onSubmit={onsubmit}>
          <input type="text" placeholder="Description" value={description}
              required  onChange={(e) => setDescription(e.target.value)}/>
         <input type="number" placeholder="Amount"  value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)} />
  
          <input type="radio" id="expense" value="expense" checked={transactiontype === "expense"}
              onChange={(e) => settransactiontype(e.target.value)} />
          <label htmlFor="expense">Expense</label>

          <input type="radio" id="income" value="income"  checked={transactiontype === "income"}
             onChange={(e) => settransactiontype(e.target.value)}/>
          <label htmlFor="income">Income</label>

          <button type="submit">Add</button>
        </form>

    </div> 
{profilephoto && (
  <div className="profile-photo"> 
    <img   src={profilephoto} alt={`${name}'s profile`} />
    <button className="sign-out-button" onClick={signUserOut}/>
  </div>
)}
<div className="transaction">
    <h3>Transaction</h3>
    <ul>
      {transactions.map(transactions => {
         const {description, transactionAmount,  transactiontype} = transactions;
          return (
            <li>
              <h4>{description}</h4>
              <p>
                ${transactionAmount}.{""}
              <label style={{
                      color: transactiontype === "expense" ? "red" : "green",
                    }}
                    >
                      {" "}
                      {transactiontype}{" "}

              </label>
              </p>
            </li>
          )
      })}
    </ul>
  </div>
    </div>
 </>
  );
}