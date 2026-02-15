import axiosClient from '../../api/axiosClient'

describe('axiosClient', () => {
  test('has expected defaults and interceptor installed', () => {
    // basic axios instance methods
    expect(typeof axiosClient.get).toBe('function')
    expect(typeof axiosClient.post).toBe('function')

    // timeout default
    expect(axiosClient.defaults.timeout).toBe(10000)

    // headers contain JSON content type (check common and root places)
    const headersAny = axiosClient.defaults.headers as any
    const contentType = headersAny?.['Content-Type'] || headersAny?.common?.['Content-Type']
    expect(contentType).toMatch(/application\/json/)

    // ensure a response interceptor handler was registered
    const handlers = (axiosClient.interceptors.response as any).handlers
    expect(Array.isArray(handlers)).toBe(true)
    expect(handlers.length).toBeGreaterThan(0)
  })

  test('response interceptor rejects and logs for different error shapes', async () => {
    const handlers = (axiosClient.interceptors.response as any).handlers
    const rejected = handlers.find((h: any) => typeof h.rejected === 'function')?.rejected
    expect(typeof rejected).toBe('function')

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    // error with response
    const errWithResponse = { response: { status: 500, data: 'server error' } }
    await expect(rejected(errWithResponse)).rejects.toBe(errWithResponse)
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockClear()

    // error with request but no response
    const errWithRequest = { request: {} }
    await expect(rejected(errWithRequest)).rejects.toBe(errWithRequest)
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockClear()

    // generic error (neither response nor request)
    const genericErr = { message: 'bad things' }
    await expect(rejected(genericErr)).rejects.toBe(genericErr)
    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
  })
})
