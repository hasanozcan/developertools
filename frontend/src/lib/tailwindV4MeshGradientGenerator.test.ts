import { describe, it, expect } from 'vitest';
import { generateMeshGradient } from './tailwindV4MeshGradientGenerator';

describe('tailwindV4MeshGradientGenerator', () => {
  it('generates mesh gradient CSS', () => {
    expect(generateMeshGradient('#fff', '#000', '#333')).toContain('radial-gradient');
  });
});
