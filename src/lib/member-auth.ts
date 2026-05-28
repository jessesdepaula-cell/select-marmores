import { createHmac, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'sm_member';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function getSecret() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 16) {
    throw new Error('SESSION_SECRET ausente ou muito curto (mínimo 16 chars).');
  }
  return s;
}

function sign(payload: string) {
  return createHmac('sha256', getSecret()).update(payload).digest('hex');
}

export type MemberSession = { userId: string; email: string };

export function createMemberToken(session: MemberSession) {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  const payload = `${session.userId}|${encodeURIComponent(session.email)}|${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyMemberToken(token: string | undefined | null): MemberSession | null {
  if (!token) return null;
  const lastDot = token.lastIndexOf('.');
  if (lastDot <= 0) return null;
  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  const parts = payload.split('|');
  if (parts.length !== 3) return null;
  const [userId, emailEnc, expStr] = parts;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null;
  const expected = sign(payload);
  try {
    if (!timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return null;
  } catch {
    return null;
  }
  return { userId, email: decodeURIComponent(emailEnc) };
}

export const MEMBER_COOKIE = COOKIE_NAME;
export const MEMBER_MAX_AGE = MAX_AGE_SECONDS;
