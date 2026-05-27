import { createHmac, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'sm_session';
const MAX_AGE_SECONDS = 60 * 60 * 12;

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

export function createSessionToken() {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  const payload = `ok.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [flag, expStr, signature] = parts;
  if (flag !== 'ok') return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  const expected = sign(`${flag}.${expStr}`);
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}

export const SESSION_COOKIE = COOKIE_NAME;
export const SESSION_MAX_AGE = MAX_AGE_SECONDS;
