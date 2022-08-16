import { CanActivate, ExecutionContext } from '@nestjs/common';

export class Auth implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    return request.cookies['current-user'];
  }
}
