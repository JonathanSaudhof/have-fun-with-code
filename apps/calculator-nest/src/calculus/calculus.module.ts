import { Module } from '@nestjs/common'
import { CalculusController } from './calculus.controller'
import { CalculusService } from './calculus.service'
import { CalculusRepository } from './calculus.repository'

@Module({
    imports: [],
    controllers: [CalculusController],
    providers: [CalculusService, CalculusRepository],
})
export class CalculusModule {}
