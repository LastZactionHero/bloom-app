import React from 'react';
import { Link } from 'react-router';
import BedActions from 'actions/BedActions';
import Modal from 'components/Common/Modal';

class BedListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {delete: false}
  }

  handleDelete = () => {
    BedActions.startDelete(this.props.bed);
  }

  render() {
    return(
      <div>
        <div><strong>ID {this.props.bed.id}: {this.props.bed.name}</strong></div>
        <div>{this.props.bed.width}&apos; W x {this.props.bed.depth}&apos; H</div>
        <div>Attached to House: {this.props.bed.attached_to_house}</div>
        <div>Orientation: {this.props.bed.orientation}</div>
        <div>Sunlight, Morning: {this.props.bed.sunlight_morning}</div>
        <div>Sunlight, Afternoon: {this.props.bed.sunlight_afternoon}</div>
        <div>Watered: {this.props.bed.watered}</div>
        <div>Template ID: {this.props.bed.template_id}</div>

        {this.props.bed.template_id ?
          <Link className='btn btn-primary'
                to={{pathname: `/dashboard/yards/${this.props.bed.yard_id}/beds/${this.props.bed.id}/plants`}}>Pick Plants</Link> : null
        }
        &nbsp;
        <Link className='btn btn-primary'
              to={{pathname: `/dashboard/yards/${this.props.bed.yard_id}/beds/${this.props.bed.id}/template`}}>Select Template</Link>
        &nbsp;
        <a className='btn btn-danger' onClick={() => {this.setState({delete: true})}}>Delete</a>

        {this.state.delete ?
          <Modal title='Delete this garden bed?'
                 buttons={[{name: 'Cancel', onClick: () => {this.setState({delete: false})}},
                           {name: 'Delete', class: 'btn-danger', onClick: this.handleDelete}]}>
            <p>This cannot be undone.</p>
          </Modal>
          : null}
      </div>
    )
  }
}

export default BedListItem;
