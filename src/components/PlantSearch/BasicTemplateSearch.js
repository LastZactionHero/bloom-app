import React from 'react'
import PlantSearchActions from 'actions/PlantSearchActions';
import PlantSearchStore from 'stores/PlantSearchStore';
import Loading from 'components/Common/Loading';

class BasicTemplateSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = PlantSearchStore.getState();
  }

  componentDidMount = () => {
    PlantSearchStore.listen(this.onChange);
    PlantSearchActions.startFetchResults(this.props.templatePlant.search_query, 0);
  }

  componentWillUnmount = () => {
    PlantSearchStore.unlisten(this.onChange);
  }

  onChange = (state) => {
    this.setState(state);
  }

  render() {
    console.log(this.state.results);

    return(
      <div>
        <h3>Basic Template Search: {this.props.templatePlant.plant_type}</h3>
        <p>{this.props.templatePlant.tooltip}</p>
        <p>{JSON.stringify(this.props.templatePlant.search_query)}</p>

        {this.state.loading.results ?
          <Loading message='Searching' /> :
          <div>
            <div className='row'>
              {this.state.results.plants.map( (plant) => {
                console.log(plant)
                return <div key={`search_result_${plant.id}`}
                            className='col-md-2'>
                  <div>{plant.common_name}</div>
                  <img src={plant.image_url} width='100%' height='40px' />
                </div>
              })}
            </div>
          </div>
        }

        <a className='btn btn-default'
           href='javascript:void(0)'
           onClick={this.props.onSelect}>
           Back
        </a>
      </div>
    )
  }
}

export default BasicTemplateSearch;
