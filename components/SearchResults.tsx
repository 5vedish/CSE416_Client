import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';

import clsx from 'clsx';
import Link from 'next/link';
import { PlatformSortDropdown } from './PlatformSortDropdown';
import { httpClient } from '../lib/axios';
import { SearchIcon, StarIcon } from '@heroicons/react/solid';
import { UserSortDropdown } from './UserSortDropdown';
import { RatingView } from 'react-simple-star-rating';
import { AxiosResponse } from 'axios';

export function SearchResults() {
    const [categories, setCategories] = useState<{
        Platforms: {
            id: number;
            rating: number;
            title: string;
            owner: { displayName: string };
        }[];
        Profiles: {
            id: string;
            displayName: string;
            currency: number;
            experience: number;
            level: number;
        }[];
    }>({
        Platforms: [],
        Profiles: [],
    });
    const [currentCategory, setCurrentCategory] =
        useState<keyof typeof categories>('Platforms');
    const [platformCriterion, setCriterion] = useState<'title' | 'rating'>(
        'title',
    );
    const [userCriterion, setUserCriterion] = useState<
        'displayName' | 'currency' | 'level'
    >('displayName');
    const [desc, setDesc] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        console.log(
            `Sorting ${currentCategory} by ${
                currentCategory === 'Platforms'
                    ? platformCriterion
                    : userCriterion
            } in ${desc ? 'descending' : 'ascending'} order.`,
        );

        (async () => {
            if (currentCategory === 'Platforms') {
                const response = await httpClient.get<any>('/platforms', {
                    withCredentials: true,
                    params: {
                        sort_by: platformCriterion,
                        desc,
                        title: searchInput,
                        per_page: 500,
                    },
                });

                console.log(response.data.platforms);

                setCategories({
                    ...categories,
                    Platforms: response.data.platforms,
                });
            } else {
                const response = await httpClient.get<any>('/users', {
                    withCredentials: true,
                    params: {
                        sort_by: userCriterion,
                        desc,
                        name: searchInput,
                        per_page: 500,
                    },
                });

                setCategories({
                    ...categories,
                    Profiles: response.data.users,
                });
            }
        })();
    }, [searchInput, currentCategory, platformCriterion, desc]);

    return (
        <Tab.Group
            onChange={(idx) => {
                setCurrentCategory(
                    Object.keys(categories)[idx] as keyof typeof categories,
                );
            }}
        >
            <div className="my-4 relative">
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search"
                    className="shadow-sm focus:ring-blue-500 focus:blue-gray-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={searchInput}
                    onChange={(e) => {
                        setSearchInput(e.target.value);
                    }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center py-1.5 pr-1.5">
                    <SearchIcon className="text-gray-400 h-5 w-5" />
                </div>
            </div>
            <Tab.List className="flex items-center justify-between rounded-xl">
                <span className="font-semibold">
                    {categories[currentCategory].length} results
                </span>
                <div className="flex space-x-8 rounded-xl">
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
                {currentCategory === 'Platforms' ? (
                    <PlatformSortDropdown
                        setCriterion={setCriterion}
                        setDesc={setDesc}
                    />
                ) : (
                    <UserSortDropdown
                        setCriterion={setUserCriterion}
                        setDesc={setDesc}
                    />
                )}
            </Tab.List>
            <Tab.Panels className="mt-2">
                {Object.values(categories).map((results, idx) => (
                    <Tab.Panel key={idx} className="rounded-xl p-3">
                        <ul className="grid grid-cols-3 gap-4">
                            {results.map((result) =>
                                'owner' in result ? (
                                    <Link
                                        key={`platform-${result.id}`}
                                        href={`/platforms/${result.id}`}
                                        passHref
                                    >
                                        <li>
                                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                                <div className="flex justify-center px-4 py-5 sm:px-6">
                                                    <span className="font-semibold mr-1">
                                                        {result.title}
                                                    </span>
                                                    <span className="font-medium text-gray-400">
                                                        by{' '}
                                                        {
                                                            result.owner
                                                                .displayName
                                                        }
                                                    </span>
                                                </div>
                                                <div className="px-4 py-5 sm:p-6">
                                                    {/* Content goes here */}
                                                </div>
                                                <div className="flex justify-between px-4 py-4 sm:px-6">
                                                    <div className="flex-shrink-0 flex pr-5">
                                                        <RatingView
                                                            ratingValue={
                                                                result.rating
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </Link>
                                ) : (
                                    <Link
                                        key={`profile-${result.id}`}
                                        href={`/users/${result.id}`}
                                        passHref
                                    >
                                        <li>
                                            <div className="bg-white overflow-hidden shadow rounded-lg">
                                                <div className="flex justify-center px-4 py-5 sm:px-6">
                                                    <span className="font-semibold mr-1">
                                                        {result.displayName}
                                                    </span>
                                                </div>
                                                <div className="px-4 py-5 sm:p-6">
                                                    {/* Content goes here */}
                                                </div>
                                                <div className="flex justify-between px-4 py-4 sm:px-6">
                                                    <div>
                                                        Lv. {result.level}
                                                    </div>
                                                    <div>
                                                        ${result.currency}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </Link>
                                ),
                            )}
                        </ul>
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    );
}
