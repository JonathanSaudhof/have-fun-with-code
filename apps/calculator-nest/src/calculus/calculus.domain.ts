import { FormulaErrorId } from 'hot-formula-parser'
import { IsBase64 } from 'class-validator'

export class Calculation {
    result: string | number | boolean
    error: FormulaErrorId | false
}

export class CalculationQuery {
    @IsBase64()
    query: string
}

export type CalculationResult = number | string | boolean

export type CalculationQueryResponse =
    | {
          error: true
          message: string
      }
    | {
          error: false
          result: CalculationResult
      }

export type CalculationHistoryResponse = {
    query: string
    response: CalculationQueryResponse
}[]

export const transformCalculationToResponse = (
    calculation: Calculation
): CalculationQueryResponse => {
    let result: CalculationQueryResponse

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
