import { Injectable } from '@nestjs/common'
import {
    Calculation,
    CalculationHistoryResponse,
    transformCalculationToResponse,
} from './calculus.domain'

@Injectable()
export class CalculusRepository {
    public calculationHistory: CalculationHistoryResponse = []

    public addToHistory(query: string, calculation: Calculation) {
        this.calculationHistory.push({
            query,
            response: transformCalculationToResponse(calculation),
        })

        if (this.calculationHistory.length > 5) {
            this.calculationHistory.shift()
        }
    }
}
