import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
    getHealthCheck(): { message: string } {
        const healthcheck = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now(),
        }
        return healthcheck
    }
}
