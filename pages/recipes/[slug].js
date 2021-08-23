/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import {
  sanityClient,
  urlFor,
  usePreviewSubscription,
  PortableText,
} from "../../lib/sanity";
import React from "react";

const recipeQuery = `*[_type == "recipe" && slug.current == $slug][0]{
  _id, 
  name, 
  slug, 
  mainImage,
  ingredient[]{
    _key,
    unit,
    wholeNumber,
    fraction,
    ingredient->{
      name
    }
  },
  instructions,
  likes
}`;

export default function OneRecipe({ data }) {
  const { recipe } = data;
  return (
    <article className="recipe">
      <h1>{recipe.name}</h1>
      <main className="content">
        <img src={urlFor(recipe?.mainImage).url()} alt={recipe.name} />
        <div className="breakdown">
          <ul className="ingredients">
            {recipe.ingredient?.map((ingredient) => (
              <li key={ingredient.key} className="ingredient">
                {ingredient?.wholeNumber}
                {ingredient?.fraction}
                {ingredient?.unit}
                {ingredient?.ingredient?.name}
              </li>
            ))}
          </ul>
          <PortableText
            blocks={recipe?.instructions}
            className="instructions"
          />
        </div>
      </main>
    </article>
  );
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "recipe" && defined(slug.current)]{
      "params": {
        "slug": slug.current
      }
    }`
  );

  debugger;
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const recipe = await sanityClient.fetch(recipeQuery, { slug });
  return { props: { data: { recipe } } };
}
