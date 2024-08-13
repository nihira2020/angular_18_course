import { CanActivateChildFn } from '@angular/router';

export const childauthGuard: CanActivateChildFn = (childRoute, state) => {
  //
  return false;
};
