const h = require('react-hyperscript')
const react = require('react')
const xhr = require('xhr')

const {
  Link
} = require('react-router')

const Moviedb = react.createClass({
  getInitialState: function() {
    return {
      r: 'json',
      s: '',
      movies: []
    }
  },
  handleChange: function(e) {
    this.setState({
      s: e.target.value
    })
  },
  handleSubmit: function(e) {
    e.preventDefault()
    xhr({
      method: 'GET',
      json: true,
      url: `https://www.omdbapi.com/?r=json&s=${this.state.s}`
    }, (err, res, body) => {
      if (err) {
        return console.log(err.message)
      }
      this.setState({
        movies: body.Search
      })
    })
  },
  render: function() {
    console.log(this.state.movies)
    return (
      h('div.pa4', [
        h('h1', 'Movies'),
        h('form', { onSubmit: this.handleSubmit }, [
          h('input.mb2', { onChange: this.handleChange })
        ]),
        //h('button', 'Browse All Movies'),
        h(Link, {
          to: '/',
          className: 'link db mt2'
        }, 'Home'),
        h('div', this.state.movies.map(movie =>
          h('img', {
            src: movie.Poster
          })
        ))
      ])
    )
  }
})

module.exports = Moviedb
