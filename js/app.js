

window.onload = function () {
    init();
}

function init(){
    // *** Get canvas ***
    const canvas = document.getElementById('gl-canvas');
    gl = canvas.getContext('webgl') || canvas.getContext("experimental-webgl");
    if (!gl) {
        alert('WebGL not supported');
        return;
    }

    // *** Computes the cube ***


    // *** Set viewport ***
    gl.viewport(0, 0, canvas.width, canvas.height)

    // *** Set color to the canvas ***
    gl.clearColor(1.0, 1.0, 1.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    // *** Initialize vertex and fragment shader ***
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);


}