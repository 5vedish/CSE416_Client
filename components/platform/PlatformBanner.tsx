import React, { useState } from 'react';
import GenerateStars from './GenerateStars';
import { Rating, RatingView } from 'react-simple-star-rating';

export default function PlatformBanner({
    title,
    author,
    stars,
}: {
    title: String;
    author: String;
    stars: number;
}) {
    const [rating, setRating] = useState(stars); // initial rating value
    const handleRating = (rate: React.SetStateAction<number>) => {
        setRating(rate);
        // Some logic
    };
    return (
        <div>
            <div className="content-center">
                <div className="m-8 inline-block">
                    <div className="font-logo font text-xl"> {title} </div>
                    <div className="m-2"> by {author} </div>
                </div>
                <div className="App">
                    <Rating
                        onClick={handleRating}
                        ratingValue={rating} /* Rating Props */
                    />
                </div>
            </div>
        </div>
    );
}
