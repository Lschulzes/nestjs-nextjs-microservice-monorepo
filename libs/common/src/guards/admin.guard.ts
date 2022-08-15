import { CanActivate, ExecutionContext } from '@nestjs/common';

export class Admin implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.currentUser) return false;

    return request.currentUser.role === 'admin';
  }
}
