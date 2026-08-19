import { describe, it, expect } from 'vitest';
import { generateMeshGradientCss, DEFAULT_MESH_OPTIONS } from './cssMeshGradient';

describe('cssMeshGradient', () => {
  it('should generate radial background layers and css', () => {
    const res = generateMeshGradientCss(DEFAULT_MESH_OPTIONS);

    expect(res.background).toContain('radial-gradient(at 20% 20%, #4f46e5');
    expect(res.background).toContain('radial-gradient(at 80% 20%, #ec4899');
    expect(res.css).toContain('background-color: #0f172a;');
    expect(res.css).toContain('background-image:');
  });
});
