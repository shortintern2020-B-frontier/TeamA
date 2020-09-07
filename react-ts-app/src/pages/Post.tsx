import React, { useState } from "react";
import { createPost } from "./../api"
import { TextField, Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import EarnBadge from "./EarnBadge"


const Post: React.FC = () => {
  const [checked, setChecked] = useState<string[]>([]);
  const [img, setImg] = useState<any>();
  const [mealUrl, setMealUrl] = useState("")
  const [comment, setComment] = useState("")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let curPost = {
      meal_name1: checked[0] ? checked[0] : "",
      meal_name2: checked[1] ? checked[1] : "",
      meal_name3: checked[2] ? checked[2] : "",
      meal_name4: checked[3] ? checked[3] : "",
      meal_name5: checked[4] ? checked[4] : "",
      image: img,
      meal_url: mealUrl,
      comment: comment
    }
    let res = await createPost("jwt", curPost);
  }



  const handleCheck = (mealName: string) => {
    let newChecked;

    if (checked.indexOf(mealName) >= 0) {
      newChecked = checked.filter(item => item !== mealName)
    } else {
      newChecked = [...checked, mealName];
    }
    setChecked(newChecked);
  }

  const testProps = [{ mealName: "test", badgeLevel: 2 }];

  return (
    <div  >
      <EarnBadge earnedBadges={testProps} />
      {/* <h1>Post Page</h1>
      <form onSubmit={onSubmit}>
        <div>
          <FormControl required>
            <FormLabel>料理を選択してください（複数回答可）</FormLabel>
            <FormGroup row onChange={(e) => handleCheck((e.target as HTMLInputElement).value)} >
              <FormControlLabel label="カレー" value="カレー" control={<Checkbox />} />
              <FormControlLabel label="チャーハン" value="チャーハン" control={<Checkbox />} />
              <FormControlLabel label="餃子" value="餃子" control={<Checkbox />} />
              <FormControlLabel label="ビーフストロガノフ" value="ビーフストロガノフ" control={<Checkbox />} />
              <FormControlLabel label="味噌汁" value="味噌汁" control={<Checkbox />} />
            </FormGroup>
          </FormControl>
        </div>
        <TextField
          value={comment}
          onChange={e => setComment(e.target.value)}
          label="コメント"
          multiline
          rows={4}
          variant="outlined"
        />
        <TextField value={mealUrl} onChange={e => setMealUrl(e.target.value)} label="参考にしたレシピのURL（任意）" variant="outlined" />
        <div>
          画像ファイルを選択してください
          <input required type="file" onChange={e => {
            let file = e.target.files![0];
            setImg(file)
            // let reader: FileReader = new FileReader();
            // reader.readAsDataURL(file);
            // reader.onload = () => {
            //   setImg(reader.result);
            // };
          }} accept="image/*" />
        </div>
        <div>
          <button ><SendIcon /></button>
        </div>
      </form> */}
    </div >
  )







  // return (
  //   <div>
  //     <button onClick={getMeal}>Test</button>
  //     {res && res.cuisine}
  //   </div>
  // )
}

export default Post;