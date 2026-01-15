// tradimedika-v1/src/pages/Home.jsx
import { Helmet } from "react-helmet-async";
import { Hero } from "../features/home";

function Home() {
  return (
    <>
      <Helmet>
        <title>TRADIMEDIKA - Remèdes naturels pour vos symptômes</title>
        <meta
          name="description"
          content="Trouvez des remèdes naturels efficaces basés sur vos symptômes. Base de données de plantes, aliments et épices avec conseils d'utilisation."
        />
        <meta
          name="keywords"
          content="remèdes naturels, plantes, symptômes, santé, médecine traditionnelle, traitement naturel"
        />
        <link
          rel="canonical"
          href="https://pierremaze.github.io/tradimedika/"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://pierremaze.github.io/tradimedika/"
        />
        <meta
          property="og:title"
          content="TRADIMEDIKA - Remèdes naturels pour vos symptômes"
        />
        <meta
          property="og:description"
          content="Trouvez des remèdes naturels efficaces basés sur vos symptômes. Base de données de plantes, aliments et épices."
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content="https://pierremaze.github.io/tradimedika/"
        />
        <meta name="twitter:title" content="TRADIMEDIKA - Remèdes naturels" />
        <meta
          name="twitter:description"
          content="Trouvez des remèdes naturels efficaces basés sur vos symptômes"
        />
      </Helmet>
      <Hero />
    </>
  );
}

export default Home;
