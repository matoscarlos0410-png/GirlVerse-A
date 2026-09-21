import * as THREE from "three";

// ==========================================
// MATERIAL GENERAL
// ==========================================

const mat = (color) =>
  new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.82
  });


// ==========================================
// CREAR CUBO
// ==========================================

function box(
  scene,
  x,
  y,
  z,
  width,
  height,
  depth,
  color
) {

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(
      width,
      height,
      depth
    ),
    mat(color)
  );

  mesh.position.set(
    x,
    y,
    z
  );

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  scene.add(mesh);

  return mesh;
}


// ==========================================
// CREAR TODO EL MUNDO
// ==========================================

export function createWorld(scene) {

  // ========================================
  // TERRENO
  // ========================================

  const ground = box(
    scene,
    0,
    -0.08,
    0,
    200,
    0.16,
    200,
    0x78aa70
  );

  ground.receiveShadow = true;


  // ========================================
  // CALLE PRINCIPAL VERTICAL
  // ========================================

  box(
    scene,
    0,
    0.03,
    0,
    14,
    0.08,
    190,
    0x55585e
  );


  // ========================================
  // CALLE PRINCIPAL HORIZONTAL
  // ========================================

  box(
    scene,
    0,
    0.04,
    0,
    190,
    0.08,
    14,
    0x55585e
  );


  // ========================================
  // LÍNEAS DE LAS CALLES
  // ========================================

  for (
    const x of [-10, 10]
  ) {

    box(
      scene,
      x,
      0.12,
      0,
      3,
      0.12,
      190,
      0xc9c9c9
    );

  }


  for (
    const z of [-10, 10]
  ) {

    box(
      scene,
      0,
      0.13,
      z,
      190,
      0.12,
      3,
      0xc9c9c9
    );

  }


  // ========================================
  // CASAS
  // ========================================

  createHouse(
    scene,
    -30,
    -28,
    0xe9b7c8
  );

  createHouse(
    scene,
    30,
    -28,
    0xd6b7e5
  );

  createHouse(
    scene,
    -30,
    30,
    0xf0d3a4
  );

  createHouse(
    scene,
    30,
    30,
    0xb6d8eb
  );


  // ========================================
  // ÁRBOLES
  // ========================================

  const treePositions = [

    [-50, -40],
    [-50, -20],
    [-50, 20],
    [-50, 40],

    [50, -40],
    [50, -20],
    [50, 20],
    [50, 40],

    [-20, 48],
    [0, 48],
    [20, 48],

    [-20, -48],
    [0, -48],
    [20, -48]

  ];


  for (
    const [x, z] of treePositions
  ) {

    createTree(
      scene,
      x,
      z
    );

  }


  // ========================================
  // PARQUE
  // ========================================

  createPark(
    scene,
    54,
    0
  );


  // ========================================
  // CAFETERÍA
  // ========================================

  createCafe(
    scene,
    -36,
    54
  );

}


// ==========================================
// CASA
// ==========================================

function createHouse(
  scene,
  x,
  z,
  color
) {

  // Cuerpo de la casa

  box(
    scene,
    x,
    3.5,
    z,
    13,
    7,
    10,
    color
  );


  // Techo

  const roof =
    new THREE.Mesh(
      new THREE.ConeGeometry(
        9,
        5,
        4
      ),
      mat(0x8f5562)
    );

  roof.position.set(
    x,
    9.5,
    z
  );

  roof.rotation.y =
    Math.PI / 4;

  roof.castShadow = true;

  scene.add(roof);


  // Puerta

  box(
    scene,
    x,
    2,
    z + 5.1,
    2,
    4,
    0.25,
    0x684936
  );


  // Ventana izquierda

  box(
    scene,
    x - 3.5,
    4.5,
    z + 5.1,
    2.5,
    2,
    0.2,
    0x9ddcf4
  );


  // Ventana derecha

  box(
    scene,
    x + 3.5,
    4.5,
    z + 5.1,
    2.5,
    2,
    0.2,
    0x9ddcf4
  );

}


// ==========================================
// ÁRBOL
// ==========================================

function createTree(
  scene,
  x,
  z
) {

  // Tronco

  const trunk =
    new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.65,
        0.85,
        5,
        10
      ),
      mat(0x704a32)
    );

  trunk.position.set(
    x,
    2.5,
    z
  );

  trunk.castShadow = true;

  scene.add(trunk);


  // Copa

  const crown =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        3.4,
        16,
        12
      ),
      mat(0x4f914f)
    );

  crown.position.set(
    x,
    6.4,
    z
  );

  crown.castShadow = true;

  scene.add(crown);

}


// ==========================================
// PARQUE
// ==========================================

function createPark(
  scene,
  x,
  z
) {

  // Zona verde

  box(
    scene,
    x,
    0.06,
    z,
    34,
    0.12,
    34,
    0x86bd78
  );


  // Base de la fuente

  const base =
    new THREE.Mesh(
      new THREE.CylinderGeometry(
        5,
        5,
        0.55,
        32
      ),
      mat(0xb9b9bf)
    );

  base.position.set(
    x,
    0.15,
    z
  );

  base.castShadow = true;

  scene.add(base);


  // Agua

  const water =
    new THREE.Mesh(
      new THREE.CylinderGeometry(
        4.3,
        4.3,
        0.2,
        32
      ),
      mat(0x66c7e8)
    );

  water.position.set(
    x,
    0.25,
    z
  );

  scene.add(water);

}


// ==========================================
// CAFETERÍA
// ==========================================

function createCafe(
  scene,
  x,
  z
) {

  // Edificio

  box(
    scene,
    x,
    3.5,
    z,
    15,
    7,
    10,
    0xe6c3ad
  );


  // Letrero

  box(
    scene,
    x,
    8,
    z - 5.1,
    9,
    1.8,
    0.3,
    0xd86c9f
  );

}
