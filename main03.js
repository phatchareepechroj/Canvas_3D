import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


document.addEventListener("DOMContentLoaded", main);


function main() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x4682b4); // sky blue

    // 1.1 3D Object : Mesh (Model Matrix)
    const boxForm = new THREE.BoxGeometry(7, 7, 7);

    //const colorMat = new THREE.MeshBasicMaterial();
    const colorMat = new THREE.MeshStandardMaterial();
    colorMat.color = new THREE.Color(0xffff00);
    const cubeMesh = new THREE.Mesh(boxForm, colorMat);
    cubeMesh.position.set(17, 3, 30);
    cubeMesh.castShadow = true;
    cubeMesh.receiveShadow = true;
    scene.add(cubeMesh);
    
    const planeForm = new THREE.PlaneGeometry(80, 80);
    const whiteMat = new THREE.MeshStandardMaterial();
    whiteMat.color = new THREE.Color(0x00ff00);
    const plane = new THREE.Mesh(planeForm, whiteMat);
    plane.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
    plane.castShadow = true;
    plane.receiveShadow = true
    scene.add(plane);

    
    // สร้างสามเหลี่ยม 3D
    const triangleGeometry = new THREE.ConeGeometry(6, 6, 4); // ฐานกว้าง 2, สูง 3, และ 3 ด้าน
    const triangleMaterial = new THREE.MeshStandardMaterial({ color: 0xff69b4   }); // สีเหลืองทอง
    const triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);
    triangleMesh.position.set(17, 9, 30); // ตั้งค่าตำแหน่งสามเหลี่ยม
    triangleMesh.castShadow = true;
    triangleMesh.rotateY(Math.PI / 4);
    scene.add(triangleMesh);


    // สร้างพระอาทิตย์
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32); // ขนาดพระอาทิตย์
    const sunMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000  }); // สีเหลือง
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    sunMesh.position.set(5, 30, -15); // ตั้งตำแหน่งของพระอาทิตย์
    scene.add(sunMesh); // เพิ่มพระอาทิตย์ในฉาก

    // --- Cloud (group of spheres)
    function makeCloud(x, y, z) {
        const mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const c1 = new THREE.Mesh(new THREE.SphereGeometry(3, 16, 16), mat);
        const c2 = new THREE.Mesh(new THREE.SphereGeometry(2.5, 16, 17), mat);
        const c3 = new THREE.Mesh(new THREE.SphereGeometry(2.5, 16, 16), mat);
        c1.position.set(x, y, z);
        c2.position.set(x + 3, y, z - 1);
        c3.position.set(x - 3, y, z - 1);
        scene.add(c1, c2, c3);
    }
    makeCloud(10, 27, -10);
    makeCloud(-10, 30, -15);
    makeCloud(20, 40, -15);


    // Mountain
    const mout1 = new THREE.SphereGeometry( 21, 32, 16, 0, 3.15 );
    const colormout1 = new THREE.MeshStandardMaterial();
    colormout1.color = new THREE.Color(0, 0.4, 0);
    const mountain1 = new THREE.Mesh( mout1, colormout1 );
    mountain1.position.set(-15, 0, -15);
    mountain1.rotation.x = Math.PI * 1.5;
    mountain1.castShadow = true;
    mountain1.receiveShadow = true;
    scene.add( mountain1 );


    const mout2 = new THREE.SphereGeometry( 20, 40, 30, 0, 3.15 );
    const colormout2 = new THREE.MeshStandardMaterial();
    colormout2.color = new THREE.Color(0, 0.4, 0);
    const mountain2 = new THREE.Mesh( mout2, colormout2 );
    mountain2.position.set(25, 0, -15);
    mountain2.rotation.x = Math.PI * 1.5;
    mountain2.castShadow = true;
    mountain2.receiveShadow = true;
    scene.add( mountain2 );

// Mountain 3 - ตรงกลาง
    const mout3 = new THREE.SphereGeometry( 16, 32, 16, 0, 3.15 );
    const colormout3 = new THREE.MeshStandardMaterial();
    colormout3.color = new THREE.Color(0, 0.4, 0);
    const mountain3 = new THREE.Mesh( mout3, colormout3 );
    mountain3.position.set(-1, 0, -1);   // วางตรงกลางและถอยไปด้านหลังนิดหน่อย
    mountain3.rotation.x = Math.PI * 1.5;
    mountain3.castShadow = true;
    mountain3.receiveShadow = true;
    scene.add( mountain3 );
    
    // --- Tree
     function makeTree(x, z) {
        const trunk = new THREE.Mesh(
            new THREE.CylinderGeometry(0.6, 1, 7),
            new THREE.MeshStandardMaterial({ color: 0x654321 })
        );
        trunk.position.set(x, 3.5, z);
        trunk.castShadow = true;
        scene.add(trunk);

        const leaves = new THREE.Mesh(
            new THREE.SphereGeometry(3, 40, 20),
            new THREE.MeshStandardMaterial({ color: 0x2e8b57 })
        );
        leaves.position.set(x, 7, z);
        leaves.castShadow = true;
        scene.add(leaves);
    }
    makeTree(-5, 25);
    makeTree(-20, 18);
    makeTree(30, 35);
  

// สร้างบ่อน้ำ
function makePond(x, z, radius = 5, depth = 0.5) {
    const pondGeometry = new THREE.CylinderGeometry(radius, radius, depth, 32);
    const pondMaterial = new THREE.MeshStandardMaterial({
        color: 0x1e90ff,   // น้ำสีฟ้าเข้ม
        transparent: true,
        opacity: 0.7        // ทำให้น้ำใสเล็กน้อย
    });
    const pond = new THREE.Mesh(pondGeometry, pondMaterial);
    pond.position.set(x, depth / 2, z); // วางบนพื้น
    pond.receiveShadow = true;
    scene.add(pond);
}

// เรียกใช้สร้างบ่อน้ำตรงตำแหน่งที่ต้องการ
makePond(-20, 30, 10, 0.1);
  

// สร้างก้อนหิน
function makeRock(x, z, radius = 3, height = 3) {
    const rockGeometry = new THREE.DodecahedronGeometry(radius, 0); // ก้อนหินไม่เรียบ ใช้ Dodecahedron
    const rockMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x654321,   // สีเทาก้อนหิน
        roughness: 1
    });
    const rock = new THREE.Mesh(rockGeometry, rockMaterial);
    rock.position.set(x, height / 2, z); // วางบนพื้น
    rock.castShadow = true;
    rock.receiveShadow = true;
    scene.add(rock);
}

makeRock(-15, 38, 3); // ขวาหน้าบ่อน้ำ
makeRock(-13, 38, 0.9); // หลังบ่อน้ำ

    //ประตู
     const doo = new THREE.PlaneGeometry( 1.5, 2 );
    const colordoo = new THREE.MeshStandardMaterial();
    colordoo.color = new THREE.Color(0x1e90ff);
    const door = new THREE.Mesh( doo, colordoo );
    door.rotateOnAxis(new THREE.Vector3(0, 0, 0), -Math.PI / 10);
    door.position.set(17, 1, 33.6);
    door.castShadow = true;
    door.receiveShadow = true;
    scene.add( door );

    //หน้าต่าง
    const win1 = new THREE.PlaneGeometry( 1.2, 1.2 );
    const colorwin1 = new THREE.MeshStandardMaterial();
    colorwin1.color = new THREE.Color(0x8b4513  );
    const window1 = new THREE.Mesh( win1, colorwin1 );
    window1.rotateOnAxis(new THREE.Vector3(0, 0, 0), -Math.PI / 10);
    window1.position.set(15, 2, 33.6);
    window1.castShadow = true;
    window1.receiveShadow = true;
    scene.add( window1 );

    const win2 = new THREE.PlaneGeometry( 1.2, 1.2 );
    const colorwin2 = new THREE.MeshStandardMaterial();
    colorwin2.color = new THREE.Color(0x8b4513  );
    const window2 = new THREE.Mesh( win2, colorwin2 );
    window2.rotateOnAxis(new THREE.Vector3(0, 0, 0), -Math.PI / 10);
    window2.position.set(19, 2, 33.6);
    window2.castShadow = true;
    window2.receiveShadow = true;
    scene.add( window2 );


    // 1.2 3D Object : Light (Model Matrix)
    // ambient light
    const ambientLight = new THREE.AmbientLight();
    ambientLight.color = new THREE.Color(0.4, 0.4, 0.4);
    scene.add(ambientLight);
    // light
    const pointLight = new THREE.PointLight(
        new THREE.Color(2, 2, 2), // สีของแสง
        1000, // ความสว่างหรือความเข้มของแสง
        20000 // ระยะทางที่แสงส่องไปได้ก่อนจะหมดพลังงาน
    );
    pointLight.position.set(20, 50, 15);
    pointLight.castShadow = true;
    scene.add(pointLight);


    // 2. Camera : (View & Projection Matrix)
    const camera = new THREE.PerspectiveCamera(
        100, // Field of View
        window.innerWidth / window.innerHeight, // width:height
       1, // Near
        1000 // Far
    );
    camera.position.set(0, 5, 5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));


    // 3. Renderer : (Rasterization: 3D => 2D, Frame)
    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    function drawFrame() {
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(drawFrame);


    new OrbitControls(camera, renderer.domElement);
}  

