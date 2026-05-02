'use client'

import { 
  Wrench, 
  Brain, 
  Cog, 
  Zap, 
  Fuel, 
  Gauge,
  CircleDot,
  Settings,
  Paintbrush,
  Rocket,
  RotateCcw,
  Package,
  Briefcase,
  Phone,
  Clock,
  MapPin,
  Shield,
  Award,
  Users,
  Sparkles,
  ArrowRight,
  Puzzle,
  Check
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const serviceCategories = [
  {
    id: 'core-mechanical',
    title: 'Core Mechanical Services',
    description: 'Essential maintenance and repairs to keep your motorcycle running smoothly',
    icon: Wrench,
    color: '#0085FF',
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
    description: 'Advanced diagnostic services to identify and resolve issues',
    icon: Brain,
    color: '#A855F7',
    services: [
      'Full diagnostic checks (manual & electronic)',
      'Fault finding (engine, electrical, fuel system)',
      'Performance issues analysis',
      'Pre-purchase inspections',
      'Roadworthy inspections'
    ]
  },
  {
    id: 'engine',
    title: 'Engine Services',
    description: 'Complete engine repair, rebuild, and performance tuning',
    icon: Cog,
    color: '#F97316',
    highlight: true,
    subsections: [
      { title: 'Repairs', items: ['Engine fault diagnosis', 'Top-end repairs', 'Bottom-end repairs'] },
      { title: 'Rebuilds & Overhauls', items: ['Full engine rebuild', 'Engine overhaul (complete strip & rebuild)', 'Cylinder head reconditioning', 'Valve adjustment / valve replacement', 'Piston & ring replacement', 'Crankshaft repair/replacement', 'Bearing replacement', 'Gasket & seal replacement', 'Compression restoration'] },
      { title: 'Performance', items: ['Engine tuning', 'Performance builds', 'High-performance cams', 'Carburetor tuning / jetting'] }
    ]
  },
  {
    id: 'electrical',
    title: 'Electrical Services',
    description: 'Complete electrical system diagnosis and repair',
    icon: Zap,
    color: '#EAB308',
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
    description: 'Fuel system maintenance, cleaning, and repair',
    icon: Fuel,
    color: '#22C55E',
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
    description: 'Critical brake system services for your safety',
    icon: Shield,
    color: '#EF4444',
    highlight: true,
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
    description: 'Optimize your ride quality and handling',
    icon: Gauge,
    color: '#6366F1',
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
    description: 'Complete wheel and tyre services',
    icon: CircleDot,
    color: '#64748B',
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
    description: 'Keep your power transfer smooth and reliable',
    icon: Settings,
    color: '#10B981',
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
    description: 'Custom exhaust solutions and performance upgrades',
    icon: Rocket,
    color: '#F59E0B',
    services: [
      'Exhaust system installation',
      'Custom exhaust fabrication'
    ]
  },
  {
    id: 'custom',
    title: 'Custom Builds & Modifications',
    description: 'Transform your motorcycle with custom modifications',
    icon: Paintbrush,
    color: '#EC4899',
    services: [
      'Frame modifications',
      'LED lighting upgrades',
      'Footpeg relocation'
    ]
  },
  {
    id: 'performance',
    title: 'Performance Upgrades',
    description: 'Unlock your motorcycles full potential',
    icon: Sparkles,
    color: '#06B6D4',
    services: [
      'Air intake upgrades',
      'Throttle upgrade'
    ]
  },
  {
    id: 'restoration',
    title: 'Restoration Services',
    description: 'Bring classic motorcycles back to life',
    icon: RotateCcw,
    color: '#D97706',
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
    description: 'Comprehensive workshop services for all needs',
    icon: Package,
    color: '#14B8A6',
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
    description: 'Enhance your motorcycle with quality accessories and upgrades',
    icon: Puzzle,
    color: '#8B5CF6',
    highlight: true,
    services: [
      'Crash bars & engine guards installation',
      'Panniers & top box fitting',
      'Windshield & screen installation',
      'Handlebar grips & bar-end mirrors',
      'LED light kits & auxiliary lighting',
      'Phone mounts & GPS holders',
      'Tank pads & protectors',
      'Handguards & lever guards',
      'Seat upgrades & gel pads',
      'Exhaust heat shields',
      'Radiator guards & protection',
      'Frame sliders & sliders'
    ]
  },
  {
    id: 'business',
    title: 'Business Services',
    description: 'Convenient services designed for busy riders',
    icon: Briefcase,
    color: '#0EA5E9',
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
    <div className="min-h-screen bg-[#0c1222]">
      {/* Hero Section */}
      <section className="pt-14 pb-10 md:pt-20 md:pb-14">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#0085FF]/15 border border-[#0085FF]/30 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 bg-[#0085FF] rounded-full" />
              <span className="text-[#0085FF] text-sm font-medium">Professional Motorcycle Services</span>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Our Services
            </h1>
            
            {/* Description */}
            <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
              From routine maintenance to complete engine rebuilds, RP Motorcycles offers comprehensive motorcycle services. Our experienced technicians handle all makes and models.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
                <Award className="w-4 h-4 text-[#0085FF]" />
                <span className="text-white text-sm font-medium">Expert Technicians</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
                <Shield className="w-4 h-4 text-[#0085FF]" />
                <span className="text-white text-sm font-medium">Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
                <Users className="w-4 h-4 text-[#0085FF]" />
                <span className="text-white text-sm font-medium">All Makes & Models</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="pb-14 md:pb-20">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid gap-4 md:gap-5 md:grid-cols-2">
            {serviceCategories.map((category) => {
              const Icon = category.icon
              
              return (
                <div 
                  key={category.id} 
                  className={`bg-[#151d2e] rounded-lg border border-gray-700/50 overflow-hidden ${category.highlight ? 'border-[#0085FF]/50 ring-1 ring-[#0085FF]/20' : ''}`}
                >
                  {/* Color Bar */}
                  <div className="h-1.5" style={{ backgroundColor: category.color }} />
                  
                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div 
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${category.color}18` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: category.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-semibold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {category.title}
                          </h3>
                          {category.highlight && (
                            <Badge className="bg-[#0085FF] text-white text-[10px] px-2 py-0 font-medium">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Services List */}
                    <div className="border-t border-gray-700/50 pt-3 mt-3">
                      {category.subsections ? (
                        <div className="grid gap-3 sm:grid-cols-3">
                          {category.subsections.map((subsection, idx) => (
                            <div key={idx}>
                              <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                                {subsection.title}
                              </h4>
                              <ul className="space-y-1.5">
                                {subsection.items.map((service, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <div className="w-4 h-4 rounded bg-[#0085FF]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                                      <Check className="w-2.5 h-2.5 text-[#0085FF]" />
                                    </div>
                                    <span className="text-gray-300 text-sm leading-snug">{service}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className={`grid gap-1.5 ${category.services && category.services.length > 5 ? 'sm:grid-cols-2' : ''}`}>
                          {category.services?.map((service, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="w-4 h-4 rounded bg-[#0085FF]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-2.5 h-2.5 text-[#0085FF]" />
                              </div>
                              <span className="text-gray-300 text-sm leading-snug">{service}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-14">
        <div className="max-w-5xl mx-auto px-5">
          <div className="bg-gradient-to-br from-[#0085FF]/15 via-[#0085FF]/8 to-transparent rounded-xl border border-[#0085FF]/25 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-1.5" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Ready to Get Started?
                </h2>
                <p className="text-gray-300 text-sm md:text-base">
                  Contact us for a free quote. Pickup & delivery available.
                </p>
              </div>
              <div className="flex gap-2.5">
                <Button 
                  className="bg-[#0085FF] hover:bg-[#0070E0] text-white rounded-lg px-5 py-2.5 text-sm font-semibold"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Get a Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800 rounded-lg px-5 py-2.5 text-sm"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="border-t border-gray-800/50">
        <div className="max-w-5xl mx-auto px-5 py-8">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3.5 bg-[#151d2e] rounded-lg border border-gray-700/50">
              <div className="w-9 h-9 rounded-lg bg-[#0085FF]/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-[#0085FF]" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm">Call Us</h3>
                <p className="text-gray-400 text-sm">Contact us for bookings</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3.5 bg-[#151d2e] rounded-lg border border-gray-700/50">
              <div className="w-9 h-9 rounded-lg bg-[#0085FF]/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-[#0085FF]" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm">Working Hours</h3>
                <p className="text-gray-400 text-sm">Mon - Sat: 8:00 AM - 5:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3.5 bg-[#151d2e] rounded-lg border border-gray-700/50">
              <div className="w-9 h-9 rounded-lg bg-[#0085FF]/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-[#0085FF]" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm">Location</h3>
                <p className="text-gray-400 text-sm">South Africa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-5">
        <div className="max-w-5xl mx-auto px-5 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} RP Motorcycles. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
