import { Injectable } from '@/imports';
import { ApiHelpersService } from './api-helpers.service';

@Injectable()
export class ManagementService {
  constructor(
    private apiHelperService: ApiHelpersService,
  ) {}
}
