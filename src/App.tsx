import React, {useEffect, useRef} from "react";
import initShaders from "./initShaders";
import {GeometryObject} from "../models/GeometryObject";

function App() {

    let pointsArray = useRef<any>([]);
    let colorsArray = useRef<any>([]);

    let objectsArray = useRef<GeometryObject[]>([]);

    let gl = useRef<any>(null);
    let ctm = useRef<any>(null);
    let modelViewMatrix = useRef<any>(null);
    let program = useRef<any>(null);

    window.onload = function () {
        init();
    }

    function init() {

        // *** Get canvas ***
        const canvas: any = document.getElementById('gl-canvas');
        gl.current = canvas.getContext('webgl.current') || canvas.getContext("experimental-webgl");
        if (!gl.current) {
            alert('Webgl.current not supported');
            return;
        }

        // *** Set viewport ***
        gl.current.viewport(0, 0, canvas.width, canvas.height)

        // *** Set color to the canvas ***
        gl.current.clearColor(1.0, 1.0, 1.0, 1.0)
        gl.current.clear(gl.current.COLOR_BUFFER_BIT | gl.current.DEPTH_BUFFER_BIT);
        gl.current.enable(gl.current.DEPTH_TEST);

        // *** Initialize vertex and fragment shader ***
        program.current = initShaders(gl.current, "vertex-shader", "fragment-shader");
        gl.current.useProgram(program.current);

        // *** Render ***
        render();
    }

    function createAndColorCube() {

        // console.log("objectsArray.current.length")
        // console.log(objectsArray.current.length)

        // Specify the coordinates to draw
        pointsArray.current[objectsArray.current.length] = [

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
            [hexToRgb(frontFaceColor)?.r! / 255, hexToRgb(frontFaceColor)?.g! / 255, hexToRgb(frontFaceColor)?.b! / 255],
            [hexToRgb(leftFaceColor)?.r! / 255, hexToRgb(leftFaceColor)?.g! / 255, hexToRgb(leftFaceColor)?.b! / 255],
            [hexToRgb(backFaceColor)?.r! / 255, hexToRgb(backFaceColor)?.g! / 255, hexToRgb(backFaceColor)?.b! / 255],
            [hexToRgb(rightFaceColor)?.r! / 255, hexToRgb(rightFaceColor)?.g! / 255, hexToRgb(rightFaceColor)?.b! / 255],
            [hexToRgb(topFaceColor)?.r! / 255, hexToRgb(topFaceColor)?.g! / 255, hexToRgb(topFaceColor)?.b! / 255],
            [hexToRgb(bottomFaceColor)?.r! / 255, hexToRgb(bottomFaceColor)?.g! / 255, hexToRgb(bottomFaceColor)?.b! / 255],
        ];

        colorsArray.current[objectsArray.current.length] = []
        // Set the color of the faces
        for (let face = 0; face < 6; face++) {
            let faceColor = vertexColors[face];
            for (let vertex = 0; vertex < 6; vertex++) {
                colorsArray.current[objectsArray.current.length].push(...faceColor);
            }
        }

        // console.log("New color array")
        // console.log(colorsArray.current)

    }

    function createAndColorPyramid() {

        // Specify the coordinates to draw
        pointsArray.current[objectsArray.current.length] = [
            // Pyramid front
            -.5, -.5, .5,
            0.5, -.5, .5,
            0, 0.5, 0,

            // Pyramid left
            -.5, -.5, .5,
            -.5, -.5, -.5,
            0, 0.5, 0,

            // Pyramid back
            -.5, -.5, -.5,
            0.5, -.5, -.5,
            0, 0.5, 0,

            // Pyramid right
            0.5, -.5, .5,
            0.5, -.5, -.5,
            0, 0.5, 0,

            // Pyramid bottom right
            -.5, -.5, .5,
            0.5, -.5, .5,
            0.5, -.5, -.5,

            // Pyramid bottom left
            -.5, -.5, -.5,
            0.5, -.5, -.5,
            -.5, -.5, .5,


        ];

        // Specify the colors of the faces
        let vertexColors = [
            [hexToRgb(frontFaceColor)?.r! / 255, hexToRgb(frontFaceColor)?.g! / 255, hexToRgb(frontFaceColor)?.b! / 255],
            [hexToRgb(leftFaceColor)?.r! / 255, hexToRgb(leftFaceColor)?.g! / 255, hexToRgb(leftFaceColor)?.b! / 255],
            [hexToRgb(backFaceColor)?.r! / 255, hexToRgb(backFaceColor)?.g! / 255, hexToRgb(backFaceColor)?.b! / 255],
            [hexToRgb(rightFaceColor)?.r! / 255, hexToRgb(rightFaceColor)?.g! / 255, hexToRgb(rightFaceColor)?.b! / 255],
            [hexToRgb(bottomFaceColor)?.r! / 255, hexToRgb(bottomFaceColor)?.g! / 255, hexToRgb(bottomFaceColor)?.b! / 255],
        ];

        colorsArray.current[objectsArray.current.length] = []
        // Set the color of the faces
        for (let face = 0; face < 4; face++) {
            let faceColor = vertexColors[face];
            for (let vertex = 0; vertex < 3; vertex++) {
                colorsArray.current[objectsArray.current.length].push(...faceColor);
            }
        }

        for (let face = 4; face < 5; face++) {
            let faceColor = vertexColors[face];
            for (let vertex = 0; vertex < 6; vertex++) {
                colorsArray.current[objectsArray.current.length].push(...faceColor);
            }
        }

    }

    function prepareGeometricShape(cube: any, pointsArrayIndex: number, colorsArrayIndex: number) {

        // console.log("Preparing geometric shape")
        // console.log(pointsArray.current[0]);

        // *** Send position data to the GPU ***
        let vBuffer = gl.current.createBuffer();
        gl.current.bindBuffer(gl.current.ARRAY_BUFFER, vBuffer);
        gl.current.bufferData(gl.current.ARRAY_BUFFER, new Float32Array(pointsArray.current[pointsArrayIndex]), gl.current.STATIC_DRAW);

        // *** Define the form of the data ***
        let vPosition = gl.current.getAttribLocation(program.current, "vPosition");
        gl.current.enableVertexAttribArray(vPosition);
        gl.current.vertexAttribPointer(vPosition, 3, gl.current.FLOAT, false, 0, 0);

        // *** Send color data to the GPU ***
        let cBuffer = gl.current.createBuffer();
        gl.current.bindBuffer(gl.current.ARRAY_BUFFER, cBuffer);
        gl.current.bufferData(gl.current.ARRAY_BUFFER, new Float32Array(colorsArray.current[colorsArrayIndex]), gl.current.STATIC_DRAW);

        // *** Define the color of the data ***
        let vColor = gl.current.getAttribLocation(program.current, "vColor");
        gl.current.enableVertexAttribArray(vColor);
        gl.current.vertexAttribPointer(vColor, 3, gl.current.FLOAT, false, 0, 0);

        // *** Get a pointer for the model viewer
        modelViewMatrix.current = gl.current.getUniformLocation(program.current, "modelViewMatrix");
        // @ts-ignore
        ctm.current = mat4.create();

        // *** Apply transformations ***
        // @ts-ignore
        mat4.scale(ctm.current, ctm.current, [cube.scale, cube.scale, cube.scale]);
        // @ts-ignore
        mat4.translate(ctm.current, ctm.current, [cube.translation.x, cube.translation.y, cube.translation.z]);

        // *** Rotate cube (if necessary) ***
        cube.currentRotation.x += cube.rotation.x;
        cube.currentRotation.y += cube.rotation.y;
        cube.currentRotation.z += cube.rotation.z;
        // @ts-ignore
        mat4.rotateX(ctm.current, ctm.current, cube.currentRotation.x);
        // @ts-ignore
        mat4.rotateY(ctm.current, ctm.current, cube.currentRotation.y);
        // @ts-ignore
        mat4.rotateZ(ctm.current, ctm.current, cube.currentRotation.z);

        // *** Transfer the information to the model viewer ***
        gl.current.uniformMatrix4fv(modelViewMatrix.current, false, ctm.current);

        // *** Draw the triangles ***
        gl.current.drawArrays(gl.current.TRIANGLES, 0, pointsArray.current[pointsArrayIndex].length / 3);

    }

    function addCube() {

        // *** Computes the cube ***
        createAndColorCube();

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
            objectsArray.current.push(cube);
            setNumberOfGeometricObjectsAdded(numberOfGeometricObjectsAdded + 1);
        } else {
            alert("Please fill all the fields");
        }
    }

    function addPyramid() {

        // *** Computes the cube ***
        createAndColorPyramid();

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
            objectsArray.current.push(cube);
            setNumberOfGeometricObjectsAdded(numberOfGeometricObjectsAdded + 1);
        } else {
            alert("Please fill all the fields");
        }
    }

    function render() {

        // Clear the canvas
        gl.current.clear(gl.current.COLOR_BUFFER_BIT | gl.current.DEPTH_BUFFER_BIT);

        let currentIndex = 0;

        //  Add the cubes to the canvas
        for (const cube of objectsArray.current) {
            prepareGeometricShape(cube, currentIndex, currentIndex);
            currentIndex++
        }

        // Make the new frame
        requestAnimationFrame(render);

    }

    function hexToRgb(hex: string) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }


    const [shape, setShape] = React.useState<"Cube" | "Pyramid">("Cube");

    const defaultXRotation = "0";
    const defaultYRotation = "0";
    const defaultZRotation = "0";
    const [xRotation, setXRotation] = React.useState(defaultXRotation);
    const [yRotation, setYRotation] = React.useState(defaultYRotation);
    const [zRotation, setZRotation] = React.useState(defaultZRotation);

    const defaultScaleFactor = "100";
    const [scaleFactor, setScaleFactor] = React.useState(defaultScaleFactor);

    const defaultXTranslation = "0";
    const defaultYTranslation = "0";
    const defaultZTranslation = "0";
    const [xTranslation, setXTranslation] = React.useState(defaultXTranslation);
    const [yTranslation, setYTranslation] = React.useState(defaultYTranslation);
    const [zTranslation, setZTranslation] = React.useState(defaultZTranslation);


    // Add geometry faces dropdown
    const defaultFrontFaceColor = "#ff0000";
    const defaultBackFaceColor = "#00ff00";
    const defaultLeftFaceColor = "#0000ff";
    const defaultRightFaceColor = "#ffff00";
    const defaultTopFaceColor = "#ff00ff";
    const defaultBottomFaceColor = "#00ffff";
    const [frontFaceColor, setFrontFaceColor] = React.useState(defaultFrontFaceColor);
    const [backFaceColor, setBackFaceColor] = React.useState(defaultBackFaceColor);
    const [leftFaceColor, setLeftFaceColor] = React.useState(defaultLeftFaceColor);
    const [rightFaceColor, setRightFaceColor] = React.useState(defaultRightFaceColor);
    const [topFaceColor, setTopFaceColor] = React.useState(defaultTopFaceColor);
    const [bottomFaceColor, setBottomFaceColor] = React.useState(defaultBottomFaceColor);
    const [selectedFace, setSelectedFace] = React.useState<"Front" | "Back" | "Left" | "Right" | "Top" | "Bottom">("Front");
    const [selectedFaceColor, setSelectedFaceColor] = React.useState(frontFaceColor);
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
            <option>Back</option>,
            <option>Bottom</option>
        ]
    }

    // Selected geometry shape dropdown
    const [numberOfGeometryShapesDropdown, setNumberOfGeometryShapesDropdown] = React.useState<JSX.Element[]>([])
    const [numberOfGeometricObjectsAdded, setNumberOfGeometricObjectsAdded] = React.useState(0);
    useEffect(() => {
        let newNumberOfGeometryShapesDropdown: JSX.Element[] = [];
        let currentIndex = 0
        newNumberOfGeometryShapesDropdown.push(<option value="420">New geometric shape</option>)
        for (const currentGeometryShape of objectsArray.current) {
            newNumberOfGeometryShapesDropdown.push(
                <option value={currentIndex}>Geometric
                    object: {currentIndex}</option>)
            currentIndex++
        }
        setNumberOfGeometryShapesDropdown(newNumberOfGeometryShapesDropdown)
    }, [numberOfGeometricObjectsAdded])

    // Selected geometry
    const [selectedGeometryToEdit, setSelectedGeometryToEdit] = React.useState<string>("420");
    useEffect(() => {
        if (selectedGeometryToEdit === "420") {
            setXTranslation(defaultXTranslation);
            setYTranslation(defaultYTranslation);
            setZTranslation(defaultZTranslation);
            setScaleFactor(defaultScaleFactor);
            setXRotation(defaultXRotation);
            setYRotation(defaultYRotation);
            setZRotation(defaultZRotation);
        } else {
            setXTranslation((objectsArray.current[parseInt(selectedGeometryToEdit)].translation.x * 100).toString());
            setYTranslation((objectsArray.current[parseInt(selectedGeometryToEdit)].translation.y * 100).toString());
            setZTranslation((objectsArray.current[parseInt(selectedGeometryToEdit)].translation.z * 100).toString());
            setScaleFactor((objectsArray.current[parseInt(selectedGeometryToEdit)].scale * 100).toString());
            setXRotation((objectsArray.current[parseInt(selectedGeometryToEdit)].rotation.x / (Math.PI / 180)).toString());
            setYRotation((objectsArray.current[parseInt(selectedGeometryToEdit)].rotation.y / (Math.PI / 180)).toString());
            setZRotation((objectsArray.current[parseInt(selectedGeometryToEdit)].rotation.z / (Math.PI / 180)).toString());
        }
    }, [selectedGeometryToEdit])

    // Transformation button
    let setTransformationButton;
    if (selectedGeometryToEdit !== "420") {
        setTransformationButton = <button
            onClick={(e) => {
                objectsArray.current[parseInt(selectedGeometryToEdit)].scale = parseInt(scaleFactor) / 100
                objectsArray.current[parseInt(selectedGeometryToEdit)].translation.x = parseInt(xTranslation) / 100
                objectsArray.current[parseInt(selectedGeometryToEdit)].translation.y = parseInt(yTranslation) / 100
                objectsArray.current[parseInt(selectedGeometryToEdit)].translation.z = parseInt(zTranslation) / 100
            }}
        >
            Set transformation
        </button>
    }

    let resetTransformationButton;
    if (selectedGeometryToEdit !== "420") {
        resetTransformationButton = <button
            onClick={(e) => {
                objectsArray.current[parseInt(selectedGeometryToEdit)].scale = parseInt(defaultScaleFactor) / 100
                objectsArray.current[parseInt(selectedGeometryToEdit)].translation.x = parseInt(defaultXTranslation) / 100
                objectsArray.current[parseInt(selectedGeometryToEdit)].translation.y = parseInt(defaultYTranslation) / 100
                objectsArray.current[parseInt(selectedGeometryToEdit)].translation.z = parseInt(defaultZTranslation) / 100
            }}
        >
            Reset transformation
        </button>
    }

    // Set animation button
    let setAnimationButton;
    if (selectedGeometryToEdit !== "420") {
        setAnimationButton = <button
            onClick={(e) => {
                objectsArray.current[parseInt(selectedGeometryToEdit)].rotation.x = parseInt(xRotation) * (Math.PI / 180)
                objectsArray.current[parseInt(selectedGeometryToEdit)].rotation.y = parseInt(yRotation) * (Math.PI / 180)
                objectsArray.current[parseInt(selectedGeometryToEdit)].rotation.z = parseInt(zRotation) * (Math.PI / 180)
            }}
        >
            Set animation
        </button>
    }

    // Stop animation button
    let stopAnimationButton;
    if (selectedGeometryToEdit !== "420") {
        stopAnimationButton = <button
            onClick={(e) => {
                objectsArray.current[parseInt(selectedGeometryToEdit)].rotation.x = 0
                objectsArray.current[parseInt(selectedGeometryToEdit)].rotation.y = 0
                objectsArray.current[parseInt(selectedGeometryToEdit)].rotation.z = 0
            }}
        >
            Stop animation
        </button>
    }

    // Delete geometry button
    let deleteGeometryButton;
    if (selectedGeometryToEdit !== "420") {
        deleteGeometryButton = <button
            onClick={(e) => {
                objectsArray.current.splice(parseInt(selectedGeometryToEdit), 1)
                setSelectedGeometryToEdit("420")
                const select = document.querySelector('#geometryToEdit');
                // @ts-ignore
                select!.value = '420'
                setNumberOfGeometricObjectsAdded(numberOfGeometricObjectsAdded - 1)
            }}
        >
            Delete geometry
        </button>
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
                        <div className="col-8">

                            <h2>Rotation</h2>
                            X: <input type="number" id="X_rotation" name="X_rotation" value={xRotation}
                                      onChange={(e) => {
                                          setXRotation(e.target.value)
                                      }}
                        />
                            <br/>
                            Y: <input type="number" id="Y_rotation" name="Y_rotation" value={yRotation}
                                      onChange={(e) => {
                                          setYRotation(e.target.value)
                                      }}
                        />
                            <br/>
                            Z: <input type="number" id="Z_rotation" name="Z_rotation" value={zRotation}
                                      onChange={(e) => {
                                          setZRotation(e.target.value)
                                      }}
                        /> <br/>
                        </div>

                        <div className="col m-3">

                            <div className="row m-3">
                                <div className="col">
                                    {setAnimationButton}
                                </div>
                            </div>

                            <div className="row m-3">
                                <div className="col">
                                    {stopAnimationButton}
                                </div>
                            </div>


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

                        <div className="col">

                            <div className="row m-2">
                                <button id="add_cube"
                                        onClick={() => {
                                            if (selectedGeometryToEdit === "420") {
                                                if (numberOfGeometricObjectsAdded > 4) alert("Already added 5 objects")
                                                else {
                                                    if (shape === "Cube") addCube()
                                                    else if (shape === "Pyramid") addPyramid()
                                                }
                                            } else alert("Please select the choice to add a new geometric object.")

                                        }}
                                >
                                    Add {shape}
                                </button>
                            </div>

                            <div className="row m-2">
                                <select id="geometryToEdit" onChange={(e) => {
                                    setSelectedGeometryToEdit(e.target.value)
                                }}>
                                    {numberOfGeometryShapesDropdown}
                                </select>
                            </div>
                        </div>


                    </div>

                    {/*Scaling and translation*/}
                    <div className="row border border-primary m-3">

                        <div className="row">

                            {/*Scaling and translation*/}
                            <div className="col-8">
                                {/*Scaling*/}
                                <div className="row">
                                    <div className="col">
                                        <h2>Scale</h2>
                                        <input type="number" id="scale_factor" value={scaleFactor}
                                               onChange={(e) => {
                                                   e.preventDefault()
                                                   setScaleFactor(e.target.value)
                                               }}
                                        /> % <br/>
                                    </div>
                                </div>
                                {/*Translation*/}
                                <div className="row">
                                    <div className="col">
                                        <h2>Translation</h2>
                                        X: <input type="number" id="X_translation" value={xTranslation}
                                                  onChange={(e) => {
                                                      e.preventDefault()
                                                      setXTranslation(e.target.value)
                                                  }}
                                    /> % <br/>
                                        Y: <input type="number" id="Y_translation" value={yTranslation}
                                                  onChange={(e) => {
                                                      e.preventDefault()
                                                      setYTranslation(e.target.value)
                                                  }}
                                    /> % <br/>
                                        Z: <input type="number" id="Z_translation" value={zTranslation}
                                                  onChange={(e) => {
                                                      e.preventDefault()
                                                      setZTranslation(e.target.value)
                                                  }}
                                    /> % <br/>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="row m-2">
                                    {setTransformationButton}
                                </div>
                                <div className="row m-2">
                                    {resetTransformationButton}
                                </div>
                                <div className="row m-2">
                                    {deleteGeometryButton}
                                </div>
                            </div>

                        </div>

                    </div>


                </div>


            </div>

        </div>
    );
}

export default App;
