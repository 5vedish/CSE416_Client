import React, { useState } from 'react';
import GenerateStars from './GenerateStars';
import { Rating, RatingView } from 'react-simple-star-rating';
import { httpClient } from '../../lib/axios';
import { ThumbUpIcon } from '@heroicons/react/solid';
import { ThumbUpIcon as ThumbUpIconOutline } from '@heroicons/react/outline';

export default function PlatformBanner({
    title,
    author,
    id,
    liked,
    refetch,
    rating,
}: {
    title: String;
    author: String;
    id: number;
    liked: boolean;
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
                <div className="inline-block">
                    {liked ? (
                        <ThumbUpIcon
                            className="ml-4 w-10 h-10 text-black hover:text-blue-500"
                            onClick={() => {
                                console.log('Handle Unlike');
                            }}
                        />
                    ) : (
                        <ThumbUpIconOutline
                            className="ml-4 w-10 h-10 text-black hover:text-blue-500"
                            onClick={() => {
                                console.log('Handle Like');
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
