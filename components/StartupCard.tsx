import { formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './button';
import { Author, Startup } from '@/src/sanity.types';

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

export const StartupCard = ({ post }: { post: StartupTypeCard }) => {
    const { _createdAt, views, image, _id, category, title, author, description } = post;
    return (
        <li className='startup-card group'>
            <div className='flex-between'>
                <p className='startup-card_date'>
                    {formatDate(_createdAt)}
                </p>
                <div className='flex gap-1.5'>
                    <EyeIcon />
                    <span>{views}</span>
                </div>
            </div>
            <div className='flex-between mt-5 gap-5'>
                <div className='flex-1'>
                    <Link href={`/user/${author?._id}`}>
                        <p className='text-16-medium line-clamp-1'>{author?.name}</p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
                    </Link>
                </div>
                <Link href={`/user/${author?._id}`}>
                    <img src="https://placehold.co/400x400" alt="placeholder" width={48} height={48} className="rounded-full" />
                </Link>
            </div>
            <Link href={`/startup/${_id}`}>
                <p className='startup-card_desc'>{description}</p>
                <img src="https://images.unsplash.com/photo-1625314887424-9f190599bd56?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='image' className='startup-card_img' width={400} height={400} />
            </Link>
            <div className='flex-between mt-5 gap-3'>
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className='text-16-medium'>{category}</p>
                </Link>
                <Button className="startup-card_btn" asChild>
                    <Link href={`/startup/${_id}`}>Details</Link>
                </Button>
            </div>
        </li>
    );
};
