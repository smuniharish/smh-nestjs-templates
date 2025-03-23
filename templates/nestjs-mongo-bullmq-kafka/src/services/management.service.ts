import { Injectable } from '@/imports';
import { ApiHelpersService } from './api-helpers.service';
import { KafkaLoggers } from './kafkaLogger.service';

@Injectable()
export class ManagementService {
  constructor(
    private apiHelperService: ApiHelpersService,
    private logger: KafkaLoggers,
  ) {}
}
