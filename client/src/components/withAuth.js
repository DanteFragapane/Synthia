import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default function withAuth (ComponentToProtect) {
  return class extends Component {
    constructor () {
      super()
      this.state = {
        loading: true,
        redirect: false
      }
    }

    componentDidMount () {
      fetch('/authenticate')
        .then((res) => {
          this.setState({ loading: false })
        })
        .catch((err) => {
          console.error(err)
          this.setState({ loading: false, redirect: true })
        })
    }

    render () {
      const { loading, redirect } = this.state
      if (loading) {
        return null
      }
      if (redirect) {
        return <Redirect to="/login" />
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      )
    }
  }
}
