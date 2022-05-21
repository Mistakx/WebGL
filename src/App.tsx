import React from "react";
import initShaders from "./initShaders";

function App() {

    let pointsArray: any = [];
    let colorsArray: any = [];

    let cubeArray: any = [];

    let gl: any;
    let ctm: any;
    let modelViewMatrix: any;

    let program: any;

    window.onload = function () {
        init();
    }

    function init() {

        // *** Get canvas ***
        const canvas: any = document.getElementById('gl-canvas');
        gl = canvas.getContext('webgl') || canvas.getContext("experimental-webgl");
        if (!gl) {
            alert('WebGL not supported');
            return;
        }

        // *** Computes the cube ***
        colorCube();

        // *** Set viewport ***
        gl.viewport(0, 0, canvas.width, canvas.height)

        // *** Set color to the canvas ***
        gl.clearColor(1.0, 1.0, 1.0, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        // *** Initialize vertex and fragment shader ***
        program = initShaders(gl, "vertex-shader", "fragment-shader");
        gl.useProgram(program);

        // *** Create the event listeners for the buttons
        document.getElementById("add_cube")!.onclick = function () {
            addCube();
        };

        // *** Render ***
        render();
    }

    function colorCube() {

        // Specify the coordinates to draw
        pointsArray = [
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

        // Specify the colors of the faces
        let vertexColors = [
            [1.0, 1.0, 0.0], // yellow
            [0.0, 1.0, 0.0], // green
            [0.0, 0.0, 1.0], // blue
            [1.0, 0.0, 1.0], // magenta
            [0.0, 1.0, 1.0], // cyan
            [1.0, 0.0, 0.0], // red
        ];

        // Set the color of the faces
        for (let face = 0; face < 6; face++) {
            let faceColor = vertexColors[face];
            for (let vertex = 0; vertex < 6; vertex++) {
                colorsArray.push(...faceColor);
            }
        }

    }

    function prepareCube(cube: any) {

        // *** Send position data to the GPU ***
        let vBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointsArray), gl.STATIC_DRAW);

        // *** Define the form of the data ***
        let vPosition = gl.getAttribLocation(program, "vPosition");
        gl.enableVertexAttribArray(vPosition);
        gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

        // *** Send color data to the GPU ***
        let cBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsArray), gl.STATIC_DRAW);

        // *** Define the color of the data ***
        let vColor = gl.getAttribLocation(program, "vColor");
        gl.enableVertexAttribArray(vColor);
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);

        // *** Get a pointer for the model viewer
        modelViewMatrix = gl.getUniformLocation(program, "modelViewMatrix");
        // @ts-ignore
        ctm = mat4.create();

        // *** Apply transformations ***
        // @ts-ignore
        mat4.scale(ctm, ctm, [cube.scale, cube.scale, cube.scale]);
        // @ts-ignore
        mat4.translate(ctm, ctm, [cube.translation.x, cube.translation.y, cube.translation.z]);

        // *** Rotate cube (if necessary) ***
        cube.currentRotation.x += cube.rotation.x;
        cube.currentRotation.y += cube.rotation.y;
        cube.currentRotation.z += cube.rotation.z;
        // @ts-ignore
        mat4.rotateX(ctm, ctm, cube.currentRotation.x);
        // @ts-ignore
        mat4.rotateY(ctm, ctm, cube.currentRotation.y);
        // @ts-ignore
        mat4.rotateZ(ctm, ctm, cube.currentRotation.z);

        // *** Transfer the information to the model viewer ***
        gl.uniformMatrix4fv(modelViewMatrix, false, ctm);

        // *** Draw the triangles ***
        gl.drawArrays(gl.TRIANGLES, 0, pointsArray.length / 3);

    }

    function addCube() {
        // Extract the information of the fields
        let scaleFactor = (document.getElementById("scale_factor") as any).value;
        let xTranslation = (document.getElementById("X_translation") as any).value;
        let yTranslation = (document.getElementById("Y_translation") as any).value;
        let zTranslation = (document.getElementById("Z_translation") as any).value;
        let xRotation = (document.getElementById("X_rotation") as any).value;
        let yRotation = (document.getElementById("Y_rotation") as any).value;
        let zRotation = (document.getElementById("Z_rotation") as any).value;

        // If the form has all the fields field
        let valid = scaleFactor && xTranslation && yTranslation && zTranslation && xRotation && yRotation && zRotation;
        if (valid) {
            // Create the cube object
            let cube = {
                scale: parseFloat(scaleFactor) / 100,
                translation: {
                    x: parseFloat(xTranslation) / 100,
                    y: parseFloat(yTranslation) / 100,
                    z: parseFloat(zTranslation) / 100
                },
                rotation: {
                    x: parseFloat(xRotation) * (Math.PI / 180),
                    y: parseFloat(yRotation) * (Math.PI / 180),
                    z: parseFloat(zRotation) * (Math.PI / 180)
                },
                currentRotation: {
                    x: 0,
                    y: 0,
                    z: 0,
                }
            }
            // Append the cube object to the array
            cubeArray.push(cube);
        }

    }

    function render() {

        // Clear the canvas
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //  Add the cubes to the canvas
        for (const cube of cubeArray) {
            prepareCube(cube);
        }

        // Make the new frame
        requestAnimationFrame(render);

    }


    const [shape, setShape] = React.useState<"Cube" | "Pyramid">("Cube");

    const [xRotation, setXRotation] = React.useState("0");
    const [yRotation, setYRotation] = React.useState("0");
    const [zRotation, setZRotation] = React.useState("0");

    const [scaleFactor, setScaleFactor] = React.useState("100");

    const [xTranslation, setXTranslation] = React.useState("10");
    const [yTranslation, setYTranslation] = React.useState("1");
    const [zTranslation, setZTranslation] = React.useState("0");

    const [frontFaceColor, setFrontFaceColor] = React.useState("#ff0000");
    const [backFaceColor, setBackFaceColor] = React.useState("#00ff00");
    const [leftFaceColor, setLeftFaceColor] = React.useState("#0000ff");
    const [rightFaceColor, setRightFaceColor] = React.useState("#ffff00");
    const [topFaceColor, setTopFaceColor] = React.useState("#ff00ff");
    const [bottomFaceColor, setBottomFaceColor] = React.useState("#00ffff");
    const [selectedFace, setSelectedFace] = React.useState<"Front" | "Back" | "Left" | "Right" | "Top" | "Bottom">("Front");
    const [selectedFaceColor, setSelectedFaceColor] = React.useState("#ffffff");

    let shapeFacesDropdown;
    if (shape === "Cube") {
        shapeFacesDropdown = [
            <option>Front</option>,
            <option>Left</option>,
            <option>Right</option>,
            <option>Back</option>,
            <option>Top</option>,
            <option>Bottom</option>
        ]
    } else if (shape === "Pyramid") {
        shapeFacesDropdown = [
            <option>Front</option>,
            <option>Left</option>,
            <option>Right</option>,
            <option>Back</option>
        ]
    }

    function hexToRgb(hex: string) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    return (
        <div className="container">

            <div className="row">

                {/*Canvas and rotation*/}
                <div className="col ">

                    <div className="row border border-primary m-3">
                        <div className="col">
                            <canvas id="gl-canvas" width="600" height="600">
                                Sorry, but your browser does not support HTML5's canvas element.
                            </canvas>
                        </div>
                    </div>

                    <div className="row border border-primary m-3">
                        <div className="col">
                            <h2>Rotation</h2>
                            X: <input type="number" id="X_rotation" name="X_rotation"
                                      onChange={(e) => {
                                          setXRotation(e.target.value)
                                      }}
                        />
                            <br/>
                            Y: <input type="number" id="Y_rotation" name="Y_rotation"
                                      onChange={(e) => {
                                          setYRotation(e.target.value)
                                      }}
                        />
                            <br/>
                            Z: <input type="number" id="Z_rotation" name="Z_rotation"
                                      onChange={(e) => {
                                          setZRotation(e.target.value)
                                      }}
                        /> <br/>
                        </div>
                    </div>

                </div>

                {/*Color, scaling, translation*/}
                <div className="col">

                    {/*Shape and color*/}
                    <div className="row border border-primary m-3">

                        <div className="col">
                            <div className="row">

                                <div className="col m-2">
                                    <label>Choose a shape:</label>
                                    <select name="geometricShapeToAdd" id="geometricShapeToAdd"
                                            onChange={(e) => {
                                                setShape(e.target.value as "Cube" | "Pyramid")
                                                console.log("Set shape to " + e.target.value)
                                            }}>
                                        <option>Cube</option>
                                        <option>Pyramid</option>
                                    </select>
                                    <br/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col m-2">
                                    <h2>Color</h2>
                                    <select onChange={(e) => {
                                        setSelectedFace(e.target.value as "Front" | "Back" | "Left" | "Right" | "Top" | "Bottom")
                                        console.log("Set face to " + e.target.value)
                                        switch (e.target.value) {
                                            case "Front":
                                                setSelectedFaceColor(frontFaceColor)
                                                console.log("Face has color: " + frontFaceColor)
                                                break
                                            case "Back":
                                                setSelectedFaceColor(backFaceColor)
                                                break
                                            case "Left":
                                                setSelectedFaceColor(leftFaceColor)
                                                break
                                            case "Right":
                                                setSelectedFaceColor(rightFaceColor)
                                                break
                                            case "Top":
                                                setSelectedFaceColor(topFaceColor)
                                                break
                                            case "Bottom":
                                                setSelectedFaceColor(bottomFaceColor)
                                                break
                                        }
                                    }}>
                                        {shapeFacesDropdown}
                                    </select>
                                    <input type="color" id="colorSelector" value={selectedFaceColor}
                                           onChange={(e) => {
                                               e.preventDefault()
                                               console.log("Set color to " + e.target.value)
                                               setSelectedFaceColor(e.target.value)
                                               switch (selectedFace) {
                                                   case "Front":
                                                       setFrontFaceColor(e.target.value)
                                                       break
                                                   case "Back":
                                                       setBackFaceColor(e.target.value)
                                                       break
                                                   case "Left":
                                                       setLeftFaceColor(e.target.value)
                                                       break
                                                   case "Right":
                                                       setRightFaceColor(e.target.value)
                                                       break
                                                   case "Top":
                                                       setTopFaceColor(e.target.value)
                                                       break
                                                   case "Bottom":
                                                       setBottomFaceColor(e.target.value)
                                                       break
                                               }
                                           }}
                                    />

                                </div>
                            </div>
                        </div>

                        <div className="col m-2">
                            <button id="add_cube"
                                    onClick={() => {
                                        addCube()
                                        console.log({zRotation})
                                    }}
                            >
                                Add {shape}</button>
                        </div>


                    </div>

                    {/*Scaling*/}
                    <div className="row border border-primary m-3">
                        <div className="col border">
                            <h2>Scale</h2>
                            <input type="number" id="scale_factor"/> % <br/>
                        </div>
                    </div>

                    {/*Translation*/}
                    <div className="row border border-primary m-3">
                        <div className="col">
                            <h2>Translation</h2>
                            X: <input type="number" id="X_translation"/> % <br/>
                            Y: <input type="number" id="Y_translation"/> % <br/>
                            Z: <input type="number" id="Z_translation"/> % <br/>
                        </div>
                    </div>

                </div>


            </div>


        </div>
    );
}

export default App;
