import React from 'react';
import StringUtil from '../../util/string';

class ErrorAlert extends React.Component {
  render() {

    let message = '';
    for (var property in this.props.error) {
      if (this.props.error.hasOwnProperty(property)) {
        message += `${StringUtil.capitalize(property)} ${this.props.error[property].join(', ')}. `
      }
    }
    if(message.length == 0) {
      message = 'An unknown error occurred.';
    }

    return(
      <div className='alert alert-danger'>{message}</div>
    );
  }
}

export default ErrorAlert;