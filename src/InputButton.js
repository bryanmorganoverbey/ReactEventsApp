import React from 'react';
import { encode } from "base-64";

class InputButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            didSave: true
        };
        this.handleClick = this.handleClick.bind(this);
    }  

    componentDidMount() {
        this.loadStatus();
    }

    async loadStatus() {
        const URL = `http://dev.dragonflyathletics.com:1337/api/dfkey/events/${this.props.eventId}/status/anything`
        // call api for status of this button
        const options = {
            headers: {
              'Authorization': 'Basic ' + encode('anything:evalpass'),
              'Content-Type': 'application/json'
            }
          }
          const response = await fetch(URL, options);
          // proper response will have json content length of 15 (true) or 16 (false)
          if (response.headers.get('Content-Type') === 'application/json' && (response.headers.get('Content-Length') === '15' || response.headers.get('Content-Length') === '16')) {
            const jsonResponse = await response.json();
                // save the status to local storage
                localStorage.setItem(`status:${this.props.eventId}`, `${jsonResponse.coming}`)
                // update button UI
                this.setState({
                    checked: jsonResponse.coming,
                    didSave: true
                })
            } else {
            // if no response
                // check local storage for status of this button
                let iconInLocalStorage = localStorage.getItem(`status:${this.props.eventId}`)
                if (iconInLocalStorage) {
                    // if exists 
                        // update button UI with this status
                    this.setState({
                        checked: iconInLocalStorage === 'true',
                        didSave: true
                        })
                } else {
                    // else
                    // button UI gets false by default
                    this.setState({
                        checked: false,
                        didSave: true
                        })
                }
            }


    }

    async handleClick({target}) {
        this.setState({
            checked: target.checked,
            didSave: false
           })
        const json = {
            "coming": target.checked
        }
        // save status to local storage
        localStorage.setItem(`status:${this.props.eventId}`, `${target.checked}`)
        // save status to database
        const URL = `http://dev.dragonflyathletics.com:1337/api/dfkey/events/${this.props.eventId}/status/anything`
        // call api for status of this button
        const options = {
            method: 'PUT',
            headers: {
              'Authorization': 'Basic ' + encode('anything:evalpass'),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
          }
        let response = await fetch(URL, options);
        if (response.headers.get('content-length')) {
            this.handleClick({target});
        } else {
            this.setState({
                checked: target.checked,
                didSave: true
            })
        }

    }

    render() {
        return (
            <div>             
                <div style={{display: this.state.didSave ? "none" : "block"}} className="preloader-wrapper small active">
                    <div className="spinner-layer spinner-green-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                    </div>
                </div>

                <form action="#" style={{display: this.state.didSave ? "block" : "none"}}>
                    <span>
                    <label>
                        <input type="checkbox" className="filled-in" checked={this.state.checked} onChange={this.handleClick}/>
                        <span>I'm going!</span>
                    </label>
                    </span>
                </form>
            </div>
        )
    }
}

export default InputButton;