import React, { useEffect } from "react";
import { getTimeline } from "../api"
import { asyncLocalStorage } from "../utils"


// results: [{post_id, user_id, image_url, create_at}, {post_id, user_id, image_url, create_at}, …]
interface Post {

}


const Timeline: React.FC = () => {
  useEffect(() => {
    // const token = asyncLocalStorage.getItem("access_token")
    const f = async () => {
      let token = "";
      await asyncLocalStorage.getItem("access_token")
        .then(res => { token = res })
        .catch(err => console.log(err))
      await getTimeline(token)
        .then(res => {
          // setBadgeList(r.results)
          console.log(res.results)
        })
        .catch((err) => {
          // setErrorMessage(err.message);
        });
    };
    f()
  }, [])
  return (
    <>
      <h3>Timeline</h3>
      <p>aa</p>
    </>
  )
}

export default Timeline;