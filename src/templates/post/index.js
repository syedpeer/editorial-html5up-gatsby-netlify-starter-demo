import { Link } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

import get from 'lodash/get'
import map from 'lodash/map'

//import Adsense from 'components/adsense'

//import './style.scss'

const Post = ({ data, options }) => {
  const {
    category,
    tags,
    description,
    title,
    path,
    date,
    featuredImage,
  } = data.frontmatter
  const { isIndex } = options
  const html = get(data, 'html')
  const isMore = isIndex && !!html.match('<!--more-->')
  const fluid = get(featuredImage, 'childImageSharp.fluid')

  return (
    <div className="article" key={path}>
      <div className="container">
        <div className="info">
          <Link style={{ boxShadow: 'none' }} to={path}>
            <h1>{title}</h1>
            <time dateTime={date}>{date}</time>
          </Link>
          <ul className="actions small">
          {Badges({ items: [category], primary: true })}
          </ul>
          <ul className="actions small">
          {Badges({ items: tags })}
          </ul>
        </div>
        <div className="content">
          <p>{description}</p>
          {fluid ? (
            <Img fluid={fluid} style={{ display: 'block', margin: '0 auto' }} />
          ) : (
            ''
          )}
          {featuredImage ? (
            <img src={featuredImage.src} alt={featuredImage.alt} style={{ display: 'block', margin: '0 auto' }} />
          ) : (
            ''
          )}
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: isMore ? getDescription(html) : html,
          }}
        />
        {isMore ? Button({ path, label: 'MORE', primary: true }) : ''}
        {/*getAd(isIndex, adsense)*/}
      </div>
    </div>
  )
}

export default Post

/*const getAd = (isIndex, adsense) => {
  return !isIndex ? <Adsense clientId={adsense} slotId="" format="auto" /> : ''
}**/

const getDescription = body => {
  body = body.replace(/<blockquote>/g, '<blockquote class="blockquote">')
  if (body.match('<!--more-->')) {
    body = body.split('<!--more-->')
    if (typeof body[0] !== 'undefined') {
      return body[0]
    }
  }
  return body
}

const Button = ({ path, label, primary }) => (
  <Link className="readmore" to={path}>
    <span
      className={`btn btn-outline-primary btn-block ${
        primary ? 'btn-outline-primary' : 'btn-outline-secondary'
      }`}
    >
      {label}
    </span>
  </Link>
)

const Badges = ({ items, primary }) =>
  map(items, (item, i) => {
    return (
      <li
        className={`button fit small ${primary ? 'primary' : 'secondary'}`}
        key={i}
      >
        {item}
      </li>
    )
  })
