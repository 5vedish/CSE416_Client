import React, { useState } from 'react';
import GenerateStars from './GenerateStars';
import { Rating, RatingView } from 'react-simple-star-rating';
import { httpClient } from '../../lib/axios';

export default function PlatformBanner({
    title,
    author,
    id,
    refetch,
    rating,
}: {
    title: String;
    author: String;
    id: number;
    refetch: () => Promise<void>;
    rating: number;
}) {
    const handleRating = async (newRating: number) => {
        await httpClient
            .put(`/platforms/${id}/ratings`, { rating: newRating })
            .catch((e) => {
                console.log(e);
            });
        console.log(`/platforms/${id}/ratings/${newRating}`);
        await refetch();
    };
    return (
        <div>
            <div className="content-center">
                <div className="m-8 inline-block">
                    <div className="font-logo font text-xl"> {title} </div>
                    <div className="m-2"> by {author} </div>
                </div>
                <Rating
                    onClick={handleRating}
                    ratingValue={rating} /* Rating Props */
                />
                {/* referenced https://www.npmjs.com/package/react-simple-star-rating */}
            </div>
        </div>
    );
}
