import React, { Component } from 'react' 
import './App.css'
import { sampleText } from './sampleText' 
import marked from 'marked'

class App extends Component {
// creation de l'objet 'state' avec la propriétée 'text' qui charge 'sampleText'
  state = {
    text: sampleText
  }

  componentDidMount () {
    const text = localStorage.getItem('text') // getItem recupere text dans le localstorage 
    if (text){ // si text existe recupere les données
      this.setState({ text }) 
    }else{ // sinon mais moi le 'text' par default 
      this.setState({ text : sampleText })
    }
  }

  // methode qui enregistre le text dans le localstorage 
  componentDidUpdate() {
    const {text} = this.state 
    localStorage.setItem('text', text) // setItem enregistre une donnée
  }


// methode qui permet de
  handleChange = event => {
// event = au moment ou quelque chose change
// target = ou et ce que cela change (le textarea)
// value = à la valeur du textarea autrement dit de notre state
    const text = event.target.value// recupere la valeur du state
    this.setState({ text }) //mise a jour

  }

// methode qui retourne la librairie "marked"
  renderText = text => {
    const __html = marked(text, { sanitize: true })
    return { __html}
  }

  render(){
    return (
      <div className="container">Bonjour
        <div className="row" >
          <div className="col-sm-6">
            <textarea onChange={ this.handleChange } // rappel de la methode
                      value={ this.state.text } // charge mon fichier 'sampleText' dans mon TextArea grace au 'state'
                      className="form-control" 
                      rows="35" 
            />
          </div>
          <div className="col-sm-6">
            <div dangerouslySetInnerHTML={this.renderText(this.state.text)} ></div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;

