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
  CheckCircle,
  Phone,
  Clock,
  MapPin,
  ChevronRight,
  Shield,
  Award,
  Users,
  Sparkles,
  ArrowRight,
  Star
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
    bgColor: '#0085FF',
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
    bgColor: '#A855F7',
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
      { title: 'Rebuilds & Overhauls', items: ['Full engine rebuild', 'Engine overhaul', 'Cylinder head reconditioning', 'Valve adjustment/replacement', 'Piston & ring replacement', 'Crankshaft repair/replacement', 'Bearing replacement', 'Gasket & seal replacement', 'Compression restoration'] },
      { title: 'Performance', items: ['Engine tuning', 'Performance builds', 'High-performance cams', 'Carburetor tuning / jetting'] }
    ]
  },
  {
    id: 'electrical',
    title: 'Electrical Services',
    description: 'Complete electrical system diagnosis and repair',
    icon: Zap,
    color: '#EAB308',
    bgColor: '#EAB308',
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
    bgColor: '#22C55E',
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
    bgColor: '#6366F1',
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
    bgColor: '#64748B',
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
    bgColor: '#10B981',
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
    bgColor: '#F59E0B',
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
    bgColor: '#EC4899',
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
    bgColor: '#06B6D4',
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
    bgColor: '#D97706',
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
    bgColor: '#14B8A6',
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
    bgColor: '#8B5CF6',
    services: ['Crash bars installation']
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
    <div className="min-h-screen bg-[#0B1120]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0085FF]/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#0085FF]/10 rounded-full blur-3xl opacity-30" />
        
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#0085FF]/10 border border-[#0085FF]/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 bg-[#0085FF] rounded-full animate-pulse" />
              <span className="text-[#0085FF] text-sm font-medium tracking-wide">Professional Motorcycle Services</span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Our Services
            </h1>
            
            {/* Description */}
            <p className="text-lg text-slate-400 leading-relaxed mb-12 max-w-2xl mx-auto">
              From routine maintenance to complete engine rebuilds, RP Motorcycles offers comprehensive motorcycle services. Our experienced technicians handle all makes and models with precision and care.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {[
                { icon: Award, label: 'Expert Technicians' },
                { icon: Shield, label: 'Quality Guaranteed' },
                { icon: Users, label: 'All Makes & Models' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-5 py-2.5">
                  <item.icon className="w-4 h-4 text-[#0085FF]" />
                  <span className="text-white/90 text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6">
          {/* Services Grid */}
          <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((category, index) => {
              const Icon = category.icon
              
              return (
                <div 
                  key={category.id} 
                  className={`group relative bg-gradient-to-b from-white/[0.07] to-white/[0.02] rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-gradient-to-b hover:from-white/[0.1] hover:to-white/[0.03] ${category.highlight ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                >
                  {/* Gradient Top Border */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-5">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundColor: `${category.color}15` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: category.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className="text-lg font-semibold text-white tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {category.title}
                          </h3>
                          {category.highlight && (
                            <span className="inline-flex items-center gap-1 bg-[#0085FF] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                              <Star className="w-2.5 h-2.5" />
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Services List */}
                    <div className="space-y-1.5">
                      {category.subsections ? (
                        <div className="space-y-3">
                          {category.subsections.map((subsection, idx) => (
                            <div key={idx}>
                              <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                {subsection.title}
                              </h4>
                              <ul className="space-y-1">
                                {subsection.items.slice(0, 2).map((service, i) => (
                                  <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                                    <CheckCircle className="w-3.5 h-3.5 text-[#0085FF]/70 flex-shrink-0" />
                                    <span className="truncate">{service}</span>
                                  </li>
                                ))}
                                {subsection.items.length > 2 && (
                                  <li className="text-slate-500 text-xs pl-5">
                                    +{subsection.items.length - 2} more
                                  </li>
                                )}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          {category.services?.slice(0, 4).map((service, i) => (
                            <div key={i} className="flex items-center gap-2.5 text-slate-300 text-sm">
                              <CheckCircle className="w-3.5 h-3.5 text-[#0085FF]/70 flex-shrink-0" />
                              <span>{service}</span>
                            </div>
                          ))}
                          {category.services && category.services.length > 4 && (
                            <div className="text-slate-500 text-xs pl-6 pt-1">
                              +{category.services.length - 4} more services
                            </div>
                          )}
                        </>
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
      <section className="relative pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0085FF]/20 via-[#0085FF]/10 to-transparent border border-[#0085FF]/20">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiMwMDg1RkYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />
            
            <div className="relative px-8 py-12 md:px-16 md:py-16">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left max-w-xl">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Ready to Get Started?
                  </h2>
                  <p className="text-slate-400 text-base leading-relaxed">
                    Contact us for a free quote. We offer pickup & delivery and mobile mechanic services for your convenience.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="bg-[#0085FF] hover:bg-[#0085FF]/90 text-white rounded-xl px-8 py-6 text-base font-semibold shadow-lg shadow-[#0085FF]/25 transition-all hover:shadow-xl hover:shadow-[#0085FF]/30"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Get a Free Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-white/20 text-white/90 hover:bg-white/5 rounded-xl px-8 py-6 text-base font-medium transition-all"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Phone, title: 'Call Us', value: 'Contact us for bookings' },
              { icon: Clock, title: 'Working Hours', value: 'Mon - Sat: 8:00 AM - 5:00 PM' },
              { icon: MapPin, title: 'Location', value: 'South Africa' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-[#0085FF]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[#0085FF]" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm mb-0.5">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} RP Motorcycles. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
