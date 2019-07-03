import React from 'react'

class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      error: null,
      errorInfo: null
    }
  }

  componentDidCatch(error, info) {
    const newState = { ...this.state }
    newState.error = error
    newState.errorInfo = info
    this.setState(newState)
  }

  render() {
    if(this.state.error) {
      return (
        <h3>
          Teste de erro!
        </h3>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary