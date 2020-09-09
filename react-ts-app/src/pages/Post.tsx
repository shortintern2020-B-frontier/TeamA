import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Modal from '@material-ui/core/Modal';
import { createPost, getMealName } from "./../api"
import { asyncLocalStorage } from "../utils"
import EarnBadge from "./EarnBadge"
import ErrorMessage from './../components/ErrorMessage'

interface BadgeType {
  meal_name: string;
  badge_level: number;
}

console.log(getMealName())

const Post: React.FC = () => {
  const [checked, setChecked] = useState<string[]>([]);
  const [img, setImg] = useState<any>();
  const [mealUrl, setMealUrl] = useState("")
  const [comment, setComment] = useState("")
  const [errorMessage, setErrorMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [badges, setBadges] = useState<BadgeType[]>();
  const history = useHistory()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const curPost = {
      meal_name1: checked[0] ? checked[0] : "",
      meal_name2: checked[1] ? checked[1] : "",
      meal_name3: checked[2] ? checked[2] : "",
      meal_name4: checked[3] ? checked[3] : "",
      meal_name5: checked[4] ? checked[4] : "",
      image: img,
      meal_url: mealUrl,
      post_comment: comment
    }

    const jwtToken: any = await asyncLocalStorage.getItem("access_token").catch(err => console.log(err))
    await createPost(jwtToken, curPost)
      .then(res => {
        const badges = res.get_badges;
        console.log(badges)
        if (badges === []) {
          history.push("/")
        } else {
          setBadges(badges);
          setIsOpen(true)
        }
      })
      .catch(err => { setErrorMessage(err.message) })
  }



  const handleCheck = (meal_name: string) => {
    let newChecked;

    if (checked.indexOf(meal_name) >= 0) {
      newChecked = checked.filter(item => item !== meal_name)
    } else {
      newChecked = [...checked, meal_name];
    }
    setChecked(newChecked);
  }

  const testProps = [{ meal_name: "test", badge_level: 2 }];


  return (
    <div  >
      <ErrorMessage message={errorMessage} />
      <h3>Post Page</h3>
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
          <input type="file" onChange={e => {
            let file = e.target.files![0];
            let reader: FileReader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              setImg(reader.result);
            };
          }} accept="image/*" />
        </div>
        <div>
          <button ><SendIcon /></button>
        </div>
      </form>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <EarnBadge earnedBadges={badges} />
      </Modal>
      <button onClick={() => setIsOpen(!isOpen)}>a</button>
    </div >
  )
}

export default Post;