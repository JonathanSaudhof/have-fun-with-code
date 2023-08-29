import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { CalculusService } from './calculus.service'

import {
    CalculationHistoryResponse,
    CalculationQuery,
    CalculationQueryResponse,
    transformCalculationToResponse,
} from './calculus.domain'
import { decodeBase64ToUtf8 } from '@coding-challenges/shared/utils'

@Controller('calculus')
export class CalculusController {
    constructor(private readonly calculusService: CalculusService) {}

    @Get()
    getCalculation(
        @Query() queryParams: CalculationQuery
    ): CalculationQueryResponse {
        const { query } = queryParams

        let decodedQuery

        try {
            decodedQuery = decodeBase64ToUtf8(query)
        } catch (e) {
            throw new BadRequestException(
                'query needs to be an utf8 string encoded in base64'
            )
        }

        const calculation =
            this.calculusService.generateCalculation(decodedQuery)

        return transformCalculationToResponse(calculation)
    }

    @Get('history')
    getHistory(): CalculationHistoryResponse {
        return this.calculusService.getCalculationHistory()
    }
}
