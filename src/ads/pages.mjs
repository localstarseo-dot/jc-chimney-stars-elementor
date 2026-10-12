// Service-specific copy for three independent paid-search destinations.
import galleries from './galleries.mjs';
export default [
  {
    slug: 'lp-1', intent: 'repair', service: 'Chimney Repair',
    gallery: galleries.repair,
    offer: { headline: '$100 Off Repairs Over $1,000', claim: 'Claim $100 Off', detail: 'Applies to chimney repairs over $1,000.', eyebrow: 'Chimney Repair Offer' },
    showcaseTitle: 'Professional Chimney Repair Services',
    showcaseIntro: 'From a chimney leak to damaged masonry, start with an assessment and a clear repair scope.',
    cards: [
      ['chimney-repair-icon', 'Chimney Crown Repair', 'Discuss cracks and wear at the top of your chimney.'],
      ['chimney-leak-repair-icon', 'Chimney Flashing Repair', 'Ask about the roof-to-chimney junction when investigating leaks.'],
      ['masonry-repair-icon', 'Masonry & Mortar Repair', 'Review damaged brickwork and worn mortar joints.'],
      ['chimney-cap-icon', 'Chimney Cap Repair', 'Discuss a damaged cap and suitable repair or replacement options.'],
      ['chimney-leak-repair-icon', 'Chimney Leak Repair', 'Explain where and when moisture appears so the team can assess it.'],
      ['fireplace-repair-icon', 'Damper Repair Assessment', 'Ask about a worn or damaged damper and the next step.'],
      ['chimney-repair-icon', 'Chimney Liner Repair', 'Discuss liner concerns and whether further assessment is needed.'],
      ['masonry-repair-icon', 'Chimney Restoration', 'Agree on the condition, repair scope, and project requirements.']
    ],
    eyebrow: 'Local chimney repair • Austin, TX',
    headline: 'Chimney Repair in Austin, TX',
    intro: 'Leaks, worn masonry, or damaged chimney components? Tell us what you have noticed. Our team can assess your chimney and explain the repair options before you approve work.',
    hero: 'assets/photos/technicians/chimney-star-technicians-repairing-a-crown.webp', heroWidth: 1448, heroHeight: 1086,
    concernTitle: 'Noticed something that needs attention?',
    concernIntro: 'You do not need to know which part has failed. Start with what you can see, and let our team help with the next step.',
    concerns: [
      ['chimney-leak-repair-icon', 'Water around your chimney', 'Stains or moisture after rain? Ask about a chimney leak assessment.'],
      ['masonry-repair-icon', 'Cracked or worn masonry', 'Loose mortar or damaged brickwork? Let us look at the condition.'],
      ['chimney-repair-icon', 'A damaged chimney crown', 'Visible cracks at the top of the chimney deserve a closer look.'],
      ['chimney-cap-icon', 'A missing or damaged cap', 'Tell us about exposed openings, a loose cap, or worn components.']
    ],
    workTitle: 'A closer look at chimney repair',
    workIntro: 'Supplied repair photos show examples of the types of work to discuss during your assessment.',
    work: [
      { title: 'Chimney crown repair', pair: 'crown', alt: 'Chimney crown', text: 'Assessment of the crown and its condition helps define the appropriate repair scope.' },
      { title: 'Flashing repair', pair: 'flashing', alt: 'Flashing at the chimney roof junction', text: 'The roof-to-chimney junction is one area the team may examine when investigating a leak.' },
      { title: 'Masonry and mortar repair', pair: 'masonry', alt: 'Chimney brickwork and mortar', text: 'Discuss worn joints and brickwork before agreeing on repointing or other masonry work.' }
    ],
    process: [
      ['Consultation Call & Scheduling', 'Get in touch for a consultation and schedule the service appointment.'],
      ['Professional Inspection', 'Our team inspects the chimney and fireplace system to identify concerns.'],
      ['Get an Estimate', 'Receive a transparent itemized estimate for the recommended services.'],
      ['Job Is Done', 'The technicians complete the approved work and review the result with you.']
    ],
    services: ['Chimney leak assessment', 'Crown repair', 'Flashing repair', 'Masonry and repointing', 'Chimney cap repair or replacement', 'Damper repair assessment'],
    faqs: [
      ['Can you tell what repair I need from a photo?', 'Photos can help explain your concern, but the repair scope may require an on-site assessment. Share what you have noticed and ask the team what needs to be checked.'],
      ['How much does chimney repair cost?', 'Cost depends on condition, access, materials, and the agreed repair scope. Request an assessment and estimate rather than relying on a one-size-fits-all price.'],
      ['Do you work on chimney leaks?', 'Chimney leak assessment is part of the repair services shown here. Explain when you notice moisture and where it appears so the team can discuss the appropriate assessment.'],
      ['Should I book an inspection or a repair visit?', 'Tell the team about the concern when booking. They can help clarify the appropriate appointment and whether an inspection is needed before discussing repairs.'],
      ['How do I prepare for the visit?', 'Confirm access and preparation requirements with the team. Clear the nearby work area and share any previous reports or photos you have.']
    ]
  },
  {
    slug: 'lp-2', intent: 'cleaning', service: 'Chimney Cleaning',
    gallery: galleries.cleaning,
    offer: { headline: '$20 Off Your First Chimney Sweep', claim: 'Claim $20 Off', detail: 'For your first chimney sweep.', eyebrow: 'First Chimney Sweep Offer' },
    showcaseTitle: 'Professional Chimney Cleaning Services',
    showcaseIntro: 'Plan a chimney sweep around your fireplace, service history, and the cleaning scope your home needs.',
    cards: [
      ['chimney-sweep-icon', 'Chimney Sweeping', 'Discuss routine chimney cleaning and access for your service visit.'],
      ['chimney-sweep-icon', 'Fireplace Cleaning', 'Confirm the accessible fireplace areas included in your appointment.'],
      ['clean-work-area-icon', 'Soot & Buildup Cleaning', 'Ask about visible buildup and the cleaning work that is appropriate.'],
      ['chimney-cap-icon', 'Blockage Assessment', 'Describe any blockage concerns before planning cleaning or removal work.']
    ],
    eyebrow: 'Local chimney sweeping • Austin, TX',
    headline: 'Chimney Cleaning in Austin, TX',
    intro: 'Ready to schedule a chimney sweep? Tell us about your fireplace, how often you use it, and when it was last serviced. Our team can explain the cleaning scope and help arrange your visit.',
    hero: 'assets/photos/technicians/chimney-star-fireplace-service.webp', heroWidth: 1200, heroHeight: 900,
    concernTitle: 'When is it time to book a chimney sweep?',
    concernIntro: 'Start with a simple description of your fireplace and service history. You do not need to diagnose the chimney yourself.',
    concerns: [
      ['chimney-sweep-icon', 'Due for a cleaning', 'Book a sweep when your chimney needs routine cleaning and care.'],
      ['chimney-inspection-icon', 'Unsure when it was serviced', 'New to the home or missing service records? Discuss the right starting point.'],
      ['clean-work-area-icon', 'Soot around the fireplace', 'Visible buildup? Ask what a sweep includes for your fireplace.'],
      ['chimney-cap-icon', 'Concerned about a blockage', 'Tell us what you have noticed and ask whether an assessment is needed.']
    ],
    workTitle: 'See the work behind a chimney sweep',
    workIntro: 'Cleaning examples and service photos from the supplied Chimney Star asset library.',
    work: [
      { title: 'Fireplace cleaning', pair: 'sweep', alt: 'Fireplace firebox cleaning', text: 'Discuss accessible cleaning areas and the scope of your chimney sweep when booking.' },
      { title: 'Blockage assessment and removal', pair: 'blockage', alt: 'Chimney passage with a nest blockage', text: 'A blockage concern may need assessment before the team can recommend cleaning or removal work.' },
      { title: 'Preparing for the service', image: 'assets/photos/technicians/chimney-star-technicians-preparing-equipment.webp', width: 1448, height: 1086, alt: 'Chimney Star technicians preparing brushes and equipment', text: 'Ask about access and preparation so the crew can plan the cleaning visit.' }
    ],
    process: [
      ['Share your service history', 'Tell us about the fireplace and when it was last cleaned.'],
      ['Confirm the cleaning scope', 'Discuss access, the areas included, and any concerns needing assessment.'],
      ['Carry out the agreed service', 'The crew completes the cleaning work within the agreed scope.'],
      ['Discuss findings and next steps', 'Ask about any observations, additional work, or future care.']
    ],
    services: ['Chimney sweeping', 'Accessible fireplace cleaning', 'Soot and buildup cleaning', 'Blockage assessment', 'Chimney condition review', 'Cleaning and inspection planning'],
    faqs: [
      ['What does a chimney sweep include?', 'The scope depends on your system, access, and condition. Confirm the cleaning areas, any assessment, and what is excluded with the team before the appointment.'],
      ['How much does chimney cleaning cost?', 'Ask for pricing based on your fireplace, access, and cleaning requirements. Any additional work should be discussed separately.'],
      ['Is cleaning the same as an inspection?', 'Cleaning and inspection are different tasks. Ask the team what assessment is included in your appointment and whether a separate inspection is appropriate.'],
      ['Do I need to prepare the fireplace?', 'Confirm the preparation instructions when booking, including the condition of the fireplace and access to the work area.'],
      ['Can I book if I do not know the last cleaning date?', 'Yes. Share what you do know about the fireplace and its use so the team can help plan the appointment.']
    ]
  },
  {
    slug: 'lp-3', intent: 'inspection', service: 'Chimney Inspection',
    gallery: galleries.inspection,
    offer: { headline: '$25 Off Your First Chimney Inspection', claim: 'Claim $25 Off', detail: 'For your first chimney inspection.', eyebrow: 'First Chimney Inspection Offer' },
    showcaseTitle: 'Professional Chimney Inspection Services',
    showcaseIntro: 'Understand your chimney’s condition with an inspection scope suited to your concern and documentation needs.',
    cards: [
      ['chimney-inspection-icon', 'Level 1 Inspection', 'Ask which accessible areas will be reviewed for your system.'],
      ['chimney-inspection-icon', 'Level 2 Inspection', 'Discuss the inspection methods and scope appropriate to your situation.'],
      ['fireplace-repair-icon', 'Fireplace Assessment', 'Review the fireplace and accessible components within the agreed scope.'],
      ['upfront-pricing-icon', 'Findings & Next Steps', 'Ask about documentation, observations, and recommended further service.']
    ],
    eyebrow: 'Local chimney inspections • Austin, TX',
    headline: 'Chimney Inspection in Austin, TX',
    intro: 'Want a clearer picture of your chimney’s condition? Tell us why you need an inspection. Our team can help clarify the inspection scope and discuss findings and recommended next steps.',
    hero: 'assets/photos/technicians/chimney-inspection-consultation-by-the-fireplace.webp', heroWidth: 1200, heroHeight: 900,
    concernTitle: 'What brings you to an inspection?',
    concernIntro: 'Tell us the reason for your visit. The team can help determine the appropriate inspection scope.',
    concerns: [
      ['chimney-inspection-icon', 'Buying or moving into a home', 'Ask which inspection scope fits your situation and any documentation needs.'],
      ['chimney-leak-repair-icon', 'A change or concern', 'Share new odors, visible damage, moisture, or changes you have noticed.'],
      ['appointment-scheduling-icon', 'Planning fireplace use', 'Arrange a condition review before deciding on further service.'],
      ['upfront-pricing-icon', 'Need to understand the next step', 'Ask for findings and recommendations before approving additional work.']
    ],
    workTitle: 'A practical look at the inspection process',
    workIntro: 'Inspection is an assessment, not a transformation. These individual work photos show the team and consultation process.',
    work: [
      { title: 'Reviewing the fireplace', image: 'assets/photos/technicians/chimney-star-fireplace-service.webp', width: 1200, height: 900, alt: 'Chimney Star technicians examining the fireplace area', text: 'The scope of a visit depends on the system, accessible areas, and reason for the inspection.' },
      { title: 'Explaining observations', image: 'assets/photos/technicians/chimney-inspection-consultation-by-the-fireplace.webp', width: 1200, height: 900, alt: 'Technician discussing chimney observations with homeowners', text: 'Ask the team to explain what was observed and what it means for the recommended next step.' },
      { title: 'Discussing your options', image: 'assets/photos/technicians/chimney-inspection-results-in-the-driveway.webp', width: 1200, height: 900, alt: 'Chimney Star technician reviewing information with a homeowner', text: 'Discuss the findings and any further assessment or service before approving additional work.' }
    ],
    process: [
      ['Explain the reason for inspection', 'Share your concern, property plans, and any existing reports.'],
      ['Agree on the inspection scope', 'Confirm which areas and methods are included for your situation.'],
      ['Review the findings', 'Ask the technician to explain observations and documentation.'],
      ['Choose the next step', 'Discuss further evaluation, cleaning, or repairs if recommended.']
    ],
    services: ['Chimney condition assessment', 'Level 1 inspection enquiries', 'Level 2 inspection enquiries', 'Fireplace and accessible component review', 'Inspection documentation enquiries', 'Recommendations for further service'],
    faqs: [
      ['Which inspection level do I need?', 'Describe your reason for the inspection and any property or documentation requirements. The team can help clarify the appropriate scope rather than asking you to choose without guidance.'],
      ['What is included in the inspection?', 'Included areas and methods vary by the agreed inspection scope and access. Confirm those details with the team before booking.'],
      ['Will I receive a report?', 'Ask what documentation is included, how it will be provided, and whether it meets your property or transaction requirements.'],
      ['Does the inspection include repairs or cleaning?', 'An inspection is an assessment. Confirm whether any cleaning is included, and discuss repairs separately before approving additional work.'],
      ['How much does an inspection cost?', 'Request pricing for the agreed inspection level, access, and documentation needs. Additional assessments or work may require a separate quote.']
    ]
  }
];
