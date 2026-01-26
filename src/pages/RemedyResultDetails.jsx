import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";
import FeedbackLink from "../components/ui/feedback/FeedbackLink";
import {
  generateRemedySEOMeta,
  getTypeColors,
  RemedyResultDetailsAllergensSection,
  RemedyResultDetailsAllergyWarning,
  RemedyResultDetailsContraindicationsSection,
  RemedyResultDetailsHeader,
  RemedyResultDetailsNavigation,
  RemedyResultDetailsPropertiesSection,
  RemedyResultDetailsSymptomsSection,
  RemedyResultDetailsTipsSection,
  RemedyResultDetailsUsagesList,
  useRemedyAllergyCheck,
  useRemedyDetails,
} from "../features/remedy-result-detail-page";
import { RemedyResultNotFound } from "../features/remedy-result-page";
import { useReducedMotion } from "../features/settings";

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
  const selectedSymptoms = location.state?.symptoms || [];
  const prefersReducedMotion = useReducedMotion();

  const { remedy, safeImageUrl, notFound } = useRemedyDetails(slug);
  const { hasUserAllergens, allergenNames } = useRemedyAllergyCheck(remedy);

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

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-dark dark:text-light w-full transition duration-300 ease-in-out"
      >
        <RemedyResultDetailsNavigation
          selectedSymptoms={selectedSymptoms}
          variant="top"
        />

        {hasUserAllergens && (
          <RemedyResultDetailsAllergyWarning
            allergenNames={allergenNames}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}

        <RemedyResultDetailsHeader
          remedy={remedy}
          safeImageUrl={safeImageUrl}
          typeColors={typeColors}
        />

        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-6">
          <RemedyResultDetailsPropertiesSection
            properties={remedy.properties}
          />
          <RemedyResultDetailsSymptomsSection symptoms={remedy.symptoms} />
        </div>
        <RemedyResultDetailsContraindicationsSection
          contraindications={remedy.contraindications}
        />
        <RemedyResultDetailsUsagesList uses={remedy.uses} />

        <RemedyResultDetailsTipsSection tips={remedy.tips} />

        <RemedyResultDetailsAllergensSection allergens={remedy.allergens} />

        <RemedyResultDetailsNavigation
          selectedSymptoms={selectedSymptoms}
          variant="bottom"
        />

        {/* Feedback Section */}
        <FeedbackLink />
      </motion.article>
    </>
  );
}

export default RemedyResultDetails;
