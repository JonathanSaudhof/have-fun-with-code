import { Injectable } from '@nestjs/common'
import { Parser as FormularParser, Parser } from 'hot-formula-parser'
import { Calculation } from './calculation'
import { CalculusRepository } from './calculus.repository'

@Injectable()
export class CalculusService {
    private readonly formulaParser: Parser = null

    constructor(private readonly calculusRepository: CalculusRepository) {
        this.formulaParser = new FormularParser()
    }

    public getCalculationHistory() {
        return this.calculusRepository.calculationHistory
    }

    public generateCalculation(formulaString: string): Calculation {
        const calculationResult = this.formulaParser.parse(formulaString)
        this.calculusRepository.addToHistory(formulaString, calculationResult)
        return calculationResult
    }
}
