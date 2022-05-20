let cubePointsArray = [];
let pyramidPointsArray = [];
let texCoordsArray = [];
let primitiveArray = [];
let cubeArray = [];

let gl;
let ctm;
let modelViewMatrix;
let program;

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

    // *** Set viewport ***
    gl.viewport(0, 0, canvas.width, canvas.height)

    // *** Set color to the canvas ***
    gl.clearColor(1.0, 1.0, 1.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    // *** Initialize vertex and fragment shader ***
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // TODO: Create the event listeners for the buttons



    function cube() {
        //initialize cube array
        cubePointsArray = [
            // Front
            0.5, 0.5, 0.5,
            0.5, -.5, 0.5,
            -.5, 0.5, 0.5,
            -.5, 0.5, 0.5,
            0.5, -.5, 0.5,
            -.5, -.5, 0.5,
            // Left
            -.5, 0.5, 0.5,
            -.5, -.5, 0.5,
            -.5, 0.5, -.5,
            -.5, 0.5, -.5,
            -.5, -.5, 0.5,
            -.5, -.5, -.5,
            // Back
            -.5, 0.5, -.5,
            -.5, -.5, -.5,
            0.5, 0.5, -.5,
            0.5, 0.5, -.5,
            -.5, -.5, -.5,
            0.5, -.5, -.5,
            // Right
            0.5, 0.5, -.5,
            0.5, -.5, -.5,
            0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, -.5, 0.5,
            0.5, -.5, -.5,
            // Top
            0.5, 0.5, 0.5,
            0.5, 0.5, -.5,
            -.5, 0.5, 0.5,
            -.5, 0.5, 0.5,
            0.5, 0.5, -.5,
            -.5, 0.5, -.5,
            // Bottom
            0.5, -.5, 0.5,
            0.5, -.5, -.5,
            -.5, -.5, 0.5,
            -.5, -.5, 0.5,
            0.5, -.5, -.5,
            -.5, -.5, -.5,
        ];
        texCoordsArray = [
            0, 0,
            0, 1,
            1, 1,
            0, 0,
            1, 1,
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            0, 0,
            1, 1,
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            0, 0,
            1, 1,
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            0, 0,
            1, 1,
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            0, 0,
            1, 1,
            1, 0,
            0, 0,
            0, 1,
            1, 1,
            0, 0,
            1, 1,
            1, 0,
        ];
    }
}


/**
 * Prepares the cube
 * @param cube
 */
function prepareCube() {

    // *** Send position data to the GPU ***
    let vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubePointsArray), gl.STATIC_DRAW);

    // *** Define the form of the data ***
    let vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    //TODO: Create Colors buffers for cube

    // *** Send texture data to the GPU ***
    let tBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoordsArray), gl.STATIC_DRAW);

    // *** Define the form of the data ***
    let vTexCoord = gl.getAttribLocation(program, "vTexCoord");
    gl.enableVertexAttribArray(vTexCoord);
    gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);

    // *** Get a pointer for the model viewer
    modelViewMatrix = gl.getUniformLocation(program, "modelViewMatrix");
    ctm = mat4.create();

}

/**
 * Prepares the pyramid
 * @param pyramid
 */
function prepareCube(pyramid) {

    // *** Send position data to the GPU ***
    let vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pyramidPointsArray), gl.STATIC_DRAW);

    // *** Define the form of the data ***
    let vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

    //TODO: Create Colors and texture buffers for pyramid

    // *** Get a pointer for the model viewer
    modelViewMatrix = gl.getUniformLocation(program, "modelViewMatrix");
    ctm = mat4.create();

}


/**
 * Adds a new primitive
 */
function addPrimitive(){
    let primitive = document.getElementById("primitiva").value;

    let valid = primitive;
    if (valid) {
        //TODO: Add a new primitive to the canvas

    }

}

/**
 * Applies the rotation to the selected primitive
 * @param primitive
 */
function applyRotation(){
    let primitiveName = document.getElementById("rotacao").value;
    let xRotation = document.getElementById("X_rotation").value;
    let yRotation = document.getElementById("Y_rotation").value;
    let zRotation = document.getElementById("Z_rotation").value;
    let valid = xRotation && yRotation && zRotation;
    if (valid){
        for (const obj of primitiveArray) {
            if (obj.name === primitiveName) {
                obj.rotation = {x: parseFloat(xRotation) * (Math.PI / 180),
                                y: parseFloat(yRotation) * (Math.PI / 180),
                                z: parseFloat(zRotation) * (Math.PI / 180)};
                break;
            }
        }
    }
}

function applyManipulation() {
    // Extract the information of the fields
    let primitiveName= document.getElementById("manip").value;
    let xscaleFactor = document.getElementById("Xscale_factor").value;
    let yscaleFactor = document.getElementById("Yscale_factor").value;
    let zscaleFactor = document.getElementById("Zscale_factor").value;
    let xTranslation = document.getElementById("X_translation").value;
    let yTranslation = document.getElementById("Y_translation").value;
    let zTranslation = document.getElementById("Z_translation").value;


    // If the form has all the fields field
    let valid = xscaleFactor && yscaleFactor && zscaleFactor && xTranslation && yTranslation && zTranslation;
    if (valid) {
        for (const obj of primitiveArray) {
            if (obj.name === primitiveName) {
                obj.scale =  {
                    x: parseFloat(xscaleFactor) / 100,
                    y: parseFloat(yscaleFactor) / 100,
                    z: parseFloat(zscaleFactor) / 100
                };
                obj.translation = {
                    x: parseFloat(xTranslation) / 100,
                    y: parseFloat(yTranslation) / 100,
                    z: parseFloat(zTranslation) / 100
                };
                break;
            }
        }
        // Append the cube object to the array
        //cubeArray.push(cube);
    }
}

function render() {

    // Clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    //TODO: prepare the primitives

    // Make the new frame
    requestAnimationFrame(render);

}


/**
 * Sets the texture
 * @param chosenImage
 */
function setTexture(chosenImage){

    // Set the image for the texture
    let image = new Image();
    image.src = chosenImage
    image.onload = function () {
        configureTexture(image);
    }
}

/**
 * Adds the texture to the primitive
 * @param image
 */
function configureTexture(image) {
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
}