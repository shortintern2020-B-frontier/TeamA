const toJson = async (res: Response) => {
  if (res.status == 404) {
    return "NotFound";
  }
  const js = await res.json();
  if (res.ok) {
    return js;
  } else {
    throw new Error(js.message);
  }
};


export const createPost = async (body: any) => {
  const resp = await fetch(`localhost:5000/owner`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return await toJson(resp);
};
