export default {
  drawPlant: function(ctx, xPos, yPos, radius, plant) {
    if(plant == undefined) {
      this.drawStandard(ctx, xPos, yPos, radius);
    } else {
      switch(plant.plant_type){
        case 'Shrub':
          this.drawShrub(ctx, xPos, yPos, radius);
          break;
        default:
          this.drawStandard(ctx, xPos, yPos, radius);
          break;
      }
    }
  },

  drawStandard: function(ctx, xPos, yPos, radius) {
    ctx.beginPath();
    ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
    ctx.fill();
  },

  drawShrub: function(ctx, xPos, yPos, radius) {
    ctx.beginPath();

    const shrubRadius = radius * 0.5;
    const shrubCurlCount = 8;
    const shrubCurlRadius = radius * 0.5;

    for(let i = 0; i < 8  ; i++) {
      ctx.arc(xPos - shrubRadius * Math.sin(2 * Math.PI * i / shrubCurlCount),
              yPos + shrubRadius * Math.cos(2 * Math.PI * i / shrubCurlCount),
              Math.max(shrubCurlRadius, 2),
              2 * Math.PI * ((i - 1) / shrubCurlCount),
              2 * Math.PI * (i + shrubCurlCount / 2) / shrubCurlCount);
      ctx.fill();
    }

  }
}
