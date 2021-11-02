import { StarIcon } from '@heroicons/react/solid';

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
                {stars > 0 ? (
                    <StarIcon className="inline-block w-5 h-5" />
                ) : (
                    <div />
                )}
                {stars > 1 ? (
                    <StarIcon className="inline-block w-5 h-5" />
                ) : (
                    <div />
                )}
                {stars > 2 ? (
                    <StarIcon className="inline-block w-5 h-5" />
                ) : (
                    <div />
                )}
                {stars > 3 ? (
                    <StarIcon className="inline-block w-5 h-5" />
                ) : (
                    <div />
                )}
                {stars > 4 ? (
                    <StarIcon className="inline-block w-5 h-5" />
                ) : (
                    <div />
                )}
            </div>
        </div>
    );
}
