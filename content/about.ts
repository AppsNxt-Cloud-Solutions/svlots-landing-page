/**
 * About page copy, ported from aboutus.component.html (862 lines, the largest
 * template in the Angular app). Claims are the company's own and carried over
 * verbatim in substance — including the Guinness World Records recognition and
 * the office-bearer roles, which should be confirmed before launch.
 */

export const story = {
  eyebrow: "Who we are",
  title: "Property value, measured properly",
  paragraphs: [
    "SV Lots is a real estate platform dedicated to maximising property value, ensuring each investment benefits buyers beyond financial gain alone. We believe true property value rests on several key factors: proper documentation, strategic location, ease of access, environmental sustainability, and essential amenities.",
    "Our services help clients identify properties with high growth potential while ensuring legal security and environmental responsibility. Our goal is to offer properties that are not only resellable but future-proof, providing lasting value.",
  ],
};

export const strengths = {
  eyebrow: "Why SV Lots",
  title: "A holistic approach to property development",
  intro:
    "We combine technical excellence with market insights, ensuring legal compliance and environmental responsibility. Our focus on smart applications and digital solutions sets us apart, while a track record with government collaborations speaks to our reliability.",
  points: [
    "Proper documentation for secure transactions",
    "Strategic locations with high growth potential",
    "Ease of access and strong connectivity",
    "Environmentally sustainable developments",
    "Availability of essential amenities",
  ],
};

export type Leader = {
  name: string;
  role: string;
  paragraphs: string[];
  credentials: string[];
  /** Only the Managing Director has a photograph — see docs/asset-spec.md. */
  hasPortrait: boolean;
};

export const leadership: Leader[] = [
  {
    name: "Sathyananda S Raj",
    role: "CEO & Founder",
    paragraphs: [
      "Sathyananda S Raj brings over three decades of exceptional experience in civil engineering and property development to SV Lots India Private Limited. Alongside his role as a consultant, he has earned recognition from Guinness World Records for his works.",
      "He has managed major irrigation, road and land development projects as a technical consultant. As Managing Partner of Spectra Associates and Director of AMACS Tumakuru, he has shown remarkable leadership.",
    ],
    credentials: [
      "Chairman 2025, J Com Tumkur Table 1.0",
      "Founder, Chirantana Foundation Trust",
      "District Coordinator, Swadeshi Jagaran Manch",
      "Managing Partner, Spectra Associates",
      "Director, AMACS Tumakuru",
    ],
    hasPortrait: true,
  },
  {
    name: "Ram Murthy",
    role: "Chief Mentor",
    paragraphs: [
      "Ram Murthy is a highly accomplished civil engineer with over 30 years of experience across the engineering and real estate sectors, providing invaluable insight to organisations in a range of industries.",
      "With a strong academic background and additional training in project management, he offers extensive knowledge in construction, land development and infrastructure, having led numerous large-scale projects with a focus on quality and efficiency.",
      "As Chief Mentor he works closely with the team on technical training, project best practices and the continuous improvement of SV Lots' operational standards, mentoring emerging talent along the way.",
    ],
    credentials: [
      "30+ years in engineering and real estate",
      "Trained in project management",
      "Construction, land development and infrastructure",
    ],
    hasPortrait: false,
  },
];

export const vision = {
  title: "Our Vision",
  body: "To be a leading real estate platform recognised for delivering exceptional value in property investments, fostering sustainable development and enhancing the quality of life for our clients — empowering individuals and families with high-quality residential plots that offer long-term benefits and a promising future.",
};

export const mission = {
  title: "Our Mission",
  intro:
    "To enhance property value by ensuring every investment improves our clients' lives beyond financial returns. We are dedicated to:",
  commitments: [
    "Providing meticulously documented, strategically located and environmentally sustainable properties.",
    "Offering comprehensive support and expert guidance throughout the buying process.",
    "Upholding the highest standards of quality in all our projects, ensuring client satisfaction and trust.",
    "Promoting innovative, future-proof real estate solutions that meet the evolving needs of our customers.",
  ],
  outro:
    "Through these efforts we strive to build lasting relationships and contribute positively to the communities we serve.",
};
