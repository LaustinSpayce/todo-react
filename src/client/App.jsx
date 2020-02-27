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
    let object = { list: newList, currentItem: "", errorString: "" }
    this.setState(object)
  }

  submitNewItem() {
    console.log("item submitted!")
    if (this.state.currentItem.trim().length > 1 && this.state.currentItem.length < 200 ) {
      this.pushToList(this.state.currentItem)
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

  doneItem(event) {
    let itemsArray = this.state.list
    console.log(event.target.id)
    itemsArray.splice(event.target.id, 1);
    this.setState( { lsit: itemsArray })
  }


  render() {
    let itemsToShow = this.state.list.map ((item, index) => {
      return (
        <li key={index}><button id={index} onClick={(event)=>{this.doneItem(event);}}>Done!</button> {item}</li>
      )
    })

    return (
      <div>
        <p>{this.state.errorString}</p>
        <input 
          onChange={(event)=>{this.handleInputchange(event);}}
          onKeyPress={(event) => {this.handleKeyPress(event);}} 
          value={this.state.currentItem}/>
          <br/>
        <button onClick={()=>{this.submitNewItem();}}>click me to add</button>
      <ul>
        {itemsToShow}
      </ul>
      </div>
    );
  }
}

export default hot(module)(App)
