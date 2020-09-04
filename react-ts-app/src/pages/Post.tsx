import React, { useState } from "react";

const Home: React.FC = () => {

  const [values, setValues] = useState({
    meal_name1: "",
    meal_name2: "",
    meal_name3: "",
    meal_name4: "",
    meal_name5: "",
    post_comment: "",
  });

  return (
    <div  >
      <h1>Post Page</h1>
      <form>
        <div>
          <select >
            <option>餃子</option>
            <option>カレー</option>
          </select>
        </div>
        <textarea />
        <div>
          <button>投稿</button>
        </div>
      </form>
    </div>
  )
}

export default Home;