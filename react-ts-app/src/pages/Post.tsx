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
    <div>
      <h1>Post Page</h1>
      <input />
      <textarea />
      <button>投稿</button>
    </div>
  )
}

export default Home;