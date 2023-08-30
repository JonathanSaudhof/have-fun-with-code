import { IsBase64 } from 'class-validator'

export class GetCalculationQuery {
    @IsBase64()
    query: string
}
