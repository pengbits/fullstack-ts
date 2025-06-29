describe('env', () => {
  it('has access to env variables', () => {
    expect(process.env.PGDATABASE).toBe('park.me')
  })
})