const I0 = 1e-12
const canvas1 = document.getElementById('canvas')
const infoDOM = document.getElementById('info')
const disco = new Disco(40, 20, canvas1, infoDOM)
let  protection = 20;


const heatmap = document.getElementById('heatmap')
const heatmapctx = heatmap.getContext('2d')

var gradient = heatmapctx.createLinearGradient(0,heatmap.height/2, heatmap.width, heatmap.height/2);

for(let i = 0; i < 1; i += 0.1) {
  gradient.addColorStop(i, heatMapColorforValue(i));

}

heatmapctx.fillStyle = gradient

heatmapctx.fillRect(0, 0, heatmap.width, heatmap.height);


