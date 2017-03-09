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

    // Determine Image Scaling
    let xImageScale = this.props.renderWidth / this.props.placementWidth;
    let yImageScale = this.props.renderHeight / this.props.placementHeight;
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

    // Draw Border
    ctx.strokeStyle = colorBlack;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(0, 0, imageScale * this.props.placementWidth, imageScale * this.props.placementHeight);

      ctx.fillStyle = colorBrown ;
    ctx.fillRect(lineWidth, lineWidth, imageScale * this.props.placementWidth - 2 * lineWidth, imageScale * this.props.placementHeight - 2 * lineWidth);


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
