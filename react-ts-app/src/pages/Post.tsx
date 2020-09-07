import React, { useState } from "react";
import { createTest, createPost } from "./../api"


const Home: React.FC = () => {
  const [mealId, setMealID] = useState(0);
  const [message, setMessage] = useState("")
  const [res, setRes] = useState<any>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  // return (
  //   <div>
  //     <h1>Post Page</h1>
  //     <form onSubmit={onSubmit} />
  // return (
  //     <div  >
  //       <h1>Post Page</h1>
  //       <form onSubmit={onSubmit}>
  //         <div>
  //           <select >
  //             <option onSelect={() => setMealID(1)}>餃子</option>
  //             <option onSelect={() => setMealID(2)}>カレー</option>
  //           </select>
  //         </div>
  //         <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)} />
  //         <div>
  //           <button >投稿</button>
  //         </div>
  //       </form>
  //     </div>
  // )

  // 
  // {"cuisine": "cuisine", "recipe": "recipe"}

  const getMeal = () => {
    let temp_res = createTest();
    temp_res.then(item => setRes(item))
    console.log(temp_res)

  }

  return (
    <div>
      <button onClick={getMeal}>Test</button>
      {res && res.cuisine}
    </div>
  )
}

export default Home;