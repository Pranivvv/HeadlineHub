import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(0)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    document.title = `News - ${capitalizeFirstLetter(props.category)}`
    props.setProgress(10)
    let parsedData = await data.json()
    props.setProgress(30)
    // console.log(parsedData);
    props.setProgress(50)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(70)
    // document.title = `News - ${capitalizeFirstLetter(props.category)}`
    props.setProgress(100)
  }

  useEffect(() => {
    updateNews()
    // eslint-disable-next-line
  }, [])

  // prevPage = async () => {
  //   // console.log(page-1)
  //   this.setState({ page: page - 1 })
  //   this.updateNews()
  // }

  // nextPage = async () => {
  //   // console.log(page+1)
  //   this.setState({ page: page + 1 })
  //   this.updateNews()
  // }

  const fetchMoreData = async () => {
    let nextPage = page + 1
    // console.log(page)
    // console.log('old articles\n'+articles)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json()
    // console.log('new articles\n', parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setPage(page + 1)
    // console.log('all articles\n', articles)
  };

  return (
    <div className='container d-flex align-items-center flex-column mb-3' style={{ marginTop: '70px' }} data-bs-theme={props.mode}>
      <h1 className='my-3' >Top News - {capitalizeFirstLetter(props.category)}</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className='d-flex flex-wrap justify-content-center'>
          {articles.map((article) => {
            const { urlToImage: imageUrl, title, description, url: newsUrl, author, publishedAt: date } = article;
            if (imageUrl && title && description && newsUrl) {
              return <div className="my-3 mx-3 " key={article.url}>
                <NewsItem imageUrl={imageUrl} title={title >= 43 ? title : (title.slice(0, 45) + '...')} description={description >= 88 ? description : (description.slice(0, 90) + '...')} newsUrl={newsUrl} mode={props.mode} author={!author ? "unknown" : author} date={date} />
              </div>
            }
            return null
          })}
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex flex-wrap justify-content-around">
          <button disabled={page <= 1} type="button" className={`btn btn-outline-${props.mode === 'light' ? 'dark' : 'light'}`} onClick={this.prevPage}>&larr; Previous </button>
          <button disabled={(page + 1) > Math.ceil(totalResults / props.pageSize)} type="button" className={`btn btn-outline-${props.mode === 'light' ? 'dark' : 'light'}`} onClick={this.nextPage}>Next &rarr;</button>
        </div> */}
    </div>
  )

}

News.defaultProps = {
  mode: 'light',
  apiKey: '56593e3a139c4e5f8b5c1a1e474239e6',
  pageSize: 8,
  country: 'us',
  category: 'general'
}

News.propTypes = {
  mode: PropTypes.string,
  apiKey: PropTypes.string,
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string
}

export default News
