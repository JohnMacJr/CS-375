/////////////////////////////////////////////////////////////////////////////
//
//  BasicCube.js
//
//  A cube defined of 12 triangles
//

class BasicCube {
    constructor(gl, vertexShader, fragmentShader) {

        vertexShader ||= `
            uniform mat4 P;
            uniform mat4 MV;
            in vec4 aPosition;
            in vec4 aColor; 
            out vec4 vColor;
            void main() {
                gl_Position = P * MV * aPosition;
                vColor = aColor;
            }
        `;
        fragmentShader ||= `
            in vec4 vColor;
            out vec4 fColor;
            void main() {
                fColor = vColor;
            }
        `

        let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);

        const positions = new Float32Array([
            // Front face
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,  
            0.5, 0.5, 0.5,  
            -0.5, -0.5, 0.5,
            0.5, 0.5, 0.5,  
            -0.5, 0.5, 0.5,  
            // Back face
            -0.5, -0.5, -0.5,  
            0.5, -0.5, -0.5,  
            0.5, 0.5, -0.5,  
            -0.5, -0.5, -0.5,  
            0.5, 0.5, -0.5,  
            -0.5, 0.5, -0.5,  
            // Top face
            -0.5, 0.5, 0.5,  
            0.5, 0.5, 0.5,  
            0.5, 0.5, -0.5,  
            -0.5, 0.5, 0.5,  
            0.5, 0.5, -0.5,  
            -0.5, 0.5, -0.5,  
            // Bottom face
            -0.5, -0.5, 0.5,  
            0.5, -0.5, 0.5,  
            0.5, -0.5, -0.5,  
            -0.5, -0.5, 0.5,  
            0.5, -0.5, -0.5,  
            -0.5, -0.5, -0.5,  
            // Right face
            0.5, -0.5, 0.5,  
            0.5, -0.5, -0.5,  
            0.5, 0.5, -0.5,  
            0.5, -0.5, 0.5,  
            0.5, 0.5, -0.5,  
            0.5, 0.5, 0.5,  
            // Left face
            -0.5, -0.5, 0.5,  
            -0.5, -0.5, -0.5,  
            -0.5, 0.5, -0.5,  
            -0.5, -0.5, 0.5,  
            -0.5, 0.5, -0.5,  
            -0.5, 0.5, 0.5,  
        ]);

        const colors = new Float32Array([
            // Front face 
            0.0, 0.0, 0.0, 1.0, 
            0.0, 0.0, 0.0, 1.0, 
            0.0, 0.0, 0.0, 1.0, 
            0.0, 0.0, 0.0, 1.0, 
            0.0, 0.0, 0.0, 1.0, 
            0.0, 0.0, 0.0, 1.0, 
            // Back face 
            1.0, 1.0, 1.0, 1.0, 
            1.0, 1.0, 1.0, 1.0, 
            1.0, 1.0, 1.0, 1.0, 
            1.0, 1.0, 1.0, 1.0, 
            1.0, 1.0, 1.0, 1.0, 
            1.0, 1.0, 1.0, 1.0, 
            // Top face 
            1.0, 0.5, 0.0, 1.0, 
            1.0, 0.5, 0.0, 1.0, 
            1.0, 0.5, 0.0, 1.0, 
            1.0, 0.5, 0.0, 1.0, 
            1.0, 0.5, 0.0, 1.0, 
            1.0, 0.5, 0.0, 1.0, 
            // Bottom face 
            0.5, 0.0, 1.0, 1.0, 
            0.5, 0.0, 1.0, 1.0, 
            0.5, 0.0, 1.0, 1.0, 
            0.5, 0.0, 1.0, 1.0, 
            0.5, 0.0, 1.0, 1.0, 
            0.5, 0.0, 1.0, 1.0, 
            // Right face 
            0.0, 1.0, 0.0, 1.0, 
            0.0, 1.0, 0.0, 1.0, 
            0.0, 1.0, 0.0, 1.0, 
            0.0, 1.0, 0.0, 1.0, 
            0.0, 1.0, 0.0, 1.0, 
            0.0, 1.0, 0.0, 1.0, 
            // Left face 
            0.0, 0.0, 1.0, 1.0, 
            0.0, 0.0, 1.0, 1.0, 
            0.0, 0.0, 1.0, 1.0, 
            0.0, 0.0, 1.0, 1.0, 
            0.0, 0.0, 1.0, 1.0, 
            0.0, 0.0, 1.0, 1.0, 
        ]);

        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        this.colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

        this.draw = () => {
            program.use();

            gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
            const positionLocation = gl.getAttribLocation(program.program, 'aPosition');
            gl.enableVertexAttribArray(positionLocation);
            gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
            const colorLocation = gl.getAttribLocation(program.program, 'aColor');
            gl.enableVertexAttribArray(colorLocation);
            gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);

            gl.drawArrays(gl.TRIANGLES, 0, positions.length / 3);

            gl.disableVertexAttribArray(positionLocation);
            gl.disableVertexAttribArray(colorLocation);
        };
    }
};