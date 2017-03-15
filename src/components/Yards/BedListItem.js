import React from 'react';
import { Link } from 'react-router';
import BedActions from 'actions/BedActions';
import Modal from 'components/Common/Modal';
import TemplateViewer from '../Beds/Render/TemplateViewer';
import BedDescriptionUtil from '../../util/bed_description';
import YardsStore from 'stores/YardsStore';

class BedListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {delete: false}
  }

  handleDelete = () => {
    BedActions.startDelete(this.props.bed);
  }

  render() {
    const plantList = YardsStore.plantSelectionList(this.props.bed);

    return(
      <div className='bed-list-item'>
        <h3>{this.props.bed.name} <span className='title-subtext'>({this.props.bed.width}&apos; W x {this.props.bed.depth}&apos; H)</span></h3>
        <p className='description'>
          {BedDescriptionUtil.sunlight(this.props.bed)}.&nbsp;
          {BedDescriptionUtil.orientation(this.props.bed)}.
        </p>

        <div className='row'>
          <div className='col-md-8'>
            <TemplateViewer bed={this.props.bed} renderFontSizeLabel={14} legend={true} selecting={true}/>
            <div>
              <Link to={{pathname: `/dashboard/yards/${this.props.bed.yard_id}/beds/${this.props.bed.id}/template`}}>Pick a different template</Link>
            </div>
          </div>
          <div className='col-md-4'>

            <div className='text-right'>
              <div className="dropdown">
                <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  Edit&nbsp;<span className="caret"></span>
                </button>
                <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                  <li>
                    <Link to={{pathname: `/dashboard/yards/${this.props.bed.yard_id}/beds/${this.props.bed.id}/template`}}>Select a different template</Link>
                  </li>
                  <li>
                    <a href='javascript:void(0)' onClick={() => {this.setState({delete: true})}}>Delete bed</a>
                  </li>
                </ul>
              </div>
            </div>
            <hr/>
            <h4>Plants</h4>
            <ul className='plant-list'>
              {plantList.map((plantListItem) => {
                return <li key={`bed_list_item_plant_${plantListItem.label}`}><strong>{plantListItem.label}:</strong> {plantListItem.plant ? plantListItem.plant.common_name : <span className='unselected'>-Unselected-</span>}
                </li>
              })}
            </ul>
            {this.props.bed.template_id ?
              <Link className='btn btn-primary'
                    to={{pathname: `/dashboard/yards/${this.props.bed.yard_id}/beds/${this.props.bed.id}/plants`}}>Pick Plants</Link> : null
            }
          </div>
        </div>

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
