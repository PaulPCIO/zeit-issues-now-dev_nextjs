import { Card, Col, Row } from 'antd'

import Cowsay from 'src/components/cowsay'
import React from 'react'
import fetch from 'isomorphic-unfetch'

const { Meta } = Card

const Index = props => {
  return (
    <>
      <Cowsay text='Cow says HELLO WORLD! :)' />
      <Row>
        {props.shows.map(show => (
          <Col xs={24} sm={12} md={8} lg={6} key={show.id}>
            <Card hoverable style={{ width: 240, margin: '50px auto' }} cover={<img alt='example' src={show.image.medium} />}>
              <Meta title={show.name} description={show.type} />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  return {
    shows: data.map(entry => entry.show),
  }
}

export default Index
