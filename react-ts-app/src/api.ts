const baseUrl = `http://localhost:5000`

const toJson = async (res: Response) => {
  if (res.status === 404) {
    return "Not Found"
  }
  if (res.status >= 500) {
    return "Internal Server Error"
  }
  const js = await res.json();
  if (res.ok) {
    return js;
  } else {
    throw new Error(js.message);
  }
};

// ping test
export const ping = async () => {
  const resp = await fetch(`${baseUrl}/ping`, {
    method: "GET",
  });
  return await toJson(resp);
};

export const signup = async <T>(body: T) => {
  const resp = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return await toJson(resp);
}

export const login = async <T>(body: T) => {
  const resp = await fetch(`${baseUrl}/login`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return await toJson(resp);
}

export const getTimeline = async (jwtToken: string) => {
  const resp = await fetch(`${baseUrl}/timeline`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    })
  });
  return await toJson(resp);
}

export const getMyUserInfo = async (jwtToken: string) => {
  const resp = await fetch(`${baseUrl}/mypage`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    })
  });
  return await toJson(resp);
}

export const getMyRelation = async (jwtToken: string) => {
  const resp = await fetch(`${baseUrl}/relation`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    })
  });
  return await toJson(resp);
}

export const createPost = async <T>(jwtToken: string, body: T) => {
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

export const getOtherPage = async <T>(jwtToken: string, user_id: string, body: T) => {
  const resp = await fetch(`${baseUrl}/${user_id}/mypage`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    }),
    body: JSON.stringify(body),
  });
  return await toJson(resp);
}

export const getOtherStatus = async <T>(jwtToken: string, user_id: string, body: T) => {
  const resp = await fetch(`${baseUrl}/${user_id}/status`, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${jwtToken}`,
    }),
    body: JSON.stringify(body),
  });
  return await toJson(resp);
}