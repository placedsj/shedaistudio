
import React from 'react';
import { 
  ContactForm, Header, Footer, Card, CardContent, CardHeader, CardTitle, Badge,
  Phone, Calendar, Search, FileText, Palette, Truck, Hammer, CheckCircle,
  Clock, Shield, Camera, Users, Star, ArrowRight, MapPin, DollarSign, AlertCircle, Award
} from './RoofingShared';

interface ProcessStep {
  id: number;
  title: string;
  duration: string;
  description: string;
  icon: React.ReactNode;
  activities: string[];
  deliverables: string[];
  customerInvolvement: string;
  quality: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Initial Consultation",
    duration: "30-60 minutes",
    description: "We begin with a thorough discussion of your needs, concerns, and roofing goals.",
    icon: <Phone className="w-8 h-8 text-orange-500" />,
    activities: [
      "Free phone or in-person consultation",
      "Discussion of roofing concerns and goals",
      "Preliminary timeline and budget discussion",
      "Scheduling of professional inspection"
    ],
    deliverables: [
      "Consultation notes and recommendations",
      "Scheduled inspection appointment",
      "Preliminary project timeline"
    ],
    customerInvolvement: "Share your concerns, preferences, and timeline expectations",
    quality: "All consultations handled by experienced roofing professionals"
  },
  {
    id: 2,
    title: "Inspection & Diagnosis",
    duration: "1-2 hours",
    description: "Our certified inspectors conduct a 21-point assessment of your entire roofing system.",
    icon: <Search className="w-8 h-8 text-orange-500" />,
    activities: [
      "Drone aerial analysis for hard-to-reach areas",
      "Attic ventilation and insulation check",
      "Moisture detection scan",
      "Shingle and flashing integrity assessment"
    ],
    deliverables: [
      "Comprehensive digital inspection report",
      "Photo documentation of issues",
      "Risk assessment score"
    ],
    customerInvolvement: "Provide access to attic and exterior perimeter",
    quality: "Inspection technology detects invisible leaks and thermal loss"
  },
  {
    id: 3,
    title: "Proposal & Customization",
    duration: "24-48 hours after inspection",
    description: "We build a detailed proposal tailored to your home's specific requirements.",
    icon: <FileText className="w-8 h-8 text-orange-500" />,
    activities: [
      "Material selection (Asphalt, Metal, Composite)",
      "Color matching and visualization",
      "Detailed cost breakdown",
      "Financing options presentation"
    ],
    deliverables: [
      "Itemized quote with good/better/best options",
      "Digital visualization of new roof",
      "Warranty documentation samples"
    ],
    customerInvolvement: "Review options and select materials/colors",
    quality: "Transparent pricing with no hidden fees"
  },
  {
    id: 4,
    title: "Pre-Production & Scheduling",
    duration: "1-2 weeks lead time",
    description: "We order materials and schedule the crew, ensuring everything is ready for launch.",
    icon: <Calendar className="w-8 h-8 text-orange-500" />,
    activities: [
      "Material procurement and delivery",
      "Crew assignment and briefing",
      "Weather monitoring",
      "Permit acquisition"
    ],
    deliverables: [
      "Confirmed project start date",
      "Pre-arrival checklist for homeowners",
      "Material delivery confirmation"
    ],
    customerInvolvement: "Clear driveway and secure pets",
    quality: "Just-in-time delivery prevents material weathering"
  },
  {
    id: 5,
    title: "Installation & Site Protection",
    duration: "1-3 days (weather dependent)",
    description: "Our master installers execute the project with precision and respect for your property.",
    icon: <Hammer className="w-8 h-8 text-orange-500" />,
    activities: [
      "Property protection (tarps, plywood)",
      "Old roof removal and disposal",
      "Decking inspection and repair",
      "System installation (Ice & Water, Underlayment, Shingles)"
    ],
    deliverables: [
      "Daily progress updates",
      "Clean job site at end of each day",
      "New high-performance roofing system"
    ],
    customerInvolvement: "Minimal - we handle everything",
    quality: "On-site project manager supervises all work"
  },
  {
    id: 6,
    title: "Clean-up & Final Inspection",
    duration: "2-4 hours",
    description: "We leave your property cleaner than we found it and verify every detail.",
    icon: <CheckCircle className="w-8 h-8 text-orange-500" />,
    activities: [
      "Magnetic sweep for nails",
      "Gutter cleaning",
      "Debris removal and haul-away",
      "Final quality control walk-through"
    ],
    deliverables: [
      "Certificate of Completion",
      "Warranty registration confirmation",
      "Final invoice"
    ],
    customerInvolvement: "Final walk-through with project manager",
    quality: "Zero-nail guarantee or we pay you $50 per nail found"
  },
  {
    id: 7,
    title: "Warranty & Follow-up",
    duration: "Lifetime Support",
    description: "Our relationship continues long after the trucks leave.",
    icon: <Shield className="w-8 h-8 text-orange-500" />,
    activities: [
      "Warranty activation with manufacturer",
      "1-year workmanship inspection",
      "Referral program enrollment",
      "Annual maintenance reminders"
    ],
    deliverables: [
      "Transferable warranty documents",
      "Maintenance guide",
      "Peace of mind"
    ],
    customerInvolvement: "Enjoy your new roof and refer friends!",
    quality: "Backed by industry-leading manufacturer warranties"
  }
];

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Proven
              <span className="block text-orange-400">7-Step Process</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 max-w-4xl mx-auto mb-8">
              Transparent, professional, and stress-free roofing from consultation to completion. 
              Know exactly what to expect every step of the way.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-zinc-50">
          <div className="max-w-7xl mx-auto px-6">
              <div className="space-y-12">
                  {processSteps.map((step, idx) => (
                      <div key={step.id} className="flex flex-col md:flex-row gap-8 bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
                          <div className="md:w-1/4 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-zinc-100 pb-6 md:pb-0 md:pr-6">
                              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4 text-3xl">
                                  {step.icon}
                              </div>
                              <h3 className="text-2xl font-bold text-zinc-900">Step {step.id}</h3>
                              <div className="text-orange-600 font-bold uppercase tracking-widest text-sm mt-2">{step.title}</div>
                              <div className="mt-4 text-zinc-500 text-sm font-medium">Est. {step.duration}</div>
                          </div>
                          <div className="md:w-3/4">
                              <p className="text-lg text-zinc-700 mb-6">{step.description}</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                      <h4 className="font-bold text-zinc-900 mb-2 flex items-center gap-2"><Hammer className="w-4 h-4"/> Activities</h4>
                                      <ul className="list-disc list-inside text-sm text-zinc-600 space-y-1">
                                          {step.activities.map((a, i) => <li key={i}>{a}</li>)}
                                      </ul>
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-zinc-900 mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4"/> Deliverables</h4>
                                      <ul className="list-disc list-inside text-sm text-zinc-600 space-y-1">
                                          {step.deliverables.map((d, i) => <li key={i}>{d}</li>)}
                                      </ul>
                                  </div>
                              </div>
                              <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-900 flex gap-2">
                                  <span className="font-bold">Quality Guarantee:</span> {step.quality}
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      <Footer />
    </div>
  );
}
