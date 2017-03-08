import React from 'react';

class TemplateRenderCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasID = `canvas_${parseInt(Math.random()*1000000000)}`;
  }

  componentDidMount = () => {
    setTimeout( () => {
      this.renderPlacements();
    })
  }

  renderPlacements = () => {
    let canvas = document.getElementById(this.canvasID);
    let ctx = canvas.getContext('2d');

    // Determine Image Scaling
    let xImageScale = this.props.renderWidth / this.props.placementWidth;
    let yImageScale = this.props.renderHeight / this.props.placementHeight;
    let imageScale = Math.min(xImageScale, yImageScale);

    const lineWidth = 1;
    const colorBrown = '#f39c12';
    const colorGreen = '#27ae60';
    const colorLightGreen = '#2ecc71';
    const colorBlack = '#000000';
    const colorGray = '#7f8c8d';

    // Draw Border
    ctx.strokeStyle = colorBlack;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(0, 0, imageScale * this.props.placementWidth, imageScale * this.props.placementHeight);

    ctx.fillStyle = colorBrown;
    ctx.fillRect(lineWidth, lineWidth, imageScale * this.props.placementWidth - 2 * lineWidth, imageScale * this.props.placementHeight - 2 * lineWidth);

    // Draw plants, layer 1
    this.props.placements.forEach( (placement) => {
      let xPos = placement.x_pos * imageScale;
      let yPos = placement.y_pos * imageScale;
      let plantRadius = placement.plant.width / 2 * imageScale;

      // Plant Circle
      ctx.fillStyle = colorGray;
      ctx.beginPath();
      ctx.arc(xPos, yPos, plantRadius, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw plants, layer 2 and labels
    this.props.placements.forEach( (placement) => {
      let xPos = placement.x_pos * imageScale;
      let yPos = placement.y_pos * imageScale;
      let plantRadius = placement.plant.width / 2 * imageScale;

      // Plant Circle
      ctx.fillStyle = colorLightGreen;
      ctx.beginPath();
      ctx.arc(xPos, yPos, plantRadius - 1, 0, 2 * Math.PI);
      ctx.fill();

      // Plant Label
      ctx.font="12px Helvetica";
      ctx.fillStyle = colorBlack;
      ctx.fillText(placement.plant.label,xPos-4, yPos + 2);
    });

  }

  render() {
    return(
      <div>
        <canvas id={this.canvasID} width={this.props.renderWidth} height={this.props.renderHeight} />
      </div>
    )
  }
}

export default TemplateRenderCanvas;
