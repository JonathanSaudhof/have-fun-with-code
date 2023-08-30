import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { CalculusService } from './calculus.service'
import { decodeBase64ToUtf8 } from '@coding-challenges/shared/utils'
import { GetCalculationQuery } from './DTO/getCalculationQuery'
import { mapCalculationToResponse } from './DTO/mapCalculationToResponse'
import { GetCalculationHistoryResponse } from './DTO/getCalculationHistoryResponse'
import { GetCalculationQueryResponse } from './DTO/getCalculationResponse'

@Controller('calculus')
export class CalculusController {
    constructor(private readonly calculusService: CalculusService) {}

    @Get()
    getCalculation(
        @Query() queryParams: GetCalculationQuery
    ): GetCalculationQueryResponse {
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

        return mapCalculationToResponse(calculation)
    }

    @Get('history')
    getHistory(): GetCalculationHistoryResponse {
        return this.calculusService.getCalculationHistory()
    }
}
