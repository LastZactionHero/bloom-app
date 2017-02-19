import React from 'react';
import { Link } from 'react-router';

class YardList extends React.Component {
  render() {
    return(
      <div>
        <div>Yard List</div>
        <Link to={{pathname: '/dashboard/yards/builder/'}}>Create a new Yard</Link>
      </div>
    )
  }
}

export default YardList
