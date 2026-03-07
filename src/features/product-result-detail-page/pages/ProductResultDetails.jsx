import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FeedbackLink from "../../../components/ui/feedback/FeedbackLink";
import { useAuth } from "../../auth";
import { useConsent } from "../../consent";
import {
  generateProductSEOMeta,
  getTypeColors,
  ProductResultDetailsAllergensSection,
  ProductResultDetailsAllergyWarning,
  ProductResultDetailsContraindicationsSection,
  ProductResultDetailsEfficacyScore,
  ProductResultDetailsHeader,
  ProductResultDetailsInteractionsSection,
  ProductResultDetailsNavigation,
  ProductResultDetailsPropertiesSection,
  ProductResultDetailsSimilarProducts,
  ProductResultDetailsSourcesSection,
  ProductResultDetailsTipsSection,
  ProductResultDetailsUsagesList,
  useProductAllergyCheck,
  useProductDetails,
} from "..";
import { ProductResultNotFound } from "../../product-result-page";

/**
 * ProductResultDetails Page
 *
 * Displays complete information about a specific natural product.
 */
function ProductResultDetails() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { hasConsent } = useConsent();
  const selectedProducts = location.state?.symptoms || [];
  // const isRecommended = location.state?.isRecommended || false;

  const { product, safeImageUrl, notFound } = useProductDetails(slug);
  const { hasUserAllergens, allergenNames } = useProductAllergyCheck(product);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    } else if (!hasConsent) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, hasConsent, navigate]);

  if (notFound) {
    return <ProductResultNotFound variant="remedy-not-found" />;
  }

  const typeColors = getTypeColors();
  const { pageTitle, pageDescription, canonicalUrl } = generateProductSEOMeta(
    product,
    slug,
  );

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={safeImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={safeImageUrl} />
      </Helmet>

      <article className="text-dark dark:text-light animate-fade-in-up w-full transition duration-300 ease-in-out motion-reduce:animate-none motion-reduce:opacity-100">
        <ProductResultDetailsNavigation
          selectedSymptoms={selectedProducts}
          variant="top"
        />

        {/* {isRecommended && <ProductResultDetailsRecommendedBanner />} */}

        {hasUserAllergens && (
          <ProductResultDetailsAllergyWarning allergenNames={allergenNames} />
        )}

        <ProductResultDetailsHeader
          product={product}
          safeImageUrl={safeImageUrl}
          typeColors={typeColors}
        />

        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
          <ProductResultDetailsEfficacyScore properties={product.properties} />

          <ProductResultDetailsPropertiesSection
            properties={product.properties}
          />

          <ProductResultDetailsUsagesList uses={product.uses} />

          <ProductResultDetailsContraindicationsSection
            contraindications={product.contraindications}
          />

          <ProductResultDetailsInteractionsSection
            interactions={product.interactions}
          />

          <ProductResultDetailsAllergensSection allergens={product.allergens} />

          <ProductResultDetailsTipsSection tips={product.tips} />

          <ProductResultDetailsSourcesSection sources={product.sources} />
        </div>

        <div className="mb-6">
          <ProductResultDetailsSimilarProducts product={product} />
        </div>

        <ProductResultDetailsNavigation
          selectedSymptoms={selectedProducts}
          variant="bottom"
        />

        <FeedbackLink />
      </article>
    </>
  );
}

export default ProductResultDetails;
