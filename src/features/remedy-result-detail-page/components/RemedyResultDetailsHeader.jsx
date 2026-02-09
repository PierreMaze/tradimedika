import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useRef } from "react";
import {
  ChildrenAgeTag,
  ClickableTag,
  PregnancyTag,
  ProuvedTag,
  TraditionnalTag,
} from "../../../components/tags";
import {
  TagsAccordionPopover,
  TagsInfoButton,
} from "../../../components/ui/helper";
import ImageCredit from "./ImageCredit";
import SourcesSection from "./RemedyResultDetailsSourcesSection";

function RemedyResultDetailsHeader({ remedy, safeImageUrl }) {
  const popoverRef = useRef(null);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-6 grid gap-6 lg:mb-8 lg:grid-cols-5 lg:gap-8 2xl:grid-cols-4"
    >
      <div className="lg:col-span-2 2xl:col-span-1">
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-neutral-50 shadow-md dark:bg-neutral-700/50">
          <motion.img
            src={safeImageUrl}
            alt={`${remedy.name} - remède naturel traditionnel de type ${remedy.type}`}
            width="400"
            height="400"
            className="mx-auto h-full w-2/3 object-scale-down p-6 lg:w-3/4 2xl:w-4/5"
            loading="lazy"
          />
        </div>
        <ImageCredit imageCredit={remedy.imageCredit} />
      </div>

      <div className="lg:col-span-3">
        <div className="flex items-center justify-start gap-4 lg:gap-8">
          <h1 className="mb-3 text-3xl font-bold text-black lg:text-4xl dark:text-white">
            {remedy.name}
          </h1>
          <span
            className={`mb-3 shrink-0 rounded-md bg-neutral-200 px-3 py-1.5 text-xs font-semibold tracking-wide text-black uppercase lg:text-sm 2xl:text-base dark:bg-neutral-600 dark:text-white`}
          >
            {remedy.type}
          </span>
        </div>
        <p className="-mb-2 text-sm leading-relaxed text-neutral-800 lg:text-base 2xl:text-lg dark:text-neutral-300">
          {remedy.description}
        </p>

        <div className="flex flex-col">
          <TagsInfoButton
            size="sm"
            variant="inline"
            label="Indications d'usage"
          />
          <div className="my-1 flex flex-wrap items-center gap-2">
            {remedy.verifiedByProfessional ? (
              <ClickableTag categoryId="usages" popoverRef={popoverRef}>
                <ProuvedTag />
              </ClickableTag>
            ) : (
              <ClickableTag categoryId="usages" popoverRef={popoverRef}>
                <TraditionnalTag />
              </ClickableTag>
            )}

            <ClickableTag categoryId="grossesse" popoverRef={popoverRef}>
              <PregnancyTag
                variant={
                  remedy.pregnancySafe === true
                    ? "ok"
                    : remedy.pregnancySafe === false
                      ? "interdit"
                      : "variant"
                }
              />
            </ClickableTag>

            <ClickableTag categoryId="enfants" popoverRef={popoverRef}>
              <ChildrenAgeTag age={remedy.childrenAge} />
            </ClickableTag>
          </div>

          <SourcesSection sources={remedy.sources} />
        </div>
      </div>

      <TagsAccordionPopover ref={popoverRef} />
    </motion.div>
  );
}

RemedyResultDetailsHeader.propTypes = {
  remedy: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string,
    verifiedByProfessional: PropTypes.bool,
    pregnancySafe: PropTypes.bool,
    childrenAge: PropTypes.number,
    imageCredit: PropTypes.shape({
      author: PropTypes.string,
      source: PropTypes.string,
      url: PropTypes.string,
    }),
    sources: PropTypes.shape({
      scientific: PropTypes.array,
      traditional: PropTypes.array,
    }),
  }).isRequired,
  safeImageUrl: PropTypes.string.isRequired,
};

export default RemedyResultDetailsHeader;
