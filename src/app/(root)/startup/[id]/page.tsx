import { formatDate } from '@/lib/utils';
import { client } from '@/src/sanity/lib/client';
import { Startup_Queries_By_Id } from '@/src/sanity/lib/queries';
import Image from 'next/image';
import  Link  from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import markdownit from 'markdown-it'
// Define interface for the post structure
interface Post {
   category:string,
    _createdAt: string;
    title: string;
    description: string;
    image: string;
    author: {
        _id: string;
        image: string;
        name: string;
        username:string
    };
    pitch : string
}
// Fix the params type - remove Promise wrapper as Next.js params are not promised
const Page = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const post = await client.fetch<Post>(Startup_Queries_By_Id, { id });
    const md = markdownit();
     const parsedContent = md.render(post?.pitch||'')
    if (!post) return notFound();

    return (
        <>
            <section className='pink_container !min-h-[230px]'>
                <p className='tag'>{formatDate(post._createdAt)}</p>
                <h1 className='heading'>{post.title}</h1>
                <p className='sub-heading !max-w-5xl'>{post.description}</p>
            </section>

            <section className='section_container'>
                {/* Add next/image proper configuration */}
                <Image
                    src={post.image}
                    alt="thumbnail"
                    width={1200}  // Add appropriate width
                    height={630}  // Add appropriate height
                    className='w-full h-auto rounded-xl'
                />

                <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
                    <div className='flex-between gap-5'>
                        <Link
                            href={`/user/${post.author._id}`}
                            className='flex gap-2 items-center mb-3'
                        >
                            <Image
                                src={post.author.image}
                                alt='avatar'
                                width={64}
                                height={64}
                                className='rounded-full drop-shadow-lg  aspect-square object-cover'
                            />
                            <div>
                                <p className='text-20-medium'>{post.author.name}</p>
                                <p className='text-16-medium !text-black-300'>
                                    @{post.author.username}
                                </p>
                            </div>
                        </Link>
                        <p className='category-tag'>{post?.category}</p>
                    </div>
                    <h3 className='text-30-bold'>Pitch details</h3>
                    {parsedContent ? (
                        <article className='prose font-work-sans break-all max-w-4xl' dangerouslySetInnerHTML={{__html:parsedContent}}/>
                    ) : <p className='no-result'>No details provdied</p>}
                    <hr className='divider' />
                </div>
            </section>
        </>
    );
};

export default Page;