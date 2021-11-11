import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';

import clsx from 'clsx';
import { SortDropdown } from './SortDropdown';
import { httpClient } from '../lib/axios';

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
                        <Tab.Panel
                            key={idx}
                            className={clsx(
                                'bg-white rounded-xl p-3',
                                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                            )}
                        >
                            <ul>
                                {results.map((result) => (
                                    <li key={result.id}>{result.title}</li>
                                ))}
                            </ul>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}
