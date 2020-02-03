import React from 'react'
import ExpandableEvent from './ExpandableEvent';

const Events = ({events}) => {
    const eventList = events.length ? (
        events.map(event => {
            return (
                <div className="collection-item" key={event.id}>
                    <ExpandableEvent event={event} key={event.id}/>
                </div>
            )
        })
    ) : null;
    
    return (
        <div>
            <div style={{display: events.length ? "none" : "block", textAlign: "center"}}>
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="events collection" style={{display: events.length ? "block" : "none"}}>
                {eventList}
            </div>
        </div>

    )
}

export default Events