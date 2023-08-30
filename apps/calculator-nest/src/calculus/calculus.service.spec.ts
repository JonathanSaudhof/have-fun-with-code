import { CalculusService } from './calculus.service'
import { CalculusRepository } from './calculus.repository'
import { GetCalculationHistoryResponse } from './DTO/getCalculationHistoryResponse'
import { mapCalculationToResponse } from './DTO/mapCalculationToResponse'

describe('CalculusService', () => {
    let service: CalculusService
    let repository: CalculusRepository

    beforeEach(async () => {
        repository = new CalculusRepository()
        service = new CalculusService(repository)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('generateCalculation', () => {
        it.each([
            ['1+1', { error: null, result: 2 }],
            ['(10+90)*(10+1)', { error: null, result: 1100 }],
            ['((10+90)*(10+1)', { error: '#ERROR!', result: null }],
            ['', { error: null, result: '' }],
        ])(
            'should return correct result with braces',
            (calculation, expected) => {
                const result = service.generateCalculation(calculation)
                expect(result).toEqual(expected)
            }
        )
    })

    describe('getLastCalculations', () => {
        it('should return 5 latest calculations', () => {
            const expectedResult: GetCalculationHistoryResponse = []

            for (let i = 0; i < 5; i++) {
                const query = `${i}+1`

                const calculation = service.generateCalculation(query)

                if (i > 0) {
                    expectedResult.push({
                        query,
                        response: mapCalculationToResponse(calculation),
                    })
                }
            }

            const queryWithError = '1/0'
            const calculation = service.generateCalculation(queryWithError)

            expectedResult.push({
                query: queryWithError,
                response: mapCalculationToResponse(calculation),
            })

            const result = service.getCalculationHistory()

            expect(result).toEqual(expectedResult)
            expect(result).toEqual(repository.calculationHistory)
        })
    })
})
