import {
  sanityClient,
  urlFor,
  usePreviewSubscription,
  portableText,
} from "../../lib/sanity";

const recipeQuery = `*[_type == "recipe" && slug.current == $slug][0]{
  _id, 
  name, 
  slug, 
  mainImage,
  ingredient[]{
    unit,
    wholeNumber,
    fraction,
    ingredient->{
      name
    }
  },
  instructions
}`;

export default function OneRecipe() {}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "recipe" && defined(slug.current)]{
      "params": {
        "slug": slug.current
      }
    }`
  );
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
