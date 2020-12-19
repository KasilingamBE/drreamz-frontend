import React from 'react';
import {ListGroup} from 'react-bootstrap';
import {FaUserCircle} from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import moment from 'moment';

const ReviewItem = ({driverName,rating,feedback,createdAt,driverId}) => {
    return (
    <ListGroup.Item className="review-item">
        <div className="review-item-head">
            <FaUserCircle size={50}/>
            <div className="review-item-head-right">
                <div className="review-item-user">
                    <p>{driverName}</p> <span className="text-muted">{moment(Date.parse(createdAt)).format('ll')}</span>
                </div>
                <StarRatings
          rating={rating}
          starRatedColor="yellow"
          numberOfStars={5}
          name='rating'
        />
            </div>
        </div>
        <div className="description">
            {feedback}
        </div>
    </ListGroup.Item>
    )
}

export default ReviewItem;