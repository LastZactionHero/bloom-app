import React from 'react';
import { Link } from 'react-router'
import YardsActions from 'actions/YardsActions';
import StringUtil from '../../util/string';
import Modal from 'components/Common/Modal';

class YardListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {delete: false}
  }

  handleDelete = () => {
    YardsActions.startDelete(this.props.yard);
  }

  render() {
    return(
      <div className='col-sm-12 yard-list-tile'>
        <h3 className='text-center'>Zone {this.props.yard.zone} ({this.props.yard.zipcode})</h3>
        <div>{StringUtil.pluralize(this.props.yard.beds.length, 'Bed', 'Beds')}</div>
        <div>Created {this.props.yard.created_at}</div>

        <Link className='btn btn-primary' to={{pathname: `/dashboard/yards/${this.props.yard.id}`}}>View</Link>
        &nbsp;
        <a className='btn btn-danger' onClick={() => {this.setState({delete: true})}}>Delete</a>

        {this.state.delete ?
          <Modal title='Delete this yard?'
                 buttons={[{name: 'Cancel', onClick: () => {this.setState({delete: false})}},
                           {name: 'Delete', class: 'btn-danger', onClick: this.handleDelete}]}>
            <p>This cannot be undone.</p>
          </Modal>
          : null}
      </div>
    )
  }
}

export default YardListItem;