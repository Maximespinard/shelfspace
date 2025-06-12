import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

type CurrentUserPayload = {
  id: string;
  email?: string;
  username?: string;
};

export const CurrentUser = createParamDecorator(
  (data: keyof CurrentUserPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as CurrentUserPayload;
    return data ? user?.[data] : user;
  },
);
