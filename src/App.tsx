import React from "react";

function App() {

    const [shape, setShape] = React.useState<"Cube" | "Pyramid">("Cube");

    const [xRotation, setXRotation] = React.useState(0);
    const [yRotation, setYRotation] = React.useState(0);
    const [zRotation, setZRotation] = React.useState(0);

    const [scale, setScale] = React.useState(100);

    const [translateX, setTranslateX] = React.useState(0);
    const [translateY, setTranslateY] = React.useState(0);
    const [translateZ, setTranslateZ] = React.useState(0);

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
                                          setXRotation(parseInt(e.target.value))
                                      }}
                        />
                            <br/>
                            Y: <input type="number" id="Y_rotation" name="Y_rotation"
                                      onChange={(e) => {
                                          setYRotation(parseInt(e.target.value))
                                      }}
                        />
                            <br/>
                            Z: <input type="number" id="Z_rotation" name="Z_rotation"></input> <br></br>
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
                                        <option value="cube">Cube</option>
                                        <option value="pyramid">Pyramid</option>
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
                            <button id="add_cube">Add cube</button>
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
