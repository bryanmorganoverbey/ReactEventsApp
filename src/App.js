import React, {Component} from 'react';
import Events from './Events'
import { encode } from "base-64";
import moment from 'moment';
var lzutf8 = require('lzutf8');



class App extends Component {

  state = {
    events: [],
    eventsTimeStamp: null
  }

  async fetchEvents() {
    const eventsurl = 'http://dev.dragonflyathletics.com:1337/api/dfkey/events';
    const options = {
      headers: {
        'Authorization': 'Basic ' + encode('anything:evalpass'),
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(eventsurl, options);
    if (response.headers.get('content-type') === 'application/json' && response.headers.get('content-length') > 1000 ) {
      const fetchEvents = await response.json();
      localStorage.setItem('events', lzutf8.compress(JSON.stringify(fetchEvents) , {outputEncoding: 'Base64' }));
      localStorage.setItem('eventsTimeStamp', JSON.stringify(moment()));
      this.setState({events: fetchEvents, eventsTimeStamp: moment()});
    } else {
      this.fetchEvents()
    }
  }

  componentDidMount() {
    // if we have events in local storage use them
    // else fetch events which will store them in local storage
    let eventsFromLocalStorage = localStorage.getItem('events');
    if(eventsFromLocalStorage) {
      this.setState({events: JSON.parse(lzutf8.decompress(eventsFromLocalStorage, {inputEncoding: 'Base64'})), eventsTimeStamp: moment(JSON.parse(localStorage.getItem('eventsTimeStamp'), 'MM-DD-YYYY hh:mm A'))})
      this.fetchEvents()
    } else {
      this.fetchEvents()
      .then()
    }
  }

  render() {
    return (
      <div>
        <div className="event-app container">
        <h1 className="center blue-text">Events</h1>
        <span style={{display: this.state.eventsTimeStamp ? "block" : "none"}}>{`Last updated ${this.state.eventsTimeStamp}`}</span>
        <Events events={this.state.events} openEventDetails={this.openEventDetails}/>
        </div>
      </div>

    );
  }
}

export default App;
