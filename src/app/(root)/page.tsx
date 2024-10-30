import Image from "next/image";
import SearchForm from "../../../components/SearchForm";
import {StartupCard} from "@/components/StartupCard";
import { client } from "@/src/sanity/lib/client";
import { Startup_Queries } from "@/src/sanity/lib/queries";

import { StartupTypeCard } from "@/components/StartupCard";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const posts = await client.fetch(Startup_Queries)   // direct from sanity.
  // console.log(JSON.stringify(post,null ,2))
  const query = (await searchParams).query    
  return (
    <>
    <section className="pink_container">
      <h1 className="heading">
        Pitch Your Startup , <br/> Connect with Entrepreneurs 
      </h1>
      <p className="sub-heading !max-w-3xl">
        Submit Ideas, Vote On Pitches and Get noticed in virtual competitions.
      </p>
      <SearchForm query={query}/>
    </section>
    <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All results"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post:any) => (<StartupCard key={post._id} post={post}/>)  // post must be of type startupcard fix it.
          )):"No results found"}
        </ul>
    </section>
    </>
  );
}
