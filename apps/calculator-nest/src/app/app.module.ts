import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CalculusController } from '../calculus/calculus.controller'
import { CalculusService } from '../calculus/calculus.service'
import { CalculusModule } from '../calculus/calculus.module'

@Module({
    imports: [CalculusModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
