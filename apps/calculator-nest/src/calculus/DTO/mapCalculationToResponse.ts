import { GetCalculationQueryResponse } from './getCalculationResponse'
import { Calculation } from '../calculation'

export const mapCalculationToResponse = (
    calculation: Calculation
): GetCalculationQueryResponse => {
    let result: GetCalculationQueryResponse

    if (calculation.error) {
        result = {
            message: calculation.error,
            error: true,
        }
    } else {
        result = {
            result: calculation.result,
            error: false,
        }
    }

    return result
}
