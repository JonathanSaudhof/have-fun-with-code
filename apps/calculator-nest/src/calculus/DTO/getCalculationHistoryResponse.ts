import { GetCalculationQueryResponse } from './getCalculationResponse'

export type GetCalculationHistoryResponse = {
    query: string
    response: GetCalculationQueryResponse
}[]
