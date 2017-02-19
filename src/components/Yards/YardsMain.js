import React from 'react';
import YardList from './YardList';

class YardsMain extends React.Component {
  render(){
    let children = this.props.children || <YardList/>;
    return(
      <div>
        {children}
      </div>
    )
  }
}

export default YardsMain;
