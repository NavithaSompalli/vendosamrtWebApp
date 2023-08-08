import {Component} from 'react'

import './App.css'

// Replace your code here
class App extends Component {
  state = {
    moviesList: [],
    isSearch: false,
    searchInput: 'jack',
    itemsPerPage: 6,
    startingIndex: 0,
  }

  componentDidMount() {
    this.getMoviesList()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getMoviesList = async () => {
    const {searchInput, startingIndex, itemsPerPage} = this.state
    const url = `https://api.themoviedb.org/3/search/movie?api_key=e8ccc676e299173067a80520c1fee405&query=${searchInput}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const newData = data.results.map(eachMovie => ({
      id: eachMovie.id,
      title: eachMovie.title,
      overview: eachMovie.overview,
      releaseDate: eachMovie.release_date,
      rating: eachMovie.vote_average,
    }))

    const pageItems = newData.slice(startingIndex, itemsPerPage)
    console.log(pageItems.length)

    if (pageItems.length !== 0) {
      this.setState({moviesList: [...pageItems]})
    }
  }

  onClickSearch = () => {
    this.setState(prevState => ({isSearch: !prevState.isSearch}))
    this.getMoviesList()
  }

  previousPage = () => {
    const {itemsPerPage} = this.state
    this.setState(prevState => ({
      startingIndex: prevState.startingIndex - itemsPerPage,
    }))
    this.setState(prevState => ({itemsPerPage: prevState.itemsPerPage - 6}))
    this.getMoviesList()
  }

  nextPage = () => {
    const {itemsPerPage} = this.state
    this.setState(prevState => ({
      startingIndex: prevState.startingIndex + itemsPerPage,
    }))
    this.setState(prevState => ({itemsPerPage: prevState.itemsPerPage + 6}))
    this.getMoviesList()
  }

  render() {
    const {moviesList} = this.state

    return (
      <div className="bg-container">
        <div className="nav-container">
          <h1 className="movie-heading">Movie Name</h1>
          <input
            type="text"
            placeholder="Search"
            value={this.searchInput}
            onChange={this.onChangeSearchInput}
            className="search-input-element"
          />
          <button
            type="button"
            onClick={this.onClickSearch}
            className="search-button"
          >
            Search{' '}
          </button>
        </div>
        <ul className="ul-container">
          {moviesList.map(movie => (
            <li className="list-item" key={movie.id}>
              <h1 className="movie-title">{movie.title}</h1>
              <p className="release-date">
                {' '}
                RELEASE DATE : {movie.releaseDate}
              </p>
              <p className="rating">RATING : {movie.rating}</p>
              <p className="movie-overview">{movie.overview}</p>
            </li>
          ))}
        </ul>
        <div className="pagination-container">
          <button
            type="button"
            onClick={this.previousPage}
            className="previous-page"
          >
            PreviousPage
          </button>
          <button type="button" onClick={this.nextPage} className="next-page">
            NextPage
          </button>
        </div>
      </div>
    )
  }
}

export default App
