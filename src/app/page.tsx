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
  ChevronRight,
  Shield,
  Award,
  Users,
  Sparkles,
  ArrowRight
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
      {
        title: 'Repairs',
        items: ['Engine fault diagnosis', 'Top-end repairs', 'Bottom-end repairs']
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
        items: ['Engine tuning', 'Performance builds', 'High-performance cams', 'Carburetor tuning / jetting']
      }
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
    description: 'Enhance your motorcycle with quality accessories',
    icon: Package,
    color: '#8B5CF6',
    services: [
      'Crash bars installation'
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
    <div className="min-h-screen bg-[#0F172A]">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <Badge className="mb-6 bg-[#0085FF]/15 text-[#0085FF] border-[#0085FF]/20 text-sm px-5 py-1.5 font-medium">
              Professional Motorcycle Services
            </Badge>
            
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Our <span className="text-[#0085FF]">Services</span>
            </h1>
            
            {/* Description */}
            <p className="text-base md:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed mb-10" style={{ fontFamily: 'Inter, sans-serif' }}>
              From routine maintenance to complete engine rebuilds, RP Motorcycles offers comprehensive 
              motorcycle services. Our experienced technicians handle all makes and models.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              <div className="flex items-center gap-3 bg-[#1E293B]/50 rounded-full px-5 py-2.5">
                <Award className="w-5 h-5 text-[#0085FF]" />
                <span className="text-white font-medium text-sm">Expert Technicians</span>
              </div>
              <div className="flex items-center gap-3 bg-[#1E293B]/50 rounded-full px-5 py-2.5">
                <Shield className="w-5 h-5 text-[#0085FF]" />
                <span className="text-white font-medium text-sm">Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-3 bg-[#1E293B]/50 rounded-full px-5 py-2.5">
                <Users className="w-5 h-5 text-[#0085FF]" />
                <span className="text-white font-medium text-sm">All Makes & Models</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
              What We Offer
            </h2>
            <p className="text-[#94A3B8] text-base">Click on any service category to see details</p>
          </div>

          {/* Services Grid */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((category) => {
              const Icon = category.icon
              
              return (
                <div 
                  key={category.id} 
                  className={`group relative bg-[#1E293B] rounded-xl border border-[#334155] overflow-hidden transition-all duration-200 hover:border-[#0085FF]/60 hover:bg-[#1E293B]/80 ${category.highlight ? 'ring-1 ring-[#0085FF]/30' : ''}`}
                >
                  {/* Color Bar */}
                  <div className="h-1 w-full" style={{ backgroundColor: category.color }} />
                  
                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div 
                        className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: category.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-white truncate" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {category.title}
                          </h3>
                          {category.highlight && (
                            <Badge className="bg-[#0085FF] text-white text-[10px] px-2 py-0.5 font-medium">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <p className="text-[#94A3B8] text-sm leading-relaxed line-clamp-2">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Services List */}
                    <div className="border-t border-[#334155]/50 pt-4">
                      {category.subsections ? (
                        <div className="space-y-3">
                          {category.subsections.map((subsection, idx) => (
                            <div key={idx}>
                              <h4 className="text-xs font-semibold text-[#0085FF] uppercase tracking-wider mb-1.5">
                                {subsection.title}
                              </h4>
                              <ul className="space-y-1">
                                {subsection.items.slice(0, 3).map((service, i) => (
                                  <li key={i} className="flex items-center gap-2 text-[#CBD5E1] text-sm">
                                    <CheckCircle className="w-3.5 h-3.5 text-[#0085FF] flex-shrink-0" />
                                    <span className="truncate">{service}</span>
                                  </li>
                                ))}
                                {subsection.items.length > 3 && (
                                  <li className="text-[#64748B] text-xs pl-5">
                                    +{subsection.items.length - 3} more
                                  </li>
                                )}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="space-y-1.5">
                          {category.services?.slice(0, 4).map((service, i) => (
                            <li key={i} className="flex items-center gap-2 text-[#CBD5E1] text-sm">
                              <CheckCircle className="w-3.5 h-3.5 text-[#0085FF] flex-shrink-0" />
                              <span>{service}</span>
                            </li>
                          ))}
                          {category.services && category.services.length > 4 && (
                            <li className="text-[#64748B] text-xs pl-5">
                              +{category.services.length - 4} more services
                            </li>
                          )}
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
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl border border-[#334155] p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Need Your Motorcycle Serviced?
                </h2>
                <p className="text-[#94A3B8] text-base max-w-lg">
                  Contact us for a free quote. We offer pickup & delivery and mobile mechanic services.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="lg" 
                  className="bg-[#0085FF] hover:bg-[#0085FF]/90 text-white rounded-full px-6 py-5 text-base font-medium transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-[#334155] text-[#CBD5E1] hover:bg-[#1E293B] rounded-full px-6 py-5 text-base font-medium transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-10 border-t border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 bg-[#1E293B]/30 rounded-xl p-4">
              <div className="w-12 h-12 bg-[#0085FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#0085FF]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>Call Us</h3>
                <p className="text-[#94A3B8] text-sm">Contact us for bookings</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-[#1E293B]/30 rounded-xl p-4">
              <div className="w-12 h-12 bg-[#0085FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-[#0085FF]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>Working Hours</h3>
                <p className="text-[#94A3B8] text-sm">Mon - Sat: 8:00 AM - 5:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-[#1E293B]/30 rounded-xl p-4">
              <div className="w-12 h-12 bg-[#0085FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#0085FF]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>Location</h3>
                <p className="text-[#94A3B8] text-sm">South Africa</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
