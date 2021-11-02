import React from 'react';
import GenerateStars from './GenerateStars';

export default function PlatformBanner({
    title,
    author,
    stars,
}: {
    title: String;
    author: String;
    stars: number;
}) {
    return (
        <div>
            <div className="content-center">
                <div className="m-8 inline-block">
                    <div className="font-logo font text-xl"> {title} </div>
                    <div className="m-2"> by {author} </div>
                </div>
                <GenerateStars stars={3} />
            </div>
        </div>
    );
}
