import Wallet from "./wallet"

beforeAll(async() => {
  await Wallet.deleteAll()
})

describe('Wallet', () => {
  it('has a starting balance of $20.00', async () => {
    let wallet = await Wallet.findOrCreate()
    expect(wallet.balance).toBe(2000)
  })
  it('only has one wallet record in the db', async () => {
    let wallets = await Wallet.find()
    expect(wallets.length).toBe(1)
  })
})