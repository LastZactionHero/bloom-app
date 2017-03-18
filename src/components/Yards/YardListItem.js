import React from 'react';
import { Link } from 'react-router'
import YardsStore from 'stores/YardsStore';
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
      <div className='col-sm-12'>
        <div className='panel panel-default panel-brand panel-yard-list-item'>
          <div className='panel-heading'>
            Zone {this.props.yard.zone} ({this.props.yard.zipcode})
          </div>
          <div className='panel-body'>
            {this.props.yard.beds.length > 0 ?

              <div>
                <strong>{StringUtil.pluralize(this.props.yard.beds.length, 'Bed', 'Beds ')}:</strong>&nbsp;
                {this.props.yard.beds.map( (bed) => { return bed.name } ).join(', ')}
              </div>
              :
              <div className='text-center'>
                <Link className='btn btn-success btn-lg'
                        to={{pathname: `/dashboard/yards/${this.props.yard.id}/beds/new`}}>Add your First Bed&nbsp;<i className="fa fa-plus" aria-hidden="true"></i></Link>
              </div>
            }

            <div className='row'>
              <div className='col-sm-12'>
                <div className='plants-list'>
                  {YardsStore.shoppingList(this.props.yard).map( (shoppingListItem) => {
                    return <div key={`yard_plant_${this.props.yard.id}_${shoppingListItem.plant.permalink}`}
                                className='plant-image-background'
                                style={{backgroundImage: `url("${shoppingListItem.plant.image_url}")`}} >
                    </div>
                  })}
                </div>
              </div>
            </div>

            <hr/>
            <Link className='btn btn-primary' to={{pathname: `/dashboard/yards/${this.props.yard.id}`}}>View / Edit</Link>
            <Link className='btn btn-default' to={{pathname: `/dashboard/yards/${this.props.yard.id}/shopping_list`}}>
              Nursery Shopping List&nbsp;
              <i className="fa fa-shopping-cart" />
            </Link>

            &nbsp;
            <div className='pull-right'>
            <a className='btn btn-danger' onClick={() => {this.setState({delete: true})}}>Delete</a>
            </div>

            {this.state.delete ?
              <Modal title='Delete this yard?'
                     buttons={[{name: 'Cancel', onClick: () => {this.setState({delete: false})}},
                               {name: 'Delete', class: 'btn-danger', onClick: this.handleDelete}]}>
                <p>This cannot be undone.</p>
              </Modal>
            : null}
          </div>
        </div>
      </div>
    )
  }
}

export default YardListItem;
