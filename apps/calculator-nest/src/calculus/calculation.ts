import { FormulaErrorId } from 'hot-formula-parser'

export class Calculation {
    result: string | number | boolean
    error: FormulaErrorId | false
}
