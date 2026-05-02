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
  Sparkles
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const serviceCategories = [
  {
    id: 'core-mechanical',
    title: 'Core Mechanical Services',
    description: 'Essential maintenance and repairs to keep your motorcycle running smoothly',
    icon: Wrench,
    color: 'from-blue-500 to-cyan-500',
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
    color: 'from-purple-500 to-pink-500',
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
    color: 'from-orange-500 to-red-500',
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
    color: 'from-yellow-500 to-orange-500',
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
    color: 'from-green-500 to-teal-500',
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
    color: 'from-red-500 to-rose-500',
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
    color: 'from-indigo-500 to-purple-500',
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
    color: 'from-slate-500 to-gray-600',
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
    color: 'from-emerald-500 to-green-500',
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
    color: 'from-amber-500 to-yellow-500',
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
    color: 'from-fuchsia-500 to-pink-500',
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
    color: 'from-cyan-500 to-blue-500',
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
    color: 'from-amber-600 to-orange-600',
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
    color: 'from-teal-500 to-cyan-500',
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
    color: 'from-violet-500 to-purple-500',
    services: [
      'Crash bars installation'
    ]
  },
  {
    id: 'business',
    title: 'Business Services',
    description: 'Convenient services designed for busy riders',
    icon: Briefcase,
    color: 'from-sky-500 to-blue-500',
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
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230085FF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0085FF]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-[#0085FF]/20 text-[#0085FF] border-[#0085FF]/30 text-sm px-4 py-1">
            Professional Motorcycle Services
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-cyan-400">Services</span>
          </h1>
          <p className="text-lg md:text-xl text-[#E7F6FF]/70 max-w-3xl mx-auto leading-relaxed mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
            From routine maintenance to complete engine rebuilds, RP Motorcycles offers comprehensive 
            motorcycle services. Our experienced technicians handle all makes and models with precision and care.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0085FF]/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-[#0085FF]" />
              </div>
              <div className="text-left">
                <div className="text-white font-bold text-lg">Expert</div>
                <div className="text-[#E7F6FF]/60 text-sm">Technicians</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0085FF]/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#0085FF]" />
              </div>
              <div className="text-left">
                <div className="text-white font-bold text-lg">Quality</div>
                <div className="text-[#E7F6FF]/60 text-sm">Guaranteed</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0085FF]/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-[#0085FF]" />
              </div>
              <div className="text-left">
                <div className="text-white font-bold text-lg">All Makes</div>
                <div className="text-[#E7F6FF]/60 text-sm">& Models</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {serviceCategories.map((category) => {
              const Icon = category.icon
              
              return (
                <div 
                  key={category.id} 
                  className={`group relative bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl border border-[#4F5B62]/30 overflow-hidden transition-all duration-300 hover:border-[#0085FF]/50 hover:shadow-lg hover:shadow-[#0085FF]/10 ${category.highlight ? 'md:col-span-2 ring-1 ring-[#0085FF]/20' : ''}`}
                >
                  {/* Gradient Accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color}`} />
                  
                  <div className={`p-6 md:p-8 ${category.highlight ? 'md:flex md:gap-8' : ''}`}>
                    {/* Header */}
                    <div className={`flex items-start gap-4 mb-6 ${category.highlight ? 'md:w-1/3' : ''}`}>
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {category.title}
                          </h3>
                          {category.highlight && (
                            <Badge className="bg-[#0085FF] text-white text-xs">Popular</Badge>
                          )}
                        </div>
                        {category.description && (
                          <p className="text-[#E7F6FF]/60 text-sm mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {category.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Services List */}
                    <div className={`${category.highlight ? 'md:w-2/3' : ''}`}>
                      {category.subsections ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {category.subsections.map((subsection, idx) => (
                            <div key={idx}>
                              <h4 className="text-[#0085FF] font-semibold mb-3 text-sm uppercase tracking-wide">
                                {subsection.title}
                              </h4>
                              <ul className="space-y-2">
                                {subsection.items.map((service, i) => (
                                  <li key={i} className="flex items-start gap-2 text-[#E7F6FF]/80 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    <CheckCircle className="w-4 h-4 text-[#0085FF] mt-0.5 flex-shrink-0" />
                                    <span>{service}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className={`grid gap-2 ${category.services && category.services.length > 4 ? 'sm:grid-cols-2' : ''}`}>
                          {category.services?.map((service, i) => (
                            <li key={i} className="flex items-start gap-2 text-[#E7F6FF]/80 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                              <CheckCircle className="w-4 h-4 text-[#0085FF] mt-0.5 flex-shrink-0" />
                              <span>{service}</span>
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
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0085FF]/10 via-transparent to-purple-500/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#1E293B] to-[#0F172A] rounded-3xl p-8 md:p-12 lg:p-16 border border-[#4F5B62]/30 text-center">
            <div className="w-16 h-16 rounded-full bg-[#0085FF]/20 flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-[#0085FF]" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Ready to Get Your Motorcycle Serviced?
            </h2>
            <p className="text-[#E7F6FF]/70 text-lg md:text-xl max-w-2xl mx-auto mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Contact us today for a free quote. We offer pickup & delivery services and mobile mechanic options for your convenience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-[#0085FF] hover:bg-[#0177E3] text-white rounded-full px-8 py-6 text-base font-semibold transition-all shadow-lg shadow-[#0085FF]/25 hover:shadow-[#0085FF]/40"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Phone className="w-5 h-5 mr-2" />
                Get a Free Quote
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-[#4F5B62] text-[#E7F6FF] hover:bg-[#1E293B] rounded-full px-8 py-6 text-base font-semibold transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 md:py-16 border-t border-[#4F5B62]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#0085FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all group-hover:bg-[#0085FF]/20 group-hover:scale-110">
                <Phone className="w-7 h-7 text-[#0085FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Call Us</h3>
              <p className="text-[#E7F6FF]/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                Contact us for bookings and enquiries
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#0085FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all group-hover:bg-[#0085FF]/20 group-hover:scale-110">
                <Clock className="w-7 h-7 text-[#0085FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Working Hours</h3>
              <p className="text-[#E7F6FF]/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                Mon - Sat: 8:00 AM - 5:00 PM
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#0085FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all group-hover:bg-[#0085FF]/20 group-hover:scale-110">
                <MapPin className="w-7 h-7 text-[#0085FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Location</h3>
              <p className="text-[#E7F6FF]/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                South Africa
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
