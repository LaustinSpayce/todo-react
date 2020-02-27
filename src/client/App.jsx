import React from 'react'
import { hot } from 'react-hot-loader'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentItem: "",
      list: [],
      errorString: ""
    }
  }

  pushToList(itemString) {
    let item = itemString
    let newList = this.state.list
    newList.push(item)
    let object = { list: newList }
    this.setState(object)
  }

  submitNewItem() {
    console.log("item submitted!")
    if (this.state.currentItem.trim().length > 1 && this.state.currentItem.length < 200 ) {
      this.pushToList(this.state.currentItem)
      this.setState( { currentItem: "", errorString: "" })
    } else {
      let errorString = "Your item must have more than one character and be less than 200 characters"
      this.setState({ errorString: errorString })
    }
    
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.submitNewItem()
    }
  }

  handleInputchange(event) {
    let newWord = event.target.value
    this.setState( { currentItem: newWord })
    
  }


  render() {
    let itemsToShow = this.state.list.map ((item, index) => {
      return (
        <li key={index}><button>Done!</button> {item}</li>
      )
    })

    return (
      <div>
        <p>{this.state.errorString}</p>
        <input onChange={(event)=>{this.handleInputchange(event);}} value={this.state.currentItem}
        onKeyPress={(event) => {this.handleKeyPress(event);}} /><br/>
        <button onClick={()=>{this.submitNewItem();}}>click me to add</button>
      <ul>
        {itemsToShow}
      </ul>
      </div>
    );
  }
}

export default hot(module)(App)
