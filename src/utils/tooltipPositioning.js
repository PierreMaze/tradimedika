/**
 * Algorithmes de positionnement intelligent pour tooltips
 * Implémente flip (changement de direction) et shift (décalage)
 * pour éviter les débordements du viewport
 */

/**
 * Calcule l'espace disponible autour d'un élément trigger
 * @param {DOMRect} triggerRect - Rectangle du trigger
 * @returns {Object} Espace disponible dans chaque direction
 */
export function getAvailableSpace(triggerRect) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  return {
    top: triggerRect.top,
    bottom: viewportHeight - triggerRect.bottom,
    left: triggerRect.left,
    right: viewportWidth - triggerRect.right,
  };
}

/**
 * Retourne le placement inversé pour le flip
 * @param {string} placement - Placement actuel
 * @returns {string} Placement inversé
 */
export function flipPlacement(placement) {
  const opposites = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left",
  };
  return opposites[placement] || placement;
}

/**
 * Calcule la position initiale du tooltip selon le placement
 * @param {DOMRect} triggerRect - Rectangle du trigger
 * @param {DOMRect} tooltipRect - Rectangle du tooltip
 * @param {string} placement - Position souhaitée ('top', 'bottom', 'left', 'right')
 * @param {number} offset - Espacement en pixels
 * @returns {Object} Position {x, y}
 */
function getInitialPosition(triggerRect, tooltipRect, placement, offset) {
  const positions = {
    top: {
      x: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2,
      y: triggerRect.top - tooltipRect.height - offset,
    },
    bottom: {
      x: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2,
      y: triggerRect.bottom + offset,
    },
    left: {
      x: triggerRect.left - tooltipRect.width - offset,
      y: triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
    },
    right: {
      x: triggerRect.right + offset,
      y: triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
    },
  };

  return positions[placement] || positions.top;
}

/**
 * Vérifie si une position cause un débordement du viewport
 * @param {Object} position - Position {x, y}
 * @param {DOMRect} tooltipRect - Rectangle du tooltip
 * @param {number} padding - Padding minimum du viewport
 * @returns {boolean} true si débordement
 */
function isOutOfViewport(position, tooltipRect, padding = 5) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  return (
    position.x < padding ||
    position.x + tooltipRect.width > viewportWidth - padding ||
    position.y < padding ||
    position.y + tooltipRect.height > viewportHeight - padding
  );
}

/**
 * Applique un décalage (shift) pour maintenir le tooltip dans le viewport
 * sans changer son placement
 * @param {Object} position - Position actuelle {x, y}
 * @param {DOMRect} tooltipRect - Rectangle du tooltip
 * @param {number} padding - Padding minimum du viewport
 * @returns {Object} Position décalée {x, y}
 */
function shiftPosition(position, tooltipRect, padding = 5) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const shifted = { ...position };

  // Shift horizontal
  if (shifted.x < padding) {
    shifted.x = padding;
  } else if (shifted.x + tooltipRect.width > viewportWidth - padding) {
    shifted.x = viewportWidth - tooltipRect.width - padding;
  }

  // Shift vertical
  if (shifted.y < padding) {
    shifted.y = padding;
  } else if (shifted.y + tooltipRect.height > viewportHeight - padding) {
    shifted.y = viewportHeight - tooltipRect.height - padding;
  }

  return shifted;
}

/**
 * Calcule la position optimale d'un tooltip avec gestion des collisions
 * Implémente les stratégies flip (changement de direction) et shift (décalage)
 *
 * @param {DOMRect} triggerRect - Rectangle du trigger (via getBoundingClientRect)
 * @param {DOMRect} tooltipRect - Rectangle du tooltip (via getBoundingClientRect)
 * @param {string} placement - Position initiale ('top', 'bottom', 'left', 'right')
 * @param {number} [offset=8] - Espacement entre trigger et tooltip en pixels
 * @returns {Object} { x, y, finalPlacement } - Position finale et placement appliqué
 */
export function calculateTooltipPosition(
  triggerRect,
  tooltipRect,
  placement = "top",
  offset = 8,
) {
  const padding = 5;

  // 1. Calculer position initiale
  let position = getInitialPosition(
    triggerRect,
    tooltipRect,
    placement,
    offset,
  );
  let finalPlacement = placement;

  // 2. Vérifier si débordement
  if (isOutOfViewport(position, tooltipRect, padding)) {
    // 3. Stratégie FLIP : Essayer le placement opposé
    const flippedPlacement = flipPlacement(placement);
    const flippedPosition = getInitialPosition(
      triggerRect,
      tooltipRect,
      flippedPlacement,
      offset,
    );

    // Si le flip résout le problème, l'utiliser
    if (!isOutOfViewport(flippedPosition, tooltipRect, padding)) {
      position = flippedPosition;
      finalPlacement = flippedPlacement;
    } else {
      // 4. Stratégie SHIFT : Décaler sans changer de placement
      // Essayer toutes les positions pour trouver la meilleure
      const availableSpace = getAvailableSpace(triggerRect);
      const placements = ["top", "bottom", "left", "right"];

      // Trier par espace disponible
      const sortedPlacements = placements.sort((a, b) => {
        const spaceA =
          a === "top" || a === "bottom" ? availableSpace[a] : availableSpace[a];
        const spaceB =
          b === "top" || b === "bottom" ? availableSpace[b] : availableSpace[b];
        return spaceB - spaceA;
      });

      // Tester chaque placement par ordre d'espace disponible
      let bestPosition = position;
      let bestPlacement = placement;

      for (const testPlacement of sortedPlacements) {
        const testPosition = getInitialPosition(
          triggerRect,
          tooltipRect,
          testPlacement,
          offset,
        );

        if (!isOutOfViewport(testPosition, tooltipRect, padding)) {
          bestPosition = testPosition;
          bestPlacement = testPlacement;
          break;
        }
      }

      position = bestPosition;
      finalPlacement = bestPlacement;

      // Si toujours hors viewport, appliquer shift
      if (isOutOfViewport(position, tooltipRect, padding)) {
        position = shiftPosition(position, tooltipRect, padding);
      }
    }
  }

  return {
    x: position.x,
    y: position.y,
    finalPlacement,
  };
}
