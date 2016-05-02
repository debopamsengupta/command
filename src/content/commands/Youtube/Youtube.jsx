import _ from 'lodash'
import $ from 'jquery'
import React from 'react'
import classnames from 'classnames'
import { mountReactComponent } from 'content/commands/mount'

import styles from './Spotify.scss'
import * as Types from 'content/types'
import * as Search from 'content/components/Search'
import Container from 'content/components/Container'

const API_BASE = 'https://api.spotify.com/v1/search'

let search = (query, options={}) => {
  return $.ajax({
    url: API_BASE,
    data: {
      q: query,
      type: 'track',
      offset: options.offset
    }
  }).then((data) => {
    return data.tracks.items
  })
}

let SpotifyResult = (props) => {
  return (
    <div className={styles.result}>
      <img src={props.album.images[1].url} />
      <p className={styles.result__title}>{props.name}</p>
      <p className={styles.result__artist}>{props.artists[0].name}</p>
    </div>
  )
}

class Youtube extends React.Component {
  onSelect(result) {
    this.props.onDone(new Types.Link({
      href: result.external_urls.spotify
    }))
  }

  render() {
    return (
      <Container {...this.props}>
        <Search.Widget
          placeholder="Search YouTube..."
          onSearch={search}
          onSelect={this.onSelect.bind(this)}
          onEsc={this.props.onDone}
          ResultClass={SpotifyResult}
          columns={2}
        />
      </Container>
    )
  }
}
Spotify.propTypes = {
  onDone: React.PropTypes.func.isRequired
}

export let match = 'youtube'
export let icon = require('./Spotify.png')
export let mount = mountReactComponent.bind(null, Youtube)
