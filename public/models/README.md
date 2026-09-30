# Drop your 3D model here

Place your portrait/body GLB at:

    public/models/devendra.glb

The hero detects it automatically (no code change needed). Until then a
procedural placeholder bust is shown.

Optimise before adding (target < 3 MB):

    npx gltf-transform optimize devendra.glb devendra.glb --compress draco --texture-compress webp
