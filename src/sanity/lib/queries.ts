import { defineQuery } from "next-sanity";

export const Startup_Queries =
  defineQuery(`*[_type=="startup" && defined(slug.current)]|order(_createdAt desc){  // sort the latest in descending order
  _id ,
   title,
    category,
    description,
    _createdAt,
    author ->{id , image}
}`);
