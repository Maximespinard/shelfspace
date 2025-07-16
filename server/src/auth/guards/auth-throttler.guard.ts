import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class AuthThrottlerGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): Promise<string> {
    const body = req.body as { email?: string; identifier?: string };
    const identifier = body?.email || body?.identifier || '';
    return Promise.resolve(req.ip + identifier);
  }
}
