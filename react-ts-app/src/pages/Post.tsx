import React, { useState } from "react";
import { createTest, createPost } from "./../api"
import { Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel } from '@material-ui/core';

// created by Tokiya Ohmura
const Post: React.FC = () => {

  const [res, setRes] = useState<any>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const getMeal = () => {
    let temp_res = createTest();
    temp_res.then(item => setRes(item))
    console.log(temp_res)
  }



  return (
    <div  >
      <h1>Post Page</h1>
      <form onSubmit={onSubmit}>
        <FormControl>
          <FormLabel>フォーム</FormLabel>
          <FormGroup>
            <FormControlLabel label="カレー" control={<Checkbox />} />
          </FormGroup>
        </FormControl>

        <textarea />
        <div>
          <button >投稿</button>
        </div>
      </form>
    </div>
  )





  // return (
  //   <div>
  //     <button onClick={getMeal}>Test</button>
  //     {res && res.cuisine}
  //   </div>
  // )
}

export default Post;