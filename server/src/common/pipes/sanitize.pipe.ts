import { Injectable, PipeTransform } from '@nestjs/common';
import { isString } from 'class-validator';

@Injectable()
export class SanitizePipe implements PipeTransform {
  transform(value: unknown): unknown {
    if (value && typeof value === 'object') {
      return this.sanitizeObject(value as Record<string, unknown>);
    }
    return value;
  }

  private sanitizeObject(
    obj: Record<string, unknown>,
  ): Record<string, unknown> {
    const sanitized = { ...obj };

    for (const key in sanitized) {
      if (Object.prototype.hasOwnProperty.call(sanitized, key)) {
        // Skip Buffer objects - they don't need sanitization
        if (Buffer.isBuffer(sanitized[key])) {
          continue;
        }

        if (isString(sanitized[key])) {
          // Remove potential XSS and NoSQL injection attempts
          sanitized[key] = sanitized[key]
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+\s*=/gi, '')
            .replace(/\$where/gi, '')
            .replace(/\$ne/gi, '');
        } else if (sanitized[key] && typeof sanitized[key] === 'object') {
          sanitized[key] = this.sanitizeObject(
            sanitized[key] as Record<string, unknown>,
          );
        }
      }
    }

    return sanitized;
  }
}
