const baseUrl = `http://localhost:5000`

const toJson = async (res: Response) => {
  if (res.status === 404) {
    return { msg: "Not Found" }
  }
  if (res.status >= 500) {
    return { msg: 'Internal Server Error' }
  }
  const js = await res.json();
  if (res.ok) {
    return js;
  } else {
    throw new Error(js.message);
  }
};

// test
export const createTest = async () => {
  const resp = await fetch(`${baseUrl}/test`, {
    method: "GET",
  });
  return await toJson(resp);
};

export const signup = async (body: any) => {
  const resp = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return await toJson(resp);
}

export const login = async (body: any) => {
  const resp = await fetch(`${baseUrl}/login`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return await toJson(resp);
}

export const getTimeline = async (jwtToken: string, body: any) => {
  const resp = await fetch(`${baseUrl}/timeline`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    })
  });
  return await toJson(resp);
}

export const getMyUserInfo = async () => {
  const resp = await fetch(`${baseUrl}/mypage`, {
    method: "GET",
    // headers: new Headers({
    //   Authorization: `Bearer ${jwtToken}`,
    // })
  });
  return await toJson(resp);
}

export const getMyRelation = async (jwtToken: string, body: any) => {
  const resp = await fetch(`${baseUrl}/relation`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    })
  });
  return await toJson(resp);
}

export const createPost = async (jwtToken: string, body: any) => {
  const resp = await fetch(`${baseUrl}/post`, {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    }),
    body: JSON.stringify(body),
  });
  return await toJson(resp);
};

export const getMyRanking = async (jwtToken: string) => {
  const resp = await fetch(`${baseUrl}/ranking`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    }),
  });
  return await toJson(resp);
}

export const getMyStatus = async (jwtToken: string) => {
  const resp = await fetch(`${baseUrl}/status`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    }),
  });
  return await toJson(resp);
}

export const getOtherPage = async (jwtToken: string, user_id: string, body: any) => {
  const resp = await fetch(`${baseUrl}/${user_id}/mypage`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    }),
    body: JSON.stringify(body),
  });
  return await toJson(resp);
}

export const getOtherStatus = async (jwtToken: string, user_id: string, body: any) => {
  const resp = await fetch(`${baseUrl}/${user_id}/status`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    }),
    body: JSON.stringify(body),
  });
  return await toJson(resp);
}