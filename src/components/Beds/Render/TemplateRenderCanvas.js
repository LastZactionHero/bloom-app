import React from 'react';

class TemplateRenderCanvas extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    setTimeout( () => {
      this.renderBed();
    })
  }

  renderBed = () => {
    let ctx = this.refs.canvas.getContext('2d');

    let bedRenderWidth = this.props.renderWidth;
    let bedRenderHeight = this.props.renderHeight;
    if(this.props.legend) {
      bedRenderWidth -= 30;
      bedRenderHeight -= 30;
    }
    // Determine Image Scaling
    let xImageScale = bedRenderWidth / this.props.placementWidth;
    let yImageScale = bedRenderHeight / this.props.placementHeight;
    let imageScale = Math.min(xImageScale, yImageScale);

    const lineWidth = 1;
    const colorBrown = '#c9b89d';
    const colorGreen = '#27ae60';
    const colorLightGreen = '#2ecc71';
    const colorBlack = '#000000';
    const colorGray = '#7f8c8d';
    const colorDarkGray = '#2c3e50';

    const colorYellow = '#f1c40f';
    const colorBlue   = '#3498db';
    const colorPurple = '#9b59b6';
    const colorOrange = '#f39c12';
    const colorRed    = '#e74c3c';
    const highlightColors = [
      colorBlue,
      colorPurple,
      colorOrange,
      colorRed,
      colorYellow
    ]

    // Draw Total Border
    if(this.props.legend) {
      const legendXStartY = imageScale * this.props.placementHeight;
      const legendYStartX = imageScale * this.props.placementWidth;

      // X Legend
      for(let tick = 1; tick < this.props.placementWidth / 12; tick++){
        const xTickPosn = tick * 12 * imageScale;
        ctx.beginPath();
        ctx.moveTo(xTickPosn + 1, legendXStartY);
        ctx.lineTo(xTickPosn + 1, legendXStartY + 10);
        ctx.stroke();

        ctx.font="12px Helvetica";
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.fillText(`${tick}'`, xTickPosn, legendXStartY + 24);
      }

      // Y Legend
      for(let tick = 1; tick < this.props.placementHeight / 12; tick++){
        const yTickPosn = tick * 12 * imageScale;
        ctx.beginPath();
        ctx.moveTo(legendYStartX, yTickPosn);
        ctx.lineTo(legendYStartX + 10, yTickPosn);
        ctx.stroke();

        ctx.font="12px Helvetica";
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';
        ctx.fillText(`${tick}'`, legendYStartX + 12, yTickPosn + 4);
      }

    }

    // Draw Placement Border
    ctx.strokeStyle = colorBlack;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(0, 0, imageScale * this.props.placementWidth, imageScale * this.props.placementHeight);

    ctx.fillStyle = colorBrown;
    ctx.fillRect(lineWidth, lineWidth, imageScale * this.props.placementWidth - 2 * lineWidth, imageScale * this.props.placementHeight - 2 * lineWidth);

    console.log(this.props.placements)

    const labels = Array.from(new Set(this.props.placements.map((p) => {return p.plant.label})));
    labels.forEach(  (label, index, wx) => {
      const highlightColor = highlightColors[index % highlightColors.length];

      const labelPlacements = this.props.placements.filter((p) => {return p.plant.label == label});
      this.renderPlacements(ctx, imageScale, labelPlacements, colorDarkGray, {radiusAdjust: 1, offsetLeft: 0, offsetTop: 0} );
      this.renderPlacements(ctx, imageScale, labelPlacements, highlightColor, {radiusAdjust: -2} );
      this.renderPlacements(ctx, imageScale, labelPlacements, colorLightGreen, {radiusAdjust: -6, printLabel: true}  );
    })
  }

  renderPlacements = (ctx, imageScale, placements, color, options) => {
    const radiusAdjust = options.radiusAdjust || 0;
    const offsetTop = options.offsetTop || 0;
    const offsetLeft = options.offsetLeft || 0;
    const printLabel = options.printLabel || false;

    placements.forEach( (placement) => {
      let xPos = placement.x_pos * imageScale + offsetLeft;
      let yPos = placement.y_pos * imageScale + offsetTop;
      let plantRadius = placement.plant.width / 2 * imageScale;

      // Plant Circle
      ctx.fillStyle = color;
      ctx.beginPath();

      ctx.arc(xPos, yPos, plantRadius + radiusAdjust, 0, 2 * Math.PI);
      ctx.fill();

      // Plant Label
      if(printLabel){
        ctx.font="12px Helvetica";
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.fillText(placement.plant.label,xPos, yPos+3);
      }
    });
  }

  render() {
    return(
      <div>
        <canvas ref='canvas' width={this.props.renderWidth} height={this.props.renderHeight} />
      </div>
    )
  }
}

export default TemplateRenderCanvas;
