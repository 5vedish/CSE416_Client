export function ExpTrack({
    experience,
    level,
}: {
    experience: number;
    level: number;
}) {
    return (
        <div className="relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                <div
                    style={{
                        width: `${(experience / ((level + 1) * 10000)) * 100}%`,
                    }}
                    className="
          shadow-none
          flex flex-col
          text-center
          whitespace-nowrap
          text-white
          justify-center
          bg-blue-500
        "
                ></div>
            </div>
            <p className="text-center">
                {experience}/{(level + 1) * 10000}
            </p>
        </div>
    );
}
