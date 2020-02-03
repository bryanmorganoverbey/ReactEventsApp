import React from 'react'
import Image from './Image';
import Comments from './Comments';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    } 

    render(){
        if(this.props.open) {
            return (
                <div className="card">
                    <Image event={this.props.event} width={'300px'} height={'150px'}/>
                    <h3> Comments from users:</h3>
                    <div >
                        <Comments event={this.props.event} />
                    </div>
                </div>
            )
        } else {
            return null;
        }

    }
}

export default Card;