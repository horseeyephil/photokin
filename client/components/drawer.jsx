import React from 'react'

class Panel extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            toggled: this.props.toggled
        }
        this.togglePanel=this.togglePanel.bind(this)
        this.triggerCallBack=this.triggerCallBack.bind(this)
    }

    togglePanel(evt){
        event.stopPropagation()
        this.setState({toggled: !this.state.toggled})
    }

    triggerCallBack(event){
      this.props.cb && this.props.cb()
      this.setState({toggled: !this.state.toggled})
    }

    render(){
        return (
          
            <div className = {this.props.viewClass + ' ' + (this.state.toggled ? this.props.openClass : this.props.closedClass)} >
            <div className={this.props.switch} onClick={this.togglePanel}></div>
            {this.state.toggled && <div>{this.props.children}</div>}
            </div>
    )}
}

export default Panel