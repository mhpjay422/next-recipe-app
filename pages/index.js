/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { sanityClient, urlFor } from "../lib/sanity";

const recipesQuery = `*[_type == "recipe"] {
  _id,
  name, 
  slug,
  mainImage
}`;

export default function Home({ recipes }) {
  return (
    <div>
      <Head>
        <title>Mamas Home Kitchen</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Welcome to Mamas Home</h1>
      <ul className="recipes-list">
        {recipes?.length > 0 &&
          recipes.map((recipe) => (
            <li key={recipe.id} className="recipe-card">
              <Link href="/">
                <a>
                  <img src={urlFor(recipe.mainImage).url()}></img>
                  <span>{recipe.name}</span>
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const recipes = await sanityClient.fetch(recipesQuery);
  return { props: { recipes } };
}
