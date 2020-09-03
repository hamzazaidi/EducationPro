
import { CanActivateHomeGuard } from './can-activate-home.guard';
import { CanActivateAdminGuard } from './can-activate-admin.guard';

export const guards: any[] = [
  CanActivateHomeGuard,
  CanActivateAdminGuard
];
