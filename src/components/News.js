import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps = {
    mode: 'light',
    apiKey: '56593e3a139c4e5f8b5c1a1e474239e6',
    pageSize: 8,
    country: 'us',
    category: 'general'
  }

  static propTypes = {
    mode: PropTypes.string,
    apiKey: PropTypes.string,
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
  }


  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
  }

  capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  async updateNews() {
    this.props.setProgress(0)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json()
    this.props.setProgress(10)
    console.log(parsedData);
    this.props.setProgress(70)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    document.title = `News - ${this.capitalizeFirstLetter(this.props.category)}`
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updateNews()
  }

  // prevPage = async () => {
  //   // console.log(this.state.page-1)
  //   this.setState({ page: this.state.page - 1 })
  //   this.updateNews()
  // }

  // nextPage = async () => {
  //   // console.log(this.state.page+1)
  //   this.setState({ page: this.state.page + 1 })
  //   this.updateNews()
  // }

  fetchMoreData = async () => {
    let nextPage = this.state.page + 1
    console.log(this.state.page)
    // console.log('old articles\n'+this.state.articles)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log('new articles\n', parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page: this.state.page + 1,
      loading: false
    })
    console.log('all articles\n', this.articles)
  };

  render() {
    return (
      <div className='container d-flex align-items-center flex-column  mb-3' data-bs-theme={this.props.mode}>
        <h1 className='my-3 ' >Top News - {this.capitalizeFirstLetter(this.props.category)}</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='d-flex flex-wrap justify-content-center' >
            {this.state.articles.map((article) => {
              const { urlToImage: imageUrl, title, description, url: newsUrl, author, publishedAt: date } = article;
              if (imageUrl && title && description && newsUrl) {
                return <div className="my-3 mx-3 " key={article.url}>
                  <NewsItem imageUrl={imageUrl} title={title >= 43 ? title : (title.slice(0, 45) + '...')} description={description >= 88 ? description : (description.slice(0, 90) + '...')} newsUrl={newsUrl} mode={this.props.mode} author={!author ? "unknown" : author} date={date} />
                </div>
              }
            })}
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex flex-wrap justify-content-around">
          <button disabled={this.state.page <= 1} type="button" className={`btn btn-outline-${this.props.mode === 'light' ? 'dark' : 'light'}`} onClick={this.prevPage}>&larr; Previous </button>
          <button disabled={(this.state.page + 1) > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className={`btn btn-outline-${this.props.mode === 'light' ? 'dark' : 'light'}`} onClick={this.nextPage}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }
}

export default News
