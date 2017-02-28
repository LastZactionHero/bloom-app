import React from 'react';

class TemplateRenderCanvas extends React.Component {
  constructor(props) {
    super(props)
    this.canvasWidth = 450;
    this.canvasHeight = 450;
  }

  componentDidMount = () => {
    setTimeout( () => {
      this.renderPlacements();
    })
  }

  renderPlacements = () => {
    let canvas = document.getElementById('placementsCanvas');
    let ctx = canvas.getContext('2d');

    // Determine Image Scaling
    let xImageScale = this.canvasWidth / this.props.placementWidth;
    let yImageScale = this.canvasHeight / this.props.placementHeight;
    let imageScale = Math.min(xImageScale, yImageScale);

    // Draw Border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, imageScale * this.props.placementWidth, imageScale * this.props.placementHeight);

    // Draw Plants
    this.props.placements.forEach( (placement) => {
      let xPos = placement.x_pos * imageScale;
      let yPos = placement.y_pos * imageScale;
      let plantRadius = placement.plant.width / 2 * imageScale;

      // Plant Circle
      ctx.beginPath();
      ctx.arc(xPos, yPos, plantRadius, 0, 2 * Math.PI);
      ctx.stroke();

      // Plant Label
      ctx.font="12px Helvetica";
      ctx.fillText(placement.plant.label,xPos-4, yPos + 2);
    });
  }

  render() {
    return(
      <div>
        <canvas id='placementsCanvas' width={this.canvasWidth} height={this.canvasHeight} />
      </div>
    )
  }
}

export default TemplateRenderCanvas;