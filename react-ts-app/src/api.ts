// Kudo
// Kajiura -> getFolloweeTotalBadgeRanking, getTotalPointRanking, getFolloweeTotalPointRanking, getMonthlyPointRanking, getFolloweeMonthlyPointRanking, getWeeklyMealRanking

const baseUrl = `http://34.122.26.70:5000`

const toJson = async (res: Response) => {
  if (res.status === 404) {
    throw new Error('Not Found');
  }
  if (res.status >= 500) {
    throw new Error("Internal Server Error")
  }
  if (res.status === 401) {
    throw new Error("Unauthorized")
  }
  // no-cors: type opaque
  // if (res.status === 0) {
  //   return { result: [] }
  // }
  const js = await res.json();
  if (res.ok) {
    return js;
  } else {
    throw new Error(js.message);
  }
};

export const testToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTk1NTQwMTYsIm5iZiI6MTU5OTU1NDAxNiwianRpIjoiY2I3N2EwZTYtNjQxZS00ZGY5LWJkOTctZGJiMzAzMGQ5YTVlIiwiaWRlbnRpdHkiOiJhLmNvbSIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.cSXMFthBXW_JiUQv8N_aOJblBHY50FLztfRfbiqa0G4'
// test account
// password: hoge, email: a.com

// ping test
export const test = async () => {
  const resp = await fetch(`${baseUrl}/test`, {
    method: "GET",
  });
  return await toJson(resp);
};

export const testPost = async () => {
  const resp = await fetch(`${baseUrl}/test-post`, {
    method: "POST",
    headers: new Headers({
      'Content-Type': "application/json",
    }),
    body: JSON.stringify({ name: "kudo" }),
    credentials: 'same-origin'
  })
  return await toJson(resp);
};

export const signup = async <T>(body: T) => {
  const resp = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: 'same-origin'
  });
  return await toJson(resp);
}

export const login = async <T>(body: T) => {
  const resp = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: 'same-origin'
  })
  return await toJson(resp);
}

export const getTimeline = async (jwtToken: string) => {
  const resp = await fetch(`${baseUrl}/timeline`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    }),
    credentials: 'same-origin'
  });
  return await toJson(resp);
}

export const getMyUserInfo = async (jwtToken: string) => {
  const resp = await fetch(`${baseUrl}/mypage`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    }),
    credentials: 'same-origin'
  });
  return await toJson(resp);
}

export const getMyRelation = async (jwtToken: string) => {
  const resp = await fetch(`${baseUrl}/relation`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    }),
    credentials: 'same-origin'
  });
  return await toJson(resp);
}

export const getOtherRelation = async (jwtToken: string, user_id: string) => {
  const resp = await fetch(`${baseUrl}/${user_id}/relation`, {
    method: "GET",
    // credentials: 'same-origin'
  });
  return await toJson(resp);
}

export const createPost = async <T>(jwtToken: string, body: T) => {
  const resp = await fetch(`${baseUrl}/post`, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: 'same-origin',
  });

  return await toJson(resp);
};

export const getMealName = async () => {
  const resp = await fetch(`${baseUrl}/post`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'same-origin',
  });
  return await toJson(resp);
}

export const getTotalBadgeRanking = async (jwtToken: string) => {
  const resp = await fetch(`${baseUrl}/total-badge-ranking`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': "application/json",
    }),
    credentials: 'same-origin'
  });
  return await toJson(resp);
}

export const getFolloweeTotalBadgeRanking = async (jwtToken: string) => {
  const resp = await fetch(`${baseUrl}/followee-total-badge-ranking`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': "application/json",
    }),
    credentials: 'same-origin'
  });
  return await toJson(resp);
}

export const getTotalPointRanking = async (jwtToken: string) => {
  const resp = await fetch(`${baseUrl}/total-point-ranking`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': "application/json",
    }),
    credentials: 'same-origin'
  });
  return await toJson(resp);
}

export const getFolloweeTotalPointRanking = async (jwtToken: string) => {
  const resp = await fetch(`${baseUrl}/followee-total-point-ranking`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': "application/json",
    }),
    credentials: 'same-origin'
  });
  return await toJson(resp);
}

export const getMonthlyPointRanking = async (jwtToken: string) => {
  const resp = await fetch(`${baseUrl}/monthly-point-ranking`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': "application/json",
    }),
    credentials: 'same-origin'
  });
  return await toJson(resp);
}

export const getFolloweeMonthlyPointRanking = async (jwtToken: string) => {
  const resp = await fetch(`${baseUrl}/followee-monthly-point-ranking`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': "application/json",
    }),
    credentials: 'same-origin'
  });
  return await toJson(resp);
}

export const getTotalMealRanking = async (jwtToken: string) => {
  const resp = await fetch(`${baseUrl}/meal-ranking`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': "application/json",
    }),
    credentials: 'same-origin'
  });
  return await toJson(resp);
}

export const getWeeklyMealRanking = async (jwtToken: string) => {
  const resp = await fetch(`${baseUrl}/weekly-meal-ranking`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': "application/json",
    }),
    credentials: 'same-origin'
  });
  return await toJson(resp);
}

export const getMyStatus = async (jwtToken: string) => {
  const resp = await fetch(`${baseUrl}/badge-status`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    }),
    credentials: 'same-origin'
  });
  return await toJson(resp);
}

export const getOtherPage = async <T>(jwtToken: string, user_id: string) => {
  const resp = await fetch(`${baseUrl}/${user_id}/mypage`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    }),
    credentials: 'same-origin',
  });
  return await toJson(resp);
}

export const getOtherStatus = async <T>(jwtToken: string, user_id: string) => {
  const resp = await fetch(`${baseUrl}/${user_id}/badge-status`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    }),
    credentials: 'same-origin',
  });
  return await toJson(resp);
}

export const mealSearch = async <T>(body: T) => {
  const resp = await fetch(`${baseUrl}/search/meal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: 'same-origin',
  });

  return await toJson(resp);
};

export const getMyGraph = async (jwtToken: string) => {
  const resp = await fetch(`${baseUrl}/graph_status`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    }),
    credentials: 'same-origin'
  });
  return await toJson(resp);
}

export const follow = async (jwtToken: string, user_id: string) => {
  const resp = await fetch(`${baseUrl}/${user_id}/follow`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    }),
    credentials: 'same-origin'
  });
  return await toJson(resp);
}

export const unfollow = async (jwtToken: string, user_id: string) => {
  const resp = await fetch(`${baseUrl}/${user_id}/unfollow`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    }),
    credentials: 'same-origin'
  });
  return await toJson(resp);
}