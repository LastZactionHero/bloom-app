import React from 'react'
import YardsStore from 'stores/YardsStore';
import PlantDescriptionUtil from '../../util/plant_description';
import PlantPreview from '../PlantSearch/PlantPreview';
import Modal from 'components/Common/Modal';

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = YardsStore.getState();
  }

  componentDidMount = () => {
    YardsStore.listen(this.onChange);
  }

  componentWillUnmount = () => {
    YardsStore.unlisten(this.onChange);
  }

  onChange = (state) => {
    this.setState(state);
  }

  viewMoreInfo = (plant) => {
    this.setState({plantPreview: plant});
  }

  hideMoreInfo = () => {
    this.setState({plantPreview: null});
  }

  render() {
    let shoppingList = YardsStore.shoppingList(this.props.yard);

    return(
      <div>
        <div className='shopping-list'>
          <h2>Shopping List</h2>

          {shoppingList.length > 0 ?
            <div>
              <div className='step-hint'>
                Below is a list of plants you&apos;ve selected for your garden. If the particular plant is not available at your
                nursery, use the description as a guide for picking an alternative.
              </div>
              <ul>
                <li className='header hidden-xs hidden-sm'>
                  <div className='row'>
                    <div className='col-md-3'><strong>Name</strong></div>
                    <div className='col-md-1'><strong>Quantity</strong></div>
                    <div className='col-md-3'><strong>Beds</strong></div>
                    <div className='col-md-5'><strong></strong></div>
                  </div>
                </li>

                {shoppingList.map( (shoppingListItem) => {
                  return <li key={`shopping_list_item_${shoppingListItem.plant.permalink}`}>
                    <div className='row'>
                      <div className='col-md-3'>
                        <strong>{shoppingListItem.plant.common_name}</strong>
                        <div>
                          {PlantDescriptionUtil.plantDescription(shoppingListItem.plant)}
                        </div>
                      </div>
                      <div className='col-md-1'>
                        <span className='visible-xs visible-sm'><br/><strong>Quantity: </strong>{shoppingListItem.count}</span>
                        <span className='hidden-xs hidden-sm'>{shoppingListItem.count}</span>
                      </div>
                      <div className='col-md-3'>
                        <span className='visible-xs visible-sm'><br/><strong>Found in Beds:</strong></span>
                        {shoppingListItem.beds.map((b) => {return b.name}).join(', ')}
                      </div>
                      <div className='col-md-5 text-right'>
                        <a className='btn btn-info' onClick={() => {this.viewMoreInfo(shoppingListItem.plant)}}>More Info</a>
                      </div>
                    </div>
                  </li>
                })}
              </ul>
            </div>:
            <div className='alert alert-warning'>
              You have not selected any plants!
            </div>
          }
        </div>

        {this.state.plantPreview ?
          <Modal title={this.state.plantPreview.common_name}
                 buttons={[
                   {name: 'OK', class: 'btn-success', onClick: this.hideMoreInfo}
                 ]}>
            <PlantPreview plant={this.state.plantPreview} />
          </Modal> : null}
      </div>
    );
  }
}

export default ShoppingList;