import React from 'react';
import $ from 'jquery';

class Modal extends React.Component {
  componentDidMount = () => {
    $(this.refs.modal).modal({show: true, backdrop: 'static'});
  }

  handleButtonClick = (button) => {
    if(button.onClick) { button.onClick() }
    $(this.refs.modal).modal('hide');
  }

  render() {
    return(
      <div className="modal fade" ref='modal'>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              {this.props.buttons.map( (button) => {
                return <button type='button'
                               key={`btn_${button.name}`}
                               className={`btn ${button.class || 'btn-default'}`}
                               onClick={() => {this.handleButtonClick(button)}}>
                  {button.name}
                </button>
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;
