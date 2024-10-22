/////////////////////////////////////////////////////////////////////////////
//
//  IndexedCube.js
//
//  A cube defined of 12 triangles using vertex indices.
//

class IndexedCube {
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
            -0.5, -0.5,  0.5,
             0.5, -0.5,  0.5,
             0.5,  0.5,  0.5,
            -0.5,  0.5,  0.5,
            -0.5, -0.5, -0.5,
             0.5, -0.5, -0.5,
             0.5,  0.5, -0.5,
            -0.5,  0.5, -0.5
        ]);

        const colors = new Float32Array([
            1.0, 1.0, 1.0, 1.0, 
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            0.0, 0.0, 0.0, 1.0, 
            0.0, 0.0, 0.0, 1.0,
            0.0, 0.0, 0.0, 1.0,
            0.0, 0.0, 0.0, 1.0
        ]);

        const indices = new Uint16Array([
            // Front 
            0, 1, 2,
            0, 2, 3,
            // Back 
            4, 5, 6,
            4, 6, 7,
            // Top 
            3, 2, 6,
            3, 6, 7,
            // Bottom 
            0, 1, 5,
            0, 5, 4,
            // Right 
            1, 2, 6,
            1, 6, 5,
            // Left 
            0, 3, 7,
            0, 7, 4
        ]);

        this.positionAttribute = new Attribute(gl, program, 'aPosition', positions, 3, gl.FLOAT);
        this.colorAttribute = new Attribute(gl, program, 'aColor', colors, 4, gl.FLOAT);
        this.indices = new Indices(gl, indices);

        this.draw = () => {
            program.use();

            this.positionAttribute.enable();
            this.colorAttribute.enable();
            this.indices.enable();

            gl.drawElements(gl.TRIANGLES, this.indices.count, this.indices.type, 0);

            this.positionAttribute.disable();
            this.colorAttribute.disable();
            this.indices.disable();
        };
    }
}
