import axios from 'axios'
import { encodeUtf8ToBase64 } from '@coding-challenges/shared/utils'

describe('GET /calculus', () => {
    const url = `${globalThis.TestContainerHost}/calculus`

    it('should valid response to query', async () => {
        const query = `${url}?query=${encodeUtf8ToBase64('1+1')}`

        const res = await axios.get(query)
        expect(res.status).toBe(200)
        expect(res.data).toEqual({ error: false, result: 2 })
    })

    it('should return a 400 on not base64 encoding', async () => {
        const query = `${url}?query=1+1}`

        try {
            await axios.get(query)
        } catch (err) {
            expect(err.response.status).toBe(400)
        }
    })
})
