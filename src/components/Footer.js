import React from 'react';
import $ from 'jquery';

class Footer extends React.Component {

  render() {
    return(
      <div className='footer row'>
        <div className='col-xs-12'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 text-center'>
                Questions, Info, Support: info@plantwithbloom.com
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer;