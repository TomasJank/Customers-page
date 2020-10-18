let appID = 1
export const getNextAppId = () => {
  const _id = appID
  appID++
  return _id
}