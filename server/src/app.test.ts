import request from "supertest"
import app from "./app"

describe("App", () => {
  test("GET /api should return a greeting", async () => {
    const response = await request(app).get('/api')
    expect(response.status).toBe(200)
    expect(response.body.greeting).toMatch(/Ahoy/)
  })
})