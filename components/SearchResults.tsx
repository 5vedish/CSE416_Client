import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';

import clsx from 'clsx';
import { SortDropdown } from './SortDropdown';
import { httpClient } from '../lib/axios';
import { StarIcon } from '@heroicons/react/solid';

export function SearchResults() {
    const [categories, setCategories] = useState<{
        Platforms: {
            id: number;
            rating: number;
            title: string;
            owner: { displayName: string };
        }[];
        Profiles: [];
    }>({
        Platforms: [],
        Profiles: [],
    });
    const [currentCategory, setCurrentCategory] =
        useState<keyof typeof categories>('Platforms');
    const [criterion, setCriterion] = useState<'title' | 'rating' | 'likes'>(
        'title',
    );
    const [desc, setDesc] = useState(false);

    useEffect(() => {
        console.log(
            `Sorting ${currentCategory} by ${criterion} in ${
                desc ? 'descending' : 'ascending'
            } order.`,
        );

        (async () => {
            if (currentCategory === 'Platforms') {
                const response = await httpClient.get<any>('/platforms', {
                    withCredentials: true,
                    params: {
                        sort_by: criterion,
                        desc,
                    },
                });

                console.log(response.data.platforms);

                setCategories({
                    Platforms: response.data.platforms,
                    Profiles: categories.Profiles,
                });
            } else {
            }
        })();
    }, [currentCategory, criterion, desc]);

    return (
        <div className="w-full max-w-2xl px-2 py-16 sm:px-0">
            <Tab.Group
                onChange={(idx) => {
                    setCurrentCategory(
                        Object.keys(categories)[idx] as keyof typeof categories,
                    );
                }}
            >
                <Tab.List className="flex items-center justify-between space-x-8 space-x-1 rounded-xl">
                    <span className="font-semibold">
                        {categories[currentCategory].length} results
                    </span>
                    <div className="flex space-x-8 space-x-1 rounded-xl">
                        {Object.keys(categories).map((category) => (
                            <Tab
                                key={category}
                                className={({ selected }) =>
                                    clsx(
                                        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                                        selected
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                    )
                                }
                            >
                                {category}
                            </Tab>
                        ))}
                    </div>
                    <SortDropdown
                        setCriterion={setCriterion}
                        setDesc={setDesc}
                    />
                </Tab.List>
                <Tab.Panels className="mt-2">
                    {Object.values(categories).map((results, idx) => (
                        <Tab.Panel key={idx} className="rounded-xl p-3">
                            <ul className="grid grid-cols-3 gap-4">
                                {results.map((result) => (
                                    <li key={result.id}>
                                        <div className="bg-white overflow-hidden shadow rounded-lg">
                                            <div className="flex justify-center px-4 py-5 sm:px-6">
                                                <span className="font-semibold mr-1">
                                                    {result.title}
                                                </span>
                                                <span className="font-medium text-gray-400">
                                                    by{' '}
                                                    {result.owner.displayName}
                                                </span>
                                            </div>
                                            <div className="px-4 py-5 sm:p-6">
                                                {/* Content goes here */}
                                            </div>
                                            <div className="flex justify-between px-4 py-4 sm:px-6">
                                                <div className="flex-shrink-0 flex pr-5">
                                                    {[
                                                        ...Array(result.rating),
                                                    ].map((_, idx) => (
                                                        <StarIcon
                                                            key={idx}
                                                            className="h-5 w-5 text-yellow-400"
                                                            aria-hidden="true"
                                                        />
                                                    ))}
                                                    {[
                                                        ...Array(
                                                            5 - result.rating,
                                                        ),
                                                    ].map((_, idx) => (
                                                        <StarIcon
                                                            key={5 - idx}
                                                            className="h-5 w-5 text-gray-300"
                                                            aria-hidden="true"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
