let gl = undefined;
let angle = 0.0;
let ms;
let cone;

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }

    gl.clearColor(0.4, 0.5, 0.8, 1.0);
    gl.enable(gl.DEPTH_TEST);

    cone = new Cone(gl, 36);
    ms = new MatrixStack();

    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    angle += 1.0;
    angle %= 360.0;

    ms.push();
    ms.translate([0.5, 0.5, 0.0]);
    ms.rotate(angle, [0, 1, 1]);
    ms.scale(0.1);
    cone.MV = ms.current();  
    cone.draw();             
    ms.pop();
    
    requestAnimationFrame(render);
}

window.onload = init;
