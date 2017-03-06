import React from 'react';

class Pagination extends React.Component {
  pages() {
    let pageLinks = []
    let pageStart = Math.max(0, this.props.current - 3);
    let pageEnd = Math.min(pageStart + 6, this.props.total - 1) + 1;

    for(let i = pageStart; i < pageEnd; i++){
      pageLinks.push(
        <li key={i} className={(i == this.props.current) ? 'active' : ''}>
          <a onClick={() => {this.changePage(i)}}>
            {i + 1}
          </a>
        </li>
      )
    }
    return pageLinks;
  }

  nextPage = () => {
    if(this.props.current < (this.props.total - 1)){
      this.changePage(this.props.current + 1);
    }
  }

  prevPage = () => {
    if(this.props.current >= 1){
      this.changePage(this.props.current - 1);
    }
  }

  changePage = (pageIdx) => {
    this.props.onChangePage(pageIdx);
  }

  render(){
    return(
      <div>
        {this.props.total > 0 ?
          <ul className="pagination">
            <li className={this.props.current == 0 ? 'disabled' : ''}>
              <a href="javascript:void(0)" aria-label="Previous" onClick={this.prevPage}>
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {this.pages()}
            <li className={this.props.current >= (this.props.total - 1) ? 'disabled' : ''}>
              <a href="javascript:void(0)" aria-label="Next" onClick={this.nextPage}>
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul> : null}
      </div>
    )
  }
}

export default Pagination;
