import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FeedbackLink from "../components/ui/feedback/FeedbackLink";
import { useConsent } from "../features/consent";
import {
  generateProductSEOMeta,
  getTypeColors,
  ProductResultDetailsAllergensSection,
  ProductResultDetailsAllergyWarning,
  ProductResultDetailsContraindicationsSection,
  ProductResultDetailsHeader,
  ProductResultDetailsNavigation,
  ProductResultDetailsPropertiesSection,
  ProductResultDetailsTipsSection,
  useProductAllergyCheck,
  useProductDetails,
} from "../features/product-result-detail-page";
import { ProductResultNotFound } from "../features/product-result-page";

/**
 * ProductResultDetails Page
 *
 * Displays complete information about a specific natural product.
 */
function ProductResultDetails() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { hasConsent } = useConsent();
  const selectedProducts = location.state?.symptoms || [];
  // const isRecommended = location.state?.isRecommended || false;

  const { product, safeImageUrl, notFound } = useProductDetails(slug);
  const { hasUserAllergens, allergenNames } = useProductAllergyCheck(product);

  useEffect(() => {
    if (!hasConsent) {
      navigate("/", { replace: true });
    }
  }, [hasConsent, navigate]);

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

        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-6">
          <div className="lg:col-span-2">
            <ProductResultDetailsPropertiesSection
              properties={product.properties}
            />
          </div>
          {/* <div className="lg:col-span-4">
            <ProductResultDetailsSymptomsSection symptoms={product.symptoms} />
          </div> */}
          <div className="lg:col-span-2">
            <ProductResultDetailsAllergensSection
              allergens={product.allergens}
            />
          </div>

          <div className="lg:col-span-2">
            <ProductResultDetailsContraindicationsSection
              contraindications={product.contraindications}
            />
          </div>

          <div className="lg:col-span-2">
            <ProductResultDetailsTipsSection tips={product.tips} />
          </div>
          {/* 
          <div className="lg:col-span-6">
            <ProductResultDetailsUsagesList uses={product.uses} />
          </div> */}
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
