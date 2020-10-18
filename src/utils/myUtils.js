let appID = 1;
export const getNextAppId = (data) => {
  const maxArrayId =
    Array.isArray(data) && data.length > 0
      ? Math.max.apply(
          null,
          data.map((item) => item.id)
        )
      : null;
  if (maxArrayId) {
    appID = maxArrayId + 1;
  }

  const _id = appID;
  appID++;
  return _id;
};
