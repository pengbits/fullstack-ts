import ParkingSession from "./parking-session"
import Wallet from "./wallet"

beforeAll(async() => {
  await Wallet.deleteAll()
  await ParkingSession.deleteAll()
})

describe('wallet x parking-session', () => {
  it('session cost is deducted from wallet', async () => {
    const wallet = await Wallet.findOrCreate()
    expect(wallet.balance).toBe(2000)

    const session = await ParkingSession.create({
      meter_number: '3163027',
      start_time: '2025-06-30 12:00:00',
      duration: 20,
    })
    const updated = await Wallet.findOrCreate()
    expect(updated.balance).toBe(1950)
  })
})