uniform vec3 uColor;
uniform float uIntensity;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  // Fresnel effect: glow strongest at edges
  vec3 viewDir = normalize(vViewPosition);
  float fresnel = 1.0 - abs(dot(viewDir, vNormal));
  fresnel = pow(fresnel, 2.5);
  
  // Subtle pulse
  float pulse = sin(uTime * 1.5) * 0.1 + 0.9;
  
  // Final glow
  float glow = fresnel * uIntensity * pulse;
  
  gl_FragColor = vec4(uColor, glow * 0.7);
}
