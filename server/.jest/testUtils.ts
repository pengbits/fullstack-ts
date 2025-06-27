export const expectAttributes = (object:any, keys:Array<String>) => {
  expect(object).toBeTruthy()
  const attrs = Object.keys(object)
  expect(attrs).toEqual(expect.arrayContaining(keys))
}
