import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let _token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwibmJmIjoxNzIxMjExOTE0LCJleHAiOjE3MjEyMTQ5MTQsImlhdCI6MTcyMTIxMTkxNH0.WsfmWyT9wp_j0gvP9ts7TLuwhD84gPaLSDYYHOS2RhI';
  let jwt=req.clone({
  setHeaders:{
    Authorization:'bearer '+_token
  }
  })
  return next(jwt);
};
