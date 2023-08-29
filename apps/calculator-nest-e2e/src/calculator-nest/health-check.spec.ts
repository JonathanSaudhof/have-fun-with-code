import axios from 'axios'

describe('GET /', () => {
    it('should return a health check', async () => {
        const res = await axios.get(globalThis.TestContainerHost)
        expect(res.status).toBe(200)
        expect(res.data).toBeDefined()
        expect(res.data.message).toEqual('OK')
    })
})
