import DateTime from "./datetime"
let date
describe('datetime', () => {
  it('should save to the db correctly', async () => {
    date = new Date()
    DateTime.save(date)
    const res = await DateTime.find()
    console.log(res)
  })  
})