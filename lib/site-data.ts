export const business = {
  name: "Combs Land Management",
  shortName: "CLM",
  phone: "(580) 555-0147",
  phoneHref: "+15805550147",
  email: "hello@combslandmanagement.com",
  location: "Woodward County, Oklahoma",
  hours: "Monday–Saturday, 7am–7pm",
  tagline: "Clearing. Cleaning. Transforming.",
};

export const services = [
  {
    slug: "lawn-mowing",
    eyebrow: "Lawn care",
    title: "Lawn Mowing & Maintenance",
    shortTitle: "Lawn Mowing",
    image: "/images/work/lawn-after.jpg",
    description: "Consistent mowing, trimming, edging, and blow-off on a schedule that keeps your property sharp.",
    included: [
      "Mowing at the right height for the grass and season",
      "String trimming around fences, trees, and beds",
      "Crisp edging along walks, drives, and borders",
      "Blow-off of clippings from hard surfaces",
      "Weekly, bi-weekly, and one-time service",
    ],
    who: "Homeowners, rentals, HOAs, and commercial properties that want a lawn that always looks maintained.",
    why: "We keep a consistent schedule and cut it right, so the lawn never gets ahead of you again.",
    localTitle: "Bermuda, fescue, and Oklahoma summers.",
    localBody: "Woodward-area lawns need a cut that responds to heat, wind, and dry spells. We adjust for the season so your grass stays healthier and your property stays clean.",
    points: [
      ["Right height, right season", "We raise the deck through peak heat and tighten the cut in the shoulder months."],
      ["Storm-season ready", "A steady schedule keeps fast spring and summer growth under control."],
      ["Curb appeal that lasts", "Edging and blow-off keep the whole property looking finished."],
    ],
  },
  {
    slug: "garden-beds",
    eyebrow: "Beds & landscaping",
    title: "Garden Beds & Landscaping",
    shortTitle: "Garden Beds",
    image: "/images/work/garden-after.jpg",
    description: "Weeding, edging, fresh mulch, and seasonal planting that gives the whole property a finished look.",
    included: [
      "Full bed cleanup and weed removal",
      "Defined edges and reshaped borders",
      "Fresh mulch installation and touch-ups",
      "Seasonal planting and bed refreshes",
      "Shrub cleanup and light pruning",
    ],
    who: "Homeowners and businesses with beds that have lost their shape, color, or clean definition.",
    why: "We handle the detail work that makes a yard look intentional—not just recently mowed.",
    localTitle: "Beds built for red dirt and hard weather.",
    localBody: "Healthy beds in northwest Oklahoma need good prep, practical plant choices, and mulch that holds moisture through heat and wind.",
    points: [
      ["Clean, defined borders", "A crisp edge instantly sharpens the lawn and keeps mulch where it belongs."],
      ["Moisture-minded mulch", "The right depth protects roots and slows moisture loss through summer."],
      ["Seasonal refreshes", "We keep beds presentable from spring color through fall cleanup."],
    ],
  },
  {
    slug: "yard-cleanup",
    eyebrow: "Cleanup & haul-off",
    title: "Yard Cleanup & Debris Removal",
    shortTitle: "Yard Cleanup",
    image: "/images/work/cleanup-after.jpg",
    description: "Leaves, limbs, storm debris, and yard waste cleared and hauled away—gone, not moved to the curb.",
    included: [
      "Leaf, limb, and yard-debris removal",
      "Storm cleanup and fallen-branch haul-off",
      "Rental and move-out property cleanups",
      "Seasonal spring and fall reset visits",
      "Final rake, blow-off, and haul-away",
    ],
    who: "Busy homeowners, property managers, and businesses facing more cleanup than a trash cart can handle.",
    why: "We bring the equipment, labor, and haul-off capacity to clear the mess in one visit.",
    localTitle: "When Oklahoma weather leaves a mess.",
    localBody: "Wind, ice, and spring storms can turn a clean property into a full weekend of work. We get it cleared safely and efficiently.",
    points: [
      ["Fast storm response", "We prioritize hazardous limbs and access areas after severe weather."],
      ["Complete haul-off", "Debris leaves with us instead of becoming your next problem."],
      ["Clean final pass", "We rake and blow down the work area so the transformation feels complete."],
    ],
  },
  {
    slug: "brush-clearing",
    eyebrow: "Brush & overgrowth",
    title: "Brush Clearing & Overgrowth Removal",
    shortTitle: "Brush Clearing",
    image: "/images/work/brush-after.jpg",
    description: "Fence lines, lots, and back corners opened back up into clean, visible, usable ground.",
    included: [
      "Dense brush and volunteer-growth removal",
      "Fence-line and access-lane clearing",
      "Overgrown lot and back-acre cleanup",
      "Small tree and eastern redcedar removal",
      "Cut material gathering and haul-off",
    ],
    who: "Landowners, farms, businesses, and homeowners reclaiming overgrown or hard-to-access areas.",
    why: "We bring the right equipment and work methodically, protecting what stays while clearing what does not.",
    localTitle: "Take back ground from stubborn overgrowth.",
    localBody: "Eastern redcedar, volunteer trees, and fast-growing brush can swallow fence lines quickly. Early, clean removal protects access and usability.",
    points: [
      ["Open up visibility", "Cleared lines improve safety, access, and the way the property feels."],
      ["Protect fences", "Removing woody growth reduces pressure and makes repairs easier."],
      ["Make land usable", "Reclaim corners and acreage for maintenance, access, or future plans."],
    ],
  },
] as const;

export type Service = (typeof services)[number];

export const reviews = [
  ["They keep our yard looking perfect and always show up on time. Couldn’t ask for more.", "Sarah M.", "Woodward"],
  ["Cleared out a back lot we hadn’t been able to use in years. Night and day difference.", "Dale T.", "Mooreland"],
  ["Honest pricing and great work. They treat the property like it’s their own.", "Rachel K.", "Fort Supply"],
  ["A storm dropped limbs all over the yard. CLM had it hauled off and spotless fast.", "Mike D.", "Woodward"],
  ["They detailed both work trucks and they look brand new. Great crew to deal with.", "Cody R.", "Sharon"],
  ["Reliable every week. Our beds and edges have never looked this sharp.", "Linda P.", "Woodward"],
] as const;

export const towns = ["Woodward", "Mooreland", "Fort Supply", "Sharon", "Mutual", "Vici", "Fargo", "Curtis"];
