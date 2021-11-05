import { StarIcon } from '@heroicons/react/solid';

export default function GenerateStars({ stars }: { stars: number }) {
    return (
        <span>
            {stars > 0 ? (
                <StarIcon className="inline-block w-5 h-5 text-yellow-500" />
            ) : (
                <div />
            )}
            {stars > 1 ? (
                <StarIcon className="inline-block w-5 h-5 text-yellow-500" />
            ) : (
                <div />
            )}
            {stars > 2 ? (
                <StarIcon className="inline-block w-5 h-5 text-yellow-500" />
            ) : (
                <div />
            )}
            {stars > 3 ? (
                <StarIcon className="inline-block w-5 h-5 text-yellow-500" />
            ) : (
                <div />
            )}
            {stars > 4 ? (
                <StarIcon className="inline-block w-5 h-5 text-yellow-500" />
            ) : (
                <div />
            )}
        </span>
    );
}
