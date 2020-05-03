class Terrain {
    constructor(seed, width, height, ctx) {
        this.openSimplex = openSimplexNoise(seed)
        this.detail = 100
        this.zoom = 100
        this.height = height
        this.width = width
        this.ctx = ctx
        this.time = 0
        this.waterLevel = 0.5
    }
    drawFrame() {
        const imageData = this.ctx.createImageData(this.width, this.height)
        let index = 0
        for(let y = 0; y < this.height; y++) {
            for(let x = 0; x < this.width; x++) {
                const n = (this.openSimplex.noise3D(x / this.zoom, y / this.zoom, this.time) + 1)/2;
                let value = [0, 255, 0]
                if(n < this.waterLevel) value = [0, 0, 255]
                imageData.data[index++] = value[0];
                imageData.data[index++] = value[1];
                imageData.data[index++] = value[2];
                imageData.data[index++] = 255;
            }
        }
        ctx.putImageData(imageData, 0, 0)
    }
}