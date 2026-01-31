import PropTypes from "prop-types";
import { useExternalLink } from "../../../features/external-link/hooks/useExternalLink";

function ExternalLink({ href, children, className, siteName, ...rest }) {
  const { openConfirmation } = useExternalLink();

  const handleClick = (e) => {
    e.preventDefault();
    const extractedSiteName =
      siteName || new URL(href).hostname.replace("www.", "");
    openConfirmation(href, extractedSiteName);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  );
}

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  siteName: PropTypes.string,
};

export default ExternalLink;
