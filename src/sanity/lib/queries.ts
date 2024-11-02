import { defineQuery } from "next-sanity";

export const Startup_Queries =
  defineQuery(`*[_type=="startup" && defined(slug.current) && !defined($search) || title match $search||category match $search || author->name match $search ] |order(_createdAt desc){  // sort the latest in descending order
  _id ,
   title,
   slug,
   views,
   image,
    category,
    description,
    _createdAt,
    author ->{id , image}
}`);

export const Startup_Queries_By_Id =
  defineQuery(`*[_type=="startup" && _id==$id][0]{
  _id,
  slug,
  views,
  image,
  description,
  category,
  _createdAt,
    author->{id,name,username,image,bio},
    title,
    pitch
}`);
