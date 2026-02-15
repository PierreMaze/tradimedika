// tradimedika-v1/src/pages/Home.jsx
import { Helmet } from "react-helmet-async";
import { ConsentModal, useConsent } from "../features/consent";
import { Hero } from "../features/home-page";

function Home() {
  const { isModalOpen, grantConsent } = useConsent();

  return (
    <>
      <Helmet>
        <title>TRADIMEDIKA - Produits naturels pour vos symptômes</title>
        <meta
          name="description"
          content="Solutions préventives et produits naturels pour le quotidien, à votre portée."
        />
        <meta
          name="keywords"
          content="produits naturels, plantes, symptômes, santé, médecine traditionnelle, traitement naturel"
        />
        <link rel="canonical" href="https://tradimedika.com/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tradimedika.com/" />
        <meta
          property="og:title"
          content="TRADIMEDIKA - Produits naturels pour vos symptômes"
        />
        <meta
          property="og:description"
          content="Solutions préventives et produits naturels pour le quotidien, à votre portée."
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://tradimedika.com/" />
        <meta name="twitter:title" content="TRADIMEDIKA - Produits naturels" />
        <meta
          name="twitter:description"
          content="Solutions préventives et produits naturels pour le quotidien, à votre portée."
        />
      </Helmet>
      <Hero />
      <ConsentModal isOpen={isModalOpen} onAccept={grantConsent} />
    </>
  );
}

export default Home;
