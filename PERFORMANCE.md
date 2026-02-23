# Performance & Architecture Guidelines

## Architecture Separation
- **`src/components/canvas/`**: All Three.js and `@react-three/fiber` code lives here. This prevents unnecessary DOM re-renders from triggering heavy WebGL recalculations.
- **`src/components/dom/`**: Standard React components and UI. Uses Lenis for seamless scroll syncing without forcing the Canvas to re-render.
- **Z-Index Layering**: The Canvas sits at `z-index: -1` with `pointer-events: none` globally, letting CSS manage hover states unless a specific 3D interaction is needed (which can be toggled via `pointer-events: auto`).

## WebGL & Shader Optimization
1. **DPR Control**: `<Canvas dpr={[1, 2]}>` strictly limits device pixel ratio to 2 even on high-end retina displays (like Apple screens that default to 3 or 4) to maintain 60FPS.
2. **Custom Shaders**: Modifying `position.z` in vertex shaders is vastly cheaper than modifying position via Javascript `useFrame`.
3. **Instancing & Geometries**: When scaling the planets or grids, try to reuse `<sphereGeometry>` from a global context or use `InstancedMesh` if the count exceeds 50 objects.
4. **Preloading**: `<Preload all />` is employed to ensure textures/shaders compile before scroll interaction, avoiding jank.

## Accessibility vs Framerates
- **Mobiles**: If `window.innerWidth < 768`, you should selectively disable the heavy `BackgroundOverlay` component and replace it with a CSS radial gradient to ensure mobile battery preservation.
- **Prefers Reduced Motion**: Read `window.matchMedia('(prefers-reduced-motion: reduce)')` to slow down the `uTime` uniform multiplier in the shader from `0.5` to `0.05`.

## Scroll Synchronization (Lenis)
Do not bind state directly to scroll progress on every frame. Use R3F's `useFrame` with `drei`'s `useScroll` internal tracking if needed, or employ Framer Motion's `useScroll` with `useSpring` to dampen rapid updates.
