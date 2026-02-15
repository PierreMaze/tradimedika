import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FeedbackLink from "../components/ui/feedback/FeedbackLink";
import { useConsent } from "../features/consent";
import {
  generateRemedySEOMeta,
  getTypeColors,
  RemedyResultDetailsAllergensSection,
  RemedyResultDetailsAllergyWarning,
  RemedyResultDetailsContraindicationsSection,
  RemedyResultDetailsHeader,
  RemedyResultDetailsNavigation,
  RemedyResultDetailsPropertiesSection,
  RemedyResultDetailsRecommendedBanner,
  RemedyResultDetailsSymptomsSection,
  RemedyResultDetailsTipsSection,
  RemedyResultDetailsUsagesList,
  useRemedyAllergyCheck,
  useRemedyDetails,
} from "../features/remedy-result-detail-page";
import { RemedyResultNotFound } from "../features/remedy-result-page";

/**
 * RemedyResultDetails Page
 *
 * Displays complete information about a specific natural remedy.
 * Layout (container, padding) is handled by LayoutRemedyResult.
 *
 * Issue #49: Implementation of detailed remedy page
 */
function RemedyResultDetails() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { hasConsent } = useConsent();
  const selectedSymptoms = location.state?.symptoms || [];
  const isRecommended = location.state?.isRecommended || false;

  const { remedy, safeImageUrl, notFound } = useRemedyDetails(slug);
  const { hasUserAllergens, allergenNames } = useRemedyAllergyCheck(remedy);

  useEffect(() => {
    if (!hasConsent) {
      navigate("/", { replace: true });
    }
  }, [hasConsent, navigate]);

  if (notFound) {
    return <RemedyResultNotFound variant="remedy-not-found" />;
  }

  const typeColors = getTypeColors();
  const { pageTitle, pageDescription, canonicalUrl } = generateRemedySEOMeta(
    remedy,
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
        <RemedyResultDetailsNavigation
          selectedSymptoms={selectedSymptoms}
          variant="top"
        />

        {isRecommended && <RemedyResultDetailsRecommendedBanner />}

        {hasUserAllergens && (
          <RemedyResultDetailsAllergyWarning allergenNames={allergenNames} />
        )}

        <RemedyResultDetailsHeader
          remedy={remedy}
          safeImageUrl={safeImageUrl}
          typeColors={typeColors}
        />

        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-6 lg:gap-6">
          <div className="lg:col-span-2">
            <RemedyResultDetailsPropertiesSection
              properties={remedy.properties}
            />
          </div>
          <div className="lg:col-span-2">
            <RemedyResultDetailsSymptomsSection symptoms={remedy.symptoms} />
          </div>
          <div className="lg:col-span-2">
            <RemedyResultDetailsAllergensSection allergens={remedy.allergens} />
          </div>

          <div className="lg:col-span-3">
            <RemedyResultDetailsContraindicationsSection
              contraindications={remedy.contraindications}
            />
          </div>

          <div className="lg:col-span-3">
            <RemedyResultDetailsTipsSection tips={remedy.tips} />
          </div>

          <div className="lg:col-span-6">
            <RemedyResultDetailsUsagesList uses={remedy.uses} />
          </div>
        </div>

        <RemedyResultDetailsNavigation
          selectedSymptoms={selectedSymptoms}
          variant="bottom"
        />

        {/* Feedback Section */}
        <FeedbackLink />
      </article>
    </>
  );
}

export default RemedyResultDetails;
