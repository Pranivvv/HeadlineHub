import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { imageUrl, title, description, newsUrl, author, date } = this.props
    return (
      <div data-bs-theme={this.props.mode}>
        <div className="card" style={{ width: '18rem', height: '430px' }}>
          <img src={imageUrl ? imageUrl : "https://media.wired.com/photos/672d5a3c442253502d2f68ed/191:100/w_1280,c_limit/Monitor-Election-Screens-Culture-2183228816.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text"> {description} </p>
            <p className="card-text"><small className="text-body-secondary" style={{ position: "absolute", bottom: "60px" }}>By {author} Last updated at {new Date(date).toLocaleDateString()}</small></p>
            <a rel="noreferre" href={newsUrl} target="_blank" className={`btn btn-outline-${this.props.mode === 'light' ? 'dark' : 'light'}`} style={{ position: "absolute", bottom: "20px" }}>Read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
