'use client'

import { 
  Wrench, 
  Brain, 
  Cog, 
  Zap, 
  Fuel, 
  CircleStop,
  Bike,
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
  Shield,
  Award,
  Users,
  ChevronRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// Service categories with icons and colors matching Astra theme
const serviceCategories = [
  {
    id: 'core-mechanical',
    title: 'Core Mechanical Services',
    icon: Wrench,
    description: 'Essential maintenance and repair services to keep your motorcycle running smoothly.',
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
    description: 'Advanced diagnostic services to identify and resolve issues quickly.',
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
    description: 'Expert engine repairs, rebuilds, and performance tuning.',
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
    description: 'Complete electrical system diagnostics and repairs.',
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
    description: 'Fuel system maintenance and repair for optimal performance.',
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
    description: 'Critical brake services for your safety on the road.',
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
    description: 'Suspension services for a smooth and controlled ride.',
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
    description: 'Complete wheel and tyre services.',
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
    description: 'Transmission services for smooth gear shifting.',
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
    description: 'Exhaust system installation and custom fabrication.',
    services: [
      'Exhaust system installation',
      'Custom exhaust fabrication'
    ]
  },
  {
    id: 'custom',
    title: 'Custom Builds & Modifications',
    icon: Paintbrush,
    description: 'Transform your motorcycle with custom modifications.',
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
    description: 'Enhance your motorcycle\'s performance.',
    services: [
      'Air intake upgrades',
      'Throttle upgrade'
    ]
  },
  {
    id: 'restoration',
    title: 'Restoration Services',
    icon: RotateCcw,
    description: 'Bring vintage motorcycles back to life.',
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
    description: 'Comprehensive workshop services for all your needs.',
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
    description: 'Installation of motorcycle accessories.',
    services: [
      'Crash bars installation'
    ]
  },
  {
    id: 'business',
    title: 'Business Services',
    icon: Briefcase,
    description: 'Convenient services to make your life easier.',
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

const stats = [
  { icon: Users, value: '500+', label: 'Happy Customers' },
  { icon: Award, value: '15+', label: 'Years Experience' },
  { icon: Wrench, value: '1000+', label: 'Bikes Serviced' },
  { icon: Shield, value: '100%', label: 'Satisfaction' }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Page Title Section - Astra Style */}
      <section className="bg-[#0F172A] py-12 md:py-16 border-b border-[#4F5B62]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 capitalize" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Our Services
          </h1>
          <p className="text-lg text-[#E7F6FF]/80 max-w-3xl" style={{ fontFamily: 'Inter, sans-serif' }}>
            From routine maintenance to complete engine rebuilds, RP Motorcycles offers comprehensive motorcycle services. 
            Our experienced technicians are equipped to handle all makes and models.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#212A37] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 bg-[#0085FF]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-7 h-7 text-[#0085FF]" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#E7F6FF]/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Complete Motorcycle Services
            </h2>
            <p className="text-[#E7F6FF]/70 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              We offer a full range of professional motorcycle services. All work is carried out by qualified technicians.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((category) => {
              const Icon = category.icon
              return (
                <Card 
                  key={category.id}
                  className={`bg-[#212A37] border-[#4F5B62]/50 hover:border-[#0085FF]/50 transition-all duration-300 group ${
                    category.highlight ? 'ring-2 ring-[#0085FF]/30' : ''
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#0085FF]/20 flex items-center justify-center group-hover:bg-[#0085FF]/30 transition-colors">
                        <Icon className="w-6 h-6 text-[#0085FF]" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg flex items-center gap-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          {category.title}
                          {category.highlight && (
                            <Badge className="bg-[#0085FF]/20 text-[#0085FF] text-xs border-[#0085FF]/30 hover:bg-[#0085FF]/30">
                              Popular
                            </Badge>
                          )}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {category.description && (
                      <p className="text-sm text-[#E7F6FF]/60 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {category.description}
                      </p>
                    )}
                    {category.subsections ? (
                      <Accordion type="single" collapsible className="w-full">
                        {category.subsections.map((subsection, idx) => (
                          <AccordionItem key={idx} value={`sub-${idx}`} className="border-[#4F5B62]/30">
                            <AccordionTrigger className="text-[#0085FF] hover:text-[#0177E3] py-3 text-sm font-semibold">
                              {subsection.title}
                            </AccordionTrigger>
                            <AccordionContent>
                              <ul className="space-y-2">
                                {subsection.items.map((service, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-[#E7F6FF]/80" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    <CheckCircle className="w-4 h-4 text-[#0085FF] mt-0.5 flex-shrink-0" />
                                    {service}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <ul className="space-y-2">
                        {category.services?.map((service, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#E7F6FF]/80" style={{ fontFamily: 'Inter, sans-serif' }}>
                            <CheckCircle className="w-4 h-4 text-[#0085FF] mt-0.5 flex-shrink-0" />
                            {service}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#212A37] py-16">
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
                className="bg-[#0085FF] hover:bg-[#0177E3] text-white rounded-full px-8 py-4 text-base font-semibold transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Phone className="w-5 h-5 mr-2" />
                Get a Quote
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-[#0085FF] text-[#0085FF] hover:bg-[#0085FF] hover:text-white rounded-full px-8 py-4 text-base font-semibold transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                View Contact Details
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Business Services Highlight */}
      <section className="py-16 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-[#212A37] border-[#4F5B62]/50 text-center p-6">
              <div className="w-16 h-16 bg-[#0085FF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-[#0085FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Call Us</h3>
              <p className="text-[#E7F6FF]/70 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                Contact us for bookings and enquiries
              </p>
            </Card>
            <Card className="bg-[#212A37] border-[#4F5B62]/50 text-center p-6">
              <div className="w-16 h-16 bg-[#0085FF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[#0085FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Working Hours</h3>
              <p className="text-[#E7F6FF]/70 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                Mon - Sat: 8:00 AM - 5:00 PM
              </p>
            </Card>
            <Card className="bg-[#212A37] border-[#4F5B62]/50 text-center p-6">
              <div className="w-16 h-16 bg-[#0085FF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-[#0085FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Location</h3>
              <p className="text-[#E7F6FF]/70 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                South Africa
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
