const jwt = require('jsonwebtoken');
const { signToken, verifyToken, JWT_SECRET } = require('../../src/lib/jwt');

describe('lib/jwt', () => {
  describe('signToken', () => {
    it('returns a string JWT', () => {
      const token = signToken(42);
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);
    });

    it('embeds the userId as the "sub" claim', () => {
      const token = signToken(7);
      const payload = jwt.decode(token);
      expect(payload.sub).toBe(7);
    });

    it('sets an expiration claim', () => {
      const token = signToken(1);
      const payload = jwt.decode(token);
      expect(payload.exp).toBeDefined();
      expect(payload.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
    });
  });

  describe('verifyToken', () => {
    it('returns the decoded payload for a valid token', () => {
      const token = signToken(99);
      const payload = verifyToken(token);
      expect(payload.sub).toBe(99);
    });

    it('throws for a tampered token', () => {
      const token = signToken(1) + 'x';
      expect(() => verifyToken(token)).toThrow();
    });

    it('throws for a token signed with a different secret', () => {
      const token = jwt.sign({ sub: 1 }, 'wrong-secret', { expiresIn: '1h' });
      expect(() => verifyToken(token)).toThrow();
    });

    it('throws for an expired token', () => {
      const token = jwt.sign({ sub: 1 }, JWT_SECRET, { expiresIn: '-1s' });
      expect(() => verifyToken(token)).toThrow();
    });
  });
});
