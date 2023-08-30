/* eslint-disable @nx/enforce-module-boundaries */
import axios from 'axios'
import { encodeUtf8ToBase64 } from '@coding-challenges/shared/utils'
import { GetCalculationHistoryResponse } from '../../../calculator-nest/src/calculus/DTO/getCalculationHistoryResponse'
import { GetCalculationQueryResponse } from '../../../calculator-nest/src/calculus/DTO/getCalculationResponse'

describe('GET /calculus', () => {
    const url = `${globalThis.TestContainerHost}/calculus`

    it('should valid response to query', async () => {
        const query = `${url}?query=${encodeUtf8ToBase64('1+1')}`

        const res = await axios.get(query)
        expect(res.status).toBe(200)
        expect(res.data).toEqual({ error: false, result: 2 })
    })

    it('should return last 5 calculations', async () => {
        const expectedResult: GetCalculationHistoryResponse = []

        for (let i = 0; i < 5; i++) {
            const calculationString = `1+${i}`
            const query = `${url}?query=${encodeUtf8ToBase64(
                calculationString
            )}`

            const res = await axios.get<GetCalculationQueryResponse>(query)

            expectedResult.push({
                query: calculationString,
                response: res.data,
            })

            expect(res.status).toBe(200)
            expect(res.data).toEqual({ error: false, result: 1 + i })
        }

        const history = await axios.get(`${url}/history`)

        expect(history.data).toEqual(expectedResult)
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
