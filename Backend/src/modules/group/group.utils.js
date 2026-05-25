import crypto from 'crypto';

/**
 * Generates a unique, secure, 6-character uppercase alphanumeric invite code.
 * @returns {string}
 */
export const generateInviteCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const randomBytes = crypto.randomBytes(6);
  for (let i = 0; i < 6; i++) {
    result += chars[randomBytes[i] % chars.length];
  }
  return result;
};

export default {
  generateInviteCode,
};
