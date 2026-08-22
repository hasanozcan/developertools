import { describe, it, expect } from 'vitest';
import { convertSrtToWebVtt } from './subtitleSrtVttConverter';

describe('convertSrtToWebVtt', () => {
  it('converts SRT comma millisecond timestamps to WebVTT period timestamps', () => {
    const srt = '1\n00:01:20,000 --> 00:01:23,500\nHello world';
    const vtt = convertSrtToWebVtt(srt);
    expect(vtt.startsWith('WEBVTT')).toBe(true);
    expect(vtt).toContain('00:01:20.000 --> 00:01:23.500');
  });
});