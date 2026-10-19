import { describe, expect, it } from 'vitest';
import { readConfig } from '../src/config.js';

describe('API configuration', () => {
  it('defaults to port 3001 and info logging', () => {
    expect(readConfig({})).toEqual({ port: 3001, logLevel: 'info' });
  });

  it('accepts explicit settings without retaining unrelated environment values', () => {
    expect(readConfig({ PORT: '4001', LOG_LEVEL: 'warn', SECRET: 'private-value' }))
      .toEqual({ port: 4001, logLevel: 'warn' });
  });

  it.each(['', '0', '-1', '65536', '3001.5', '0xBB9', '3e3', 'invalid-secret'])
    ('rejects invalid port %j without echoing its value', (port) => {
      expect(() => readConfig({ PORT: port })).toThrow('Invalid configuration: PORT.');
    });

  it('rejects unknown logging levels without exposing their value', () => {
    expect(() => readConfig({ LOG_LEVEL: 'private-value' }))
      .toThrow('Invalid configuration: LOG_LEVEL.');
  });
});
