import React, { useState } from "react";

const mockUserInfo = {
  post: [
    { post_id: 1, image_url: "https://images.unsplash.com/photo-1599335937498-90b82b84d603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" },
    { post_id: 2, image_url: "https://images.unsplash.com/photo-1599335937498-90b82b84d603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" }
  ],
  follower: 2,
  followees: 3,
  total_badge: 12,
  total_point: 34
}

interface Post {
  post_id: number
  image_url: string
}

interface State {
  post: Post[]
  follewers: number
  followees: number
  total_badge: number
  total_point: number
}

const OtherUser: React.FC = () => {
  const [userInfo, setUserInfo] = useState<State>()

  return (
    <>
      <h3>other user page</h3>
      <p>フォロー数：{mockUserInfo.followees}</p>
      <p>フォロワー数：{mockUserInfo.follower}</p>
      <p>トータルバッチ：{mockUserInfo.total_badge}</p>
      <p>トータルポイント：{mockUserInfo.total_point}</p>
      {mockUserInfo.post.map((p) => {
        return (
          <img src={p.image_url} alt="icon"></img>
        )
      })}
    </>
  )
}

export default OtherUser;