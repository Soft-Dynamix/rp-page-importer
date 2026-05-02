'use client'

import { 
  Wrench, 
  Brain, 
  Cog, 
  Zap, 
  Fuel, 
  CircleStop,
  Gauge,
  CircleDot,
  Settings,
  Paintbrush,
  Rocket,
  RotateCcw,
  Package,
  Briefcase,
  CheckCircle,
  Phone,
  Clock,
  MapPin,
  ChevronRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// Service categories with keyword-based image URLs from Unsplash
// Using source.unsplash.com with specific keywords for each service
const serviceCategories = [
  {
    id: 'core-mechanical',
    title: 'Core Mechanical Services',
    icon: Wrench,
    // Motorcycle mechanic working
    image: 'https://source.unsplash.com/600x400/?motorcycle,mechanic,workshop',
    services: [
      'General repair & servicing',
      'Full motorcycle servicing (minor / major)',
      'Oil & filter changes',
      'Spark plug replacement',
      'Air filter cleaning/replacement',
      'Fuel filter replacement',
      'Coolant flush & refill',
      'Brake fluid replacement',
      'Chain cleaning, adjustment & lubrication',
      'Belt & shaft drive servicing',
      'Bolt tightening & safety checks'
    ]
  },
  {
    id: 'diagnostics',
    title: 'Diagnostics & Troubleshooting',
    icon: Brain,
    // Motorcycle electronics/diagnostics
    image: 'https://source.unsplash.com/600x400/?motorcycle,engine,technology',
    services: [
      'Full diagnostic checks (manual & electronic)',
      'Fault finding (engine, electrical, fuel system)',
      'Performance issues analysis',
      'Pre-purchase inspections',
      'Roadworthy inspections (depending on region)'
    ]
  },
  {
    id: 'engine',
    title: 'Engine Services',
    icon: Cog,
    // Motorcycle engine
    image: 'https://source.unsplash.com/600x400/?motorcycle,engine,piston',
    highlight: true,
    subsections: [
      {
        title: 'Repairs',
        items: [
          'Engine fault diagnosis',
          'Top-end repairs',
          'Bottom-end repairs'
        ]
      },
      {
        title: 'Rebuilds & Overhauls',
        items: [
          'Full engine rebuild',
          'Engine overhaul (complete strip & rebuild)',
          'Cylinder head reconditioning',
          'Valve adjustment / valve replacement',
          'Piston & ring replacement',
          'Crankshaft repair/replacement',
          'Bearing replacement',
          'Gasket & seal replacement',
          'Compression restoration'
        ]
      },
      {
        title: 'Performance',
        items: [
          'Engine tuning',
          'Performance builds',
          'High-performance cams',
          'Carburetor tuning / jetting'
        ]
      }
    ]
  },
  {
    id: 'electrical',
    title: 'Electrical Services',
    icon: Zap,
    // Motorcycle electrical/battery
    image: 'https://source.unsplash.com/600x400/?motorcycle,headlight,lights',
    services: [
      'Battery testing & replacement',
      'Charging system repairs (stator, regulator)',
      'Starter motor repairs',
      'Wiring repairs & rewiring',
      'Lighting installation & repair',
      'Indicator & brake light fixes'
    ]
  },
  {
    id: 'fuel-system',
    title: 'Fuel System Services',
    icon: Fuel,
    // Motorcycle fuel tank
    image: 'https://source.unsplash.com/600x400/?motorcycle,tank,gas',
    services: [
      'Carburetor cleaning & rebuild',
      'Fuel injector cleaning',
      'Fuel pump repair/replacement',
      'Fuel line replacement',
      'Tank cleaning (rust removal)'
    ]
  },
  {
    id: 'brakes',
    title: 'Brakes & Safety',
    icon: CircleStop,
    // Motorcycle brakes
    image: 'https://source.unsplash.com/600x400/?motorcycle,brake,disc',
    services: [
      'Brake pad replacement',
      'Brake disc replacement',
      'Brake caliper rebuild',
      'Brake bleeding'
    ]
  },
  {
    id: 'suspension',
    title: 'Suspension & Handling',
    icon: Gauge,
    // Motorcycle suspension/forks
    image: 'https://source.unsplash.com/600x400/?motorcycle,forks,suspension',
    services: [
      'Fork seal replacement',
      'Fork rebuilds',
      'Shock absorber replacement',
      'Suspension tuning',
      'Steering head bearing replacement'
    ]
  },
  {
    id: 'wheels',
    title: 'Wheels & Tyres',
    icon: CircleDot,
    // Motorcycle wheels/tyres
    image: 'https://source.unsplash.com/600x400/?motorcycle,wheel,tire',
    services: [
      'Tyre fitting & replacement',
      'Tube replacement',
      'Wheel balancing',
      'Spoke tightening & alignment',
      'Bearing replacement'
    ]
  },
  {
    id: 'transmission',
    title: 'Transmission & Drivetrain',
    icon: Settings,
    // Motorcycle chain/sprocket
    image: 'https://source.unsplash.com/600x400/?motorcycle,chain,gear',
    services: [
      'Clutch replacement',
      'Clutch cable adjustment/replacement',
      'Gearbox repairs',
      'Sprocket replacement'
    ]
  },
  {
    id: 'exhaust',
    title: 'Exhaust & Performance',
    icon: Rocket,
    // Motorcycle exhaust
    image: 'https://source.unsplash.com/600x400/?motorcycle,exhaust,pipe',
    services: [
      'Exhaust system installation',
      'Custom exhaust fabrication'
    ]
  },
  {
    id: 'custom',
    title: 'Custom Builds & Modifications',
    icon: Paintbrush,
    // Custom motorcycle/cafe racer
    image: 'https://source.unsplash.com/600x400/?cafe,racer,custom,motorcycle',
    services: [
      'Frame modifications',
      'LED lighting upgrades',
      'Footpeg relocation'
    ]
  },
  {
    id: 'performance',
    title: 'Performance Upgrades',
    icon: Rocket,
    // Sport/racing motorcycle
    image: 'https://source.unsplash.com/600x400/?racing,motorcycle,sport,bike',
    services: [
      'Air intake upgrades',
      'Throttle upgrade'
    ]
  },
  {
    id: 'restoration',
    title: 'Restoration Services',
    icon: RotateCcw,
    // Vintage/classic motorcycle
    image: 'https://source.unsplash.com/600x400/?vintage,motorcycle,classic,bike',
    services: [
      'Full bike restoration',
      'Vintage motorcycle restoration',
      'Engine restoration',
      'Parts refurbishment'
    ]
  },
  {
    id: 'workshop',
    title: 'General Workshop Services',
    icon: Package,
    // Motorcycle workshop
    image: 'https://source.unsplash.com/600x400/?motorcycle,garage,workshop',
    services: [
      'Bike assembly (new or imported bikes)',
      'Accident repairs',
      'Insurance assessments & quotes',
      'Parts sourcing & installation',
      'Accessory installation'
    ]
  },
  {
    id: 'accessories',
    title: 'Accessories & Add-Ons',
    icon: Package,
    // Motorcycle accessories
    image: 'https://source.unsplash.com/600x400/?motorcycle,accessories,parts',
    services: [
      'Crash bars installation'
    ]
  },
  {
    id: 'business',
    title: 'Business Services',
    icon: Briefcase,
    // Motorcycle service
    image: 'https://source.unsplash.com/600x400/?motorcycle,service,repair',
    highlight: true,
    services: [
      'Pickup & delivery service',
      'Mobile mechanic services',
      'Breakdown assistance',
      'Warranty on repairs',
      'Consultation & advice'
    ]
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Page Title Section */}
      <section className="py-12 md:py-16 border-b border-[#4F5B62]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Our Services
          </h1>
          <p className="text-lg text-[#E7F6FF]/80 max-w-3xl leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            From routine maintenance to complete engine rebuilds, RP Motorcycles offers comprehensive motorcycle services. 
            Our experienced technicians are equipped to handle all makes and models.
          </p>
        </div>
      </section>

      {/* Services Section - Each service with image */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {serviceCategories.map((category, index) => {
            const Icon = category.icon
            const isEven = index % 2 === 0
            
            return (
              <div key={category.id} className="mb-16 last:mb-0">
                {/* Service Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-[#0085FF]/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-[#0085FF]" />
                  </div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {category.title}
                    </h2>
                    {category.highlight && (
                      <Badge className="bg-[#0085FF]/20 text-[#0085FF] text-sm border-[#0085FF]/30">
                        Popular
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Service Content - Image and Services */}
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-start`}>
                  {/* Image */}
                  <div className="w-full lg:w-2/5 flex-shrink-0">
                    <div className="relative rounded-xl overflow-hidden aspect-video bg-[#212A37]">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://placehold.co/600x400/212A37/0085FF?text=${encodeURIComponent(category.title)}`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent"></div>
                    </div>
                  </div>

                  {/* Services List */}
                  <div className="flex-1">
                    {category.subsections ? (
                      <Accordion type="single" collapsible className="w-full" defaultValue={`sub-0`}>
                        {category.subsections.map((subsection, idx) => (
                          <AccordionItem key={idx} value={`sub-${idx}`} className="border-[#4F5B62]/30">
                            <AccordionTrigger className="text-[#0085FF] hover:text-[#0177E3] py-4 text-lg font-semibold text-left">
                              {subsection.title}
                            </AccordionTrigger>
                            <AccordionContent>
                              <ul className="space-y-3 pl-1">
                                {subsection.items.map((service, i) => (
                                  <li key={i} className="flex items-start gap-3 text-[#E7F6FF]/90 text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    <CheckCircle className="w-5 h-5 text-[#0085FF] mt-0.5 flex-shrink-0" />
                                    <span>{service}</span>
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <ul className="space-y-3">
                        {category.services?.map((service, i) => (
                          <li key={i} className="flex items-start gap-3 text-[#E7F6FF]/90 text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
                            <CheckCircle className="w-5 h-5 text-[#0085FF] mt-0.5 flex-shrink-0" />
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Divider */}
                {index < serviceCategories.length - 1 && (
                  <div className="mt-12 border-t border-[#4F5B62]/30"></div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-[#212A37]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#0085FF]/20 to-[#0177E3]/20 rounded-2xl p-8 md:p-12 text-center border border-[#0085FF]/30">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Ready to Get Your Motorcycle Serviced?
            </h2>
            <p className="text-[#E7F6FF]/80 text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Contact us today for a free quote. We offer pickup & delivery services and mobile mechanic options for your convenience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-[#0085FF] hover:bg-[#0177E3] text-white rounded-full px-8 py-6 text-base font-semibold transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Phone className="w-5 h-5 mr-2" />
                Get a Quote
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-[#0085FF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-[#0085FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Call Us</h3>
              <p className="text-[#E7F6FF]/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                Contact us for bookings and enquiries
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-[#0085FF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-[#0085FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Working Hours</h3>
              <p className="text-[#E7F6FF]/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                Mon - Sat: 8:00 AM - 5:00 PM
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-[#0085FF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-[#0085FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Location</h3>
              <p className="text-[#E7F6FF]/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                South Africa
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
