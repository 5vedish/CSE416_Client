import React, { useState } from 'react';
import GenerateStars from './GenerateStars';
import { Rating, RatingView } from 'react-simple-star-rating';
import { httpClient } from '../../lib/axios';
import { ThumbUpIcon } from '@heroicons/react/solid';
import { ThumbUpIcon as ThumbUpIconOutline } from '@heroicons/react/outline';
import LikeComponent from '../LikeComponent';

export default function PlatformBanner({
    title,
    author,
    id,
    rating,
}: {
    title: String;
    author: String;
    id: number;
    rating: number;
}) {
    return (
        <div>
            <div className="inline-flex space-x-5 items-center">
                <div className="m-8 inline-block">
                    <div className="font-logo font text-xl"> {title} </div>
                    <div className="m-2"> by {author} </div>
                </div>
                <div>
                    <RatingView
                        ratingValue={Math.floor(rating)} /* Rating Props */
                    />
                    <div>{rating} / 5</div>
                </div>

                {/* referenced https://www.npmjs.com/package/react-simple-star-rating */}
                <div className="inline-block">
                    <LikeComponent id={id} showNumber={true} />
                </div>
            </div>
        </div>
    );
}
