import React from 'react';

const Comments = ({event}) => {


    const commentsList = event.comments.length ? ( 
        event.comments.map((comment) => {
            return (
                <div className="collection-item" >
                    <p><b>User: </b>{comment.from}</p>
                    <p><b>Comment: </b> {comment.text}</p>
                </div>
            )
        })

    ) : null;

    return (
            <div className="comments collection">
                {commentsList}
            </div>
    )

}

export default Comments