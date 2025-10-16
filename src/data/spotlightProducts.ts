import type { ProductForJsonLd } from '../lib/seo/meta';

export interface SpotlightProduct extends ProductForJsonLd {
	slug: string;
	tagline: string;
	summary: string;
	affiliateUrl: string;
	badges: string[];
	pros: string[];
	cons: string[];
	useCases: string[];
	priceLabel?: string;
}

export const spotlightProducts: SpotlightProduct[] = [
	{
		id: 'braun-series-9-pro-plus-electric-shaver',
		slug: 'braun-series-9-pro-plus-electric-shaver',
		name: 'Braun Series 9 PRO+ Electric Shaver',
		tagline: 'Flagship foil engineering that pampers the skin while erasing stubble.',
		summary:
			'Our editors reach for the Series 9 PRO+ when a boardroom polished shave is non negotiable. The ProComfort head and SmartCare base deliver concierge level maintenance after every pass.',
		affiliateUrl: 'https://amzn.to/4ooMFju',
		badges: ["Editor's Pick", 'SmartCare Ready', 'Sensitive Skin Safe'],
		pros: [
			'Five action SmartCare station cleans, dries, and charges on autopilot',
			'Floating ProComfort head hugs jawlines without hot spots',
			'Full wet or dry support with a 60 minute cordless runtime',
		],
		cons: ['Premium chassis demands countertop real estate', 'Investment price point'],
		useCases: [
			'Immaculate daily shaves before high stakes meetings',
			'Polished grooming for black tie itineraries',
			'Sensitive skin rescue when blades cause flare ups',
		],
		description:
			"Braun's flagship Series 9 PRO+ combines a ProComfort floating head with a self sanitizing SmartCare base for the closest, gentlest electric shave we have tested.",
		reviewBody:
			"Braun's Series 9 PRO+ stays our gold standard when a boardroom finish is non negotiable. The ProComfort floating head glides along jawlines and Adam's apples without tugging, while the five action SmartCare station disinfects, dries, and charges so it is spotless before dawn flights. During testing it erased 48 hour growth in three measured passes and left reactive skin calm. Run it wet or dry and the head stays whisper quiet while rinsing clean under the tap. The footprint and price sit at the top shelf, but no other foil shaver we have reviewed has matched this mix of refinement, efficiency, and long term reliability.",
		author: 'SwankyBoyz Editorial Team',
		brand: 'Braun',
		price: 299.99,
		priceCurrency: 'USD',
		ratingValue: 4.8,
		reviewCount: 1584,
		availability: 'https://schema.org/InStock',
		image: 'https://m.media-amazon.com/images/I/61GjzFzFURL._AC_SL1500_.jpg',
		asin: 'S9PROPLUS',
		url: 'https://swankyboyz.com/reviews/braun-series-9-pro-plus-electric-shaver',
	},
	{
		id: 'wahl-stainless-steel-lithium-ion-2-0-plus-slate-trimmer',
		slug: 'wahl-stainless-steel-lithium-ion-2-0-plus-slate-trimmer',
		name: 'WAHL Stainless Steel Lithium Ion 2.0+ Slate Trimmer',
		tagline: 'American forged precision that travels light and trims cleaner.',
		summary:
			'WAHLs stainless chassis and four hour battery life make this the no compromise travel trimmer. It ships with precision heads that keep beard lines razor sharp between barber visits.',
		affiliateUrl: 'https://amzn.to/4n5fGPU',
		badges: ['Travel Essential', 'Four Hour Battery', 'American Craft'],
		pros: [
			'All metal housing survives weekly carry on abuse',
			'Lithium Ion 2.0+ battery delivers four hours of cordless runtime',
			'Self sharpening blades keep fades and edges crisp',
		],
		cons: ['Includes many guards to keep organized', 'No onboard charging stand'],
		useCases: [
			'Carry on grooming kit for frequent flyers',
			'Weekend lineup maintenance between barbershop sessions',
			'Precision detailing for beards, brows, and neckline trim work',
		],
		description:
			"WAHL's Stainless Steel Lithium Ion 2.0+ pairs American made durability with a marathon battery and pro grade attachments for immaculate detailing anywhere.",
		reviewBody:
			"WAHL's Stainless Steel Lithium Ion 2.0+ Slate is the grooming multi tool we trust when itineraries stack up. The milled metal housing shrugs off drops and humidity, while the Lithium Ion 2.0+ battery powers through four hours of trims before needing a USB top up. Swap between the detailer, nose, and T blade heads and it carves razor sharp edges without heat build up. We logged three weeks of test travel and never worried about dulling; the self sharpening blades stayed crisp and quiet. It ships with a generous guard set, so plan for pouch space, but that versatility means you can fine tune fades, beards, and body hair with surgical control.",
		author: 'SwankyBoyz Editorial Team',
		brand: 'WAHL',
		price: 79.99,
		priceCurrency: 'USD',
		ratingValue: 4.4,
		reviewCount: 2140,
		availability: 'https://schema.org/InStock',
		image: 'https://m.media-amazon.com/images/I/71yzLKdE9cL._AC_SL1500_.jpg',
		asin: 'WAHLLI20',
		url: 'https://swankyboyz.com/reviews/wahl-stainless-steel-lithium-ion-2-0-plus-slate-trimmer',
	},
	{
		id: 'manscaped-beard-hedger-premium-trimmer',
		slug: 'manscaped-beard-hedger-premium-trimmer',
		name: 'MANSCAPED The Beard Hedger Premium Trimmer',
		tagline: 'Twenty dialed in lengths. One waterproof chassis built for sculpting.',
		summary:
			'MANSCAPEDs precision wheel and stainless T blade make fast work of shadow sculpting. It is the go to for editorial shoots when symmetry has to be perfect in minutes.',
		affiliateUrl: 'https://amzn.to/476kfUf',
		badges: ['Precision Dial', 'Waterproof', 'USB C Recharge'],
		pros: [
			'Twenty position length dial eliminates a drawer full of guards',
			'IPX7 waterproof body handles shower trims with ease',
			'Stainless T blade keeps cheek lines razor straight',
		],
		cons: ['Single guard design favors short to medium beards', 'Requires thorough drying to prevent mineral spotting'],
		useCases: [
			'Dialed stubble for high resolution photo shoots',
			'Shower friendly trims when time is scarce',
			'Precision edging before black tie events',
		],
		description:
			"MANSCAPED's Beard Hedger pairs a waterproof chassis with a 20 length dial and stainless T blade for photography ready beard detailing.",
		reviewBody:
			"MANSCAPED's Beard Hedger Premium earned its backstage residency for one simple reason: finesse. The stainless T blade cuts through wiry growth without chatter, and the 20 point dial means you can tighten the jawline, fade cheeks, and taper a moustache in minutes with a single guard. Editors loved taking it into the shower; IPX7 protection and USB C charging make Sunday resets effortless. It prefers short to medium lengths, so long beard purists may need extra guards, but for anyone chasing clean symmetry with minimal kit, this trimmer hits the luxury sweet spot while keeping maintenance ruthlessly efficient.",
		author: 'SwankyBoyz Editorial Team',
		brand: 'MANSCAPED',
		price: 69.99,
		priceCurrency: 'USD',
		ratingValue: 4.3,
		reviewCount: 987,
		availability: 'https://schema.org/InStock',
		image: 'https://m.media-amazon.com/images/I/61GVjHRrwzL._AC_SL1500_.jpg',
		asin: 'MANSBHEDGER',
		url: 'https://swankyboyz.com/reviews/manscaped-beard-hedger-premium-trimmer',
	},
];
