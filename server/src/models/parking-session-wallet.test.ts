import ParkingSession from "./parking-session"
import Wallet from "./wallet"
import Vehicle from "./vehicle"
beforeAll(async() => {
  await Wallet.deleteAll()
  await Vehicle.deleteAll()
  await ParkingSession.deleteAll()
})

describe('wallet x parking-session', () => {
  it('session cost is deducted from wallet', async () => {
    const wallet = await Wallet.findOrCreate()
    expect(wallet.balance).toBe(2000)
    const vehicle = await Vehicle.create({
        id: 'BADMN1',
        name:'BADMANWAGON',
        is_default:false
    })
    const session = await ParkingSession.create({
      meter_number: '3163027',
      start_time: '2025-06-30 12:00:00',
      duration: 20,
      vehicle_id:'BADMN1'
    })
    const updated = await Wallet.findOrCreate()
    expect(updated.balance).toBe(1950)
  })
})