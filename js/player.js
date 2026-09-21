import * as THREE from "three";

export class Player {

  constructor(scene) {

    this.group = new THREE.Group();

    scene.add(this.group);

    // =========================
    // MATERIALES
    // =========================

    const skin = new THREE.MeshStandardMaterial({
      color: 0xf0c3a8,
      roughness: 0.9
    });

    const dress = new THREE.MeshStandardMaterial({
      color: 0xd96f9e,
      roughness: 0.85
    });

    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x4b2e25,
      roughness: 0.95
    });

    const shoeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.8
    });

    // =========================
    // CUERPO
    // =========================

    const body = new THREE.Mesh(
      new THREE.CapsuleGeometry(
        0.72,
        1.35,
        8,
        16
      ),
      dress
    );

    body.position.y = 1.65;

    body.castShadow = true;

    this.group.add(body);

    // =========================
    // CABEZA
    // =========================

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(
        0.72,
        24,
        18
      ),
      skin
    );

    head.position.y = 3.28;

    head.castShadow = true;

    this.group.add(head);

    // =========================
    // CABELLO
    // =========================

    const hair = new THREE.Mesh(
      new THREE.SphereGeometry(
        0.78,
        24,
        16,
        0,
        Math.PI * 2,
        0,
        Math.PI * 0.67
      ),
      hairMat
    );

    hair.position.y = 3.48;

    hair.castShadow = true;

    this.group.add(hair);

    // =========================
    // PIERNAS
    // =========================

    for (const x of [-0.36, 0.36]) {

      const leg = new THREE.Mesh(
        new THREE.CapsuleGeometry(
          0.25,
          1.15,
          6,
          12
        ),
        new THREE.MeshStandardMaterial({
          color: 0x4f5870
        })
      );

      leg.position.set(
        x,
        0.62,
        0
      );

      leg.castShadow = true;

      this.group.add(leg);

    }

    // =========================
    // ZAPATOS
    // =========================

    for (const x of [-0.36, 0.36]) {

      const shoe = new THREE.Mesh(
        new THREE.SphereGeometry(
          0.28,
          16,
          10
        ),
        shoeMat
      );

      shoe.scale.set(
        1,
        0.55,
        1.35
      );

      shoe.position.set(
        x,
        0.12,
        0.12
      );

      shoe.castShadow = true;

      this.group.add(shoe);

    }

    // =========================
    // VELOCIDAD
    // =========================

    this.speed = 8;

    // =========================
    // TECLAS
    // =========================

    this.keys = {};

    this.moving = false;

    addEventListener(
      "keydown",
      (event) => {

        this.keys[
          event.key.toLowerCase()
        ] = true;

      }
    );

    addEventListener(
      "keyup",
      (event) => {

        this.keys[
          event.key.toLowerCase()
        ] = false;

      }
    );

  }

  // =========================
  // ACTUALIZAR JUGADORA
  // =========================

  update(dt) {

    let x = 0;

    let z = 0;

    // Adelante

    if (
      this.keys.w ||
      this.keys.arrowup
    ) {

      z -= 1;

    }

    // Atrás

    if (
      this.keys.s ||
      this.keys.arrowdown
    ) {

      z += 1;

    }

    // Izquierda

    if (
      this.keys.a ||
      this.keys.arrowleft
    ) {

      x -= 1;

    }

    // Derecha

    if (
      this.keys.d ||
      this.keys.arrowright
    ) {

      x += 1;

    }

    // =========================
    // DIRECCIÓN
    // =========================

    const velocity =
      new THREE.Vector3(
        x,
        0,
        z
      );

    this.moving =
      velocity.lengthSq() > 0;

    // =========================
    // MOVIMIENTO
    // =========================

    if (this.moving) {

      velocity.normalize();

      this.group.position.addScaledVector(
        velocity,
        this.speed * dt
      );

      // Girar personaje
      this.group.rotation.y =
        Math.atan2(
          velocity.x,
          velocity.z
        );

    }

    // =========================
    // LÍMITES DEL MUNDO
    // =========================

    this.group.position.x =
      THREE.MathUtils.clamp(
        this.group.position.x,
        -88,
        88
      );

    this.group.position.z =
      THREE.MathUtils.clamp(
        this.group.position.z,
        -88,
        88
      );

  }

  // =========================
  // POSICIÓN
  // =========================

  get position() {

    return this.group.position;

  }

}
