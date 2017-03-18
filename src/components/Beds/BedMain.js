import React from 'react';

class BedMain extends React.Component {
  render() {
    let yard = this.props.yard;
    let bed = yard.beds.find( (b) => { return b.id == this.props.params.id });

    let children = this.props.children;
    if(children) {
      children = React.cloneElement(this.props.children, { yard: yard, bed: bed });
    }

    return(
      <div>
        {children ? children : null}
      </div>
    )
  }
}

export default BedMain;
