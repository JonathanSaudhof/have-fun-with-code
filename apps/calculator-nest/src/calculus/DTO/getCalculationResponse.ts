export type GetCalculationQueryResponse =
    | {
          error: true
          message: string
      }
    | {
          error: false
          result: CalculationResult
      }

export type CalculationResult = number | string | boolean
