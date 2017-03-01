import React from 'react';
import YardBuilderStep from './YardBuilderStep';
import YardBuilderActions from 'actions/YardBuilderActions';

class YardBuilderStepPlantPreferences extends YardBuilderStep {
  selectPlantPreference = (plantType) => {
    YardBuilderActions.togglePlantPreference(plantType);
  }

  render() {
    return(
      <div className={`step step-plant-preferences ${this.stepStateClass()}` }>
        <div className='step-title'  onClick={() => {this.selectStep('plant_preferences')}}>Plant Preferences</div>
        <div className='step-contents'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='title'>
                <i className="fa fa-pagelines" aria-hidden="true"></i>&nbsp;
                What kind of plants to you prefer?
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-11 col-sm-offset-1'>
              <p>Know what you like? We&apos;ll build it into your recommendations.</p>
              <p>(No idea? Not a problem- just skip this step.)</p>

              <ul className='plant-types'>
                <li className={this.state.yard.preferred_plant_types.indexOf('annuals') == -1 ? null : 'active'}
                    onClick={() => {this.selectPlantPreference('annuals')}}>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='name'>Annuals</div>
                      <div className='description'>An annual is a plant that only survives for one year.</div>
                      <div className='examples'>Petunias, Coleus, Mums</div>
                    </div>
                  </div>
                </li>
                <li className={this.state.yard.preferred_plant_types.indexOf('perennials') == -1 ? null : 'active'}
                    onClick={() => {this.selectPlantPreference('perennials')}}>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='name'>Perennials</div>
                      <div className='description'>A perennial is a plant that comes back every year.</div>
                      <div className='examples'>- examples - </div>
                    </div>
                  </div>
                </li>
                <li className={this.state.yard.preferred_plant_types.indexOf('deciduous_shrubs') == -1 ? null : 'active'}
                    onClick={() => {this.selectPlantPreference('deciduous_shrubs')}}>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='name'>Deciduous shrubs</div>
                      <div className='description'>Flowering shrubs that lose their leaves in the winter</div>
                      <div className='examples'>- examples - </div>
                    </div>
                  </div>
                </li>
                <li className={this.state.yard.preferred_plant_types.indexOf('evergreen_shrubs') == -1 ? null : 'active'}
                    onClick={() => {this.selectPlantPreference('evergreen_shrubs')}}>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='name'>Evergreen shrubs</div>
                      <div className='description'>Non flowering shrubs that keep their leaves year round, good for winter interest</div>
                      <div className='examples'>- examples - </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default YardBuilderStepPlantPreferences;
