import { ApiTags, Controller } from '@/imports';
import { ManagementService } from '@/services/management.service';

@Controller({ version: '1' })
@ApiTags('Management')
export class ManagementController {
  constructor(private managementService: ManagementService) {}
}
