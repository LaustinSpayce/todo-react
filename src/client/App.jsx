import React from 'react'
import Moment from 'moment'
import { hot } from 'react-hot-loader'

class Form extends React.Component {
  constructor() {
    super()

    this.state = {
      currentInput: "",
      errorString: "",
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.submitNewItem()
    }
  }

  handleInputchange(event) {
    let newWord = event.target.value
    this.setState( { currentInput: newWord })
  }

  submitNewItem() {
    console.log("item submitted!")
    if (this.state.currentInput.trim().length > 1 && this.state.currentInput.length < 200 ) {
      this.props.submitItem(this.state.currentInput)
      this.setState({ currentInput: "", errorString: "" })
    } else {<s></s>
      let errorString = "Your item must have more than one character and be less than 200 characters"
      this.setState({ errorString: errorString })
    } 
  }

  render() {
    return (
    <div>
      <div className="alert alert-danger">{this.state.errorString}</div>
      <input 
        onChange={(event)=>{this.handleInputchange(event);}}
        onKeyPress={(event) => {this.handleKeyPress(event);}} 
        value={this.state.currentInput}/><br/>
      <button onClick={()=>{this.submitNewItem();}}>click me to add</button>
    </div>
    )
  }
}


class ItemList extends React.Component {
  constructor() {
    super()

  }

    render() {
      let itemsToShow = this.props.list.map ((item, index) => {
        return (
          <ToDoItem 
            markAsDone={(id) => {this.props.markAsDone(id)}}
            index={index}
            item={item.item}
            time={item.time}
            key={index}
            />
        )
      })
      return (
        <ul>
          {itemsToShow}
        </ul>
      )
    }

}


class ToDoItem extends React.Component {

  doneItem(event) {
    let number = event.target.id
    this.props.markAsDone(number)
  }

  render() {
    let timeString = Moment(this.props.time).fromNow()
    return (
      <div key={this.props.index} className="card mb-2">        
        <div className="card-body">{this.props.item}
          <br/>
          <span className="text-muted">Added to the list {timeString}</span>
          <br/>
          <button id={this.props.index} onClick={(event)=>{this.doneItem(event);}}>Done!</button>
        </div>
      </div>
    )
  }
}


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      list: []
    }
  }

  pushToList(itemString) {
    let item = { item: itemString, time: Moment.now() }
    let newList = this.state.list
    newList.push(item)
    let object = { list: newList }
    this.setState(object)
  }

  doneItem(number) {
    let itemsArray = this.state.list
    itemsArray.splice(number, 1);
    this.setState( { lsit: itemsArray })
  }

  render() {

    return (
      <div>
        <div className="row">     
          <Form 
            submitItem={(itemString)=>{this.pushToList(itemString)}}
          />
        </div>
        <div>
          <ItemList 
            markAsDone={(number)=>{this.doneItem(number)}}
            list={this.state.list}/>
        </div>
      </div>
    )
  }
}

export default hot(module)(App)
