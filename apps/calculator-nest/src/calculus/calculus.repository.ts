import { Injectable } from '@nestjs/common'
import { GetCalculationHistoryResponse } from './DTO/getCalculationHistoryResponse'
import { Calculation } from './calculation'
import { mapCalculationToResponse } from './DTO/mapCalculationToResponse'

@Injectable()
export class CalculusRepository {
    public calculationHistory: GetCalculationHistoryResponse = []

    public addToHistory(query: string, calculation: Calculation) {
        this.calculationHistory.push({
            query,
            response: mapCalculationToResponse(calculation),
        })

        if (this.calculationHistory.length > 5) {
            this.calculationHistory.shift()
        }
    }
}
