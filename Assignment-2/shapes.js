let gl = undefined;
let size = 0.0;
let angle = 0.0;
let ms;
let cone;
let cylinder;
let tetra;

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }

    gl.clearColor(0.13, 0.0, 0.12, 1.0);
    gl.enable(gl.DEPTH_TEST);

    cone = new Cone(gl, 36);
    cone.color = vec4(0.9, 0.5, 0.3, 1.0);

    cylinder = new Cylinder(gl,36);
    cylinder.color = vec4(0.94, 0.35, 0.35, 1.0);

    tetra = new Tetrahedron(gl);
    tetra.color = vec4(0.8, 0.73, 0.28, 1.0);

    ms = new MatrixStack();

    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    angle += 1.0;
    angle %= 360.0;
    size += 0.001;

    if (size >= 0.4) {
        size -= 0.8;
    } else if (size <= -0.2) {
        size += 0.1;
    }

    ms.push();
    ms.translate([0.5, 0.5, 0.0]);
    ms.rotate(angle, [0, 1, 1]);
    ms.scale(0.1);
    cone.MV = ms.current();  
    cone.draw();             
    ms.pop();

    ms.push();
    ms.translate([-0.5, -0.5, 0.0]);
    ms.rotate(angle, [1, 0, 0]);
    ms.scale(0.15);
    cylinder.MV = ms.current();
    cylinder.draw();
    ms.pop();

    ms.push();
    ms.translate([-0.4, 0.4, 0.0]);
    ms.rotate(angle, [0, 1, 1]);
    ms.scale(size);
    tetra.MV = ms.current();
    tetra.draw();
    ms.pop();
    
    requestAnimationFrame(render);
}

window.onload = init;
