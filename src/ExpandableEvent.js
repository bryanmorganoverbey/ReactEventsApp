import React, {useState} from 'react';
import Image from './Image';
import InputButton from './InputButton';
import Card from './Card';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import './ExpandableEvent.css'


const ExpandableEvent = ({event}) => {
    const [open, updateOpen] = useState(false);
    const toggle = () => { updateOpen(!open)}
    return (
        <div>
                <div onClick={toggle}>
                    <div className="event-line-1">
                        <div className="event-checkbox">
                            <InputButton eventId={event.id} ></InputButton>
                        </div>
                        <h3 className="event-name">{event.name}</h3>
                        <LazyLoadComponent>
                            <Image event={event} width={'60px'} height={'47px'}/>
                        </LazyLoadComponent>
                    </div>
                    <div className="event-line-2">
                        <h6>Description: {event.description}</h6>
                        <div>
                            <h6>Location: {event.location.name}</h6>
                        </div>
                    </div>
                </div>
                <Card open={open} event={event}></Card>
        </div>
    )
}

export default ExpandableEvent;