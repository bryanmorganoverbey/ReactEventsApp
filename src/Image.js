import React from 'react';
import { encode } from "base-64";

// this component returns a loading spinner until the fetch request for the image has resolved.
// if the image resolved correctly, it will display the image. Otherwise it will display nothing.
class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {
                url: null,
                loaded: false
            }
        };
    }  
    
    componentDidMount() {
        this.loadImage()
    }

    async loadImage() {
        const options = {
            headers: {
                'Authorization': 'Basic ' + encode('anything:evalpass'),
                'Content-Type': 'image/jpeg'
            }
        }
        function findImageIndex(event) {
            console.log('event images: ', event.images)
            if (event && event.images && event.images.length) {

                // for (let i = 0; i < event.images.length; i++) {
                //     if (!event.images[i].id.includes('/')) {
                //         console.log(`returning: ${i}`);
                //         return i;
                //     }
                // }
            } else {
                return 0;
            }

        }
        // useImage = findImageIndex(this.props.event);

        if (this.props.event && this.props.event.images && this.props.event.images[0] && this.props.event.images[0].id) {
            let URI = encodeURI(`http://dev.dragonflyathletics.com:1337/api/dfkey/events/${this.props.event.id}/media/${this.props.event.images[0].id}`);

            fetch(URI, options)
                .then(response => {
                    let contentLength = response.headers.get("content-length");

                    if (response.status === 200 && contentLength > 1000) {
                        return response.blob()
                    } else {
                        this.loadImage()
                        return null;
                    }
                })
                .then(image => {
                    if (image) {
                        this.setState(prevState => ({
                            ...prevState,
                            image: {
                                url: URL.createObjectURL(image),
                                loaded: true
                            }
                            }));
                    }
                })
                .catch(error => {
                    this.setState(prevState => ({
                        ...prevState,
                        image: {
                            url: null,
                            loaded: true
                        }
                        }));
                })
            } else {
                this.setState(prevState => ({
                    ...prevState,
                    image: {
                        url: null,
                        loaded: true
                    }
                    }));
            }
    }

    render() {
        const { image } = this.state;
            return (
                <div>
                    <div style={{display: image.loaded ? "none" : "block"}}>
                        <div className="preloader-wrapper small active">
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
                    </div>
                    <div style={{display: image.loaded && image.url ? "block" : "none"}}>
                        <img src={image.url} width={this.props.width} height={this.props.height}/>
                    </div>
                    <div>{this.props.event.images[0].id}</div>
                </div>
            )
    }
}

export default Image;