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
  Check,
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
    <div className="min-h-screen bg-[#0a0e17] relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial gradient overlay */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(0,133,255,0.08)_0%,transparent_70%)]" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        {/* Accent glow */}
        <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-[#0085FF]/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-[30%] left-0 w-[400px] h-[400px] bg-[#A855F7]/[0.02] rounded-full blur-[80px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#0085FF]/10 via-[#0085FF]/5 to-[#0085FF]/10 border border-[#0085FF]/20 rounded-full px-5 py-2 mb-6 backdrop-blur-sm">
              <Star className="w-3.5 h-3.5 text-[#0085FF]" fill="#0085FF" />
              <span className="text-[#0085FF] text-sm font-semibold tracking-wide uppercase">Professional Motorcycle Services</span>
              <Star className="w-3.5 h-3.5 text-[#0085FF]" fill="#0085FF" />
            </div>
            
            {/* Title with gradient */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 mb-5" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Our Services
            </h1>
            
            {/* Description */}
            <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto font-light">
              From routine maintenance to complete engine rebuilds, RP Motorcycles offers comprehensive motorcycle services. Our experienced technicians handle all makes and models with precision and care.
            </p>
            
            {/* Trust Badges - Premium Design */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0085FF]/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-3 bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 rounded-xl px-5 py-3 backdrop-blur-sm hover:border-[#0085FF]/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0085FF] to-[#0085FF]/70 flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="text-white text-sm font-semibold block">Expert Technicians</span>
                    <span className="text-gray-500 text-xs">Certified Professionals</span>
                  </div>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0085FF]/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-3 bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 rounded-xl px-5 py-3 backdrop-blur-sm hover:border-[#0085FF]/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0085FF] to-[#0085FF]/70 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="text-white text-sm font-semibold block">Quality Guaranteed</span>
                    <span className="text-gray-500 text-xs">Workmanship Warranty</span>
                  </div>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0085FF]/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-3 bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 rounded-xl px-5 py-3 backdrop-blur-sm hover:border-[#0085FF]/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0085FF] to-[#0085FF]/70 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="text-white text-sm font-semibold block">All Makes & Models</span>
                    <span className="text-gray-500 text-xs">Universal Expertise</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid gap-5 md:gap-6 md:grid-cols-2">
            {serviceCategories.map((category, index) => {
              const Icon = category.icon
              
              return (
                <div 
                  key={category.id} 
                  className={`group relative ${category.highlight ? 'md:col-span-2' : ''}`}
                >
                  {/* Premium Card with Glass Effect */}
                  <div className={`
                    relative h-full rounded-2xl overflow-hidden
                    bg-gradient-to-br from-white/[0.07] to-white/[0.02]
                    border border-white/[0.08]
                    backdrop-blur-xl
                    transition-all duration-500 ease-out
                    hover:border-[#0085FF]/30 hover:shadow-[0_0_40px_rgba(0,133,255,0.1)]
                    ${category.highlight ? 'border-[#0085FF]/20' : ''}
                  `}>
                    {/* Premium Color Accent Bar */}
                    <div className="absolute top-0 left-0 right-0 h-[2px]">
                      <div 
                        className="h-full w-full"
                        style={{ 
                          background: `linear-gradient(90deg, transparent, ${category.color}, ${category.color}, transparent)` 
                        }}
                      />
                    </div>
                    
                    {/* Subtle inner glow on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at top, ${category.color}08, transparent 70%)`
                      }}
                    />

                    <div className="relative p-6 md:p-7">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-5">
                        {/* Premium Icon Container */}
                        <div 
                          className="relative w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                          style={{ 
                            background: `linear-gradient(135deg, ${category.color}20, ${category.color}08)`,
                            boxShadow: `0 4px 20px ${category.color}15`
                          }}
                        >
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: `linear-gradient(135deg, ${category.color}30, transparent)`
                            }}
                          />
                          <Icon className="w-6 h-6 relative z-10" style={{ color: category.color }} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                              {category.title}
                            </h3>
                            {category.highlight && (
                              <Badge className="bg-gradient-to-r from-[#0085FF] to-[#0085FF]/80 text-white text-[10px] px-2.5 py-0.5 font-semibold rounded-full border-0">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm mt-1.5 font-light leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Services List */}
                      <div className="border-t border-white/[0.06] pt-5">
                        {category.subsections ? (
                          <div className="grid gap-5 md:grid-cols-3">
                            {category.subsections.map((subsection, idx) => (
                              <div key={idx}>
                                <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: category.color }} />
                                  {subsection.title}
                                </h4>
                                <ul className="space-y-2.5">
                                  {subsection.items.map((service, i) => (
                                    <li key={i} className="flex items-start gap-2.5 group/item">
                                      <div 
                                        className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover/item:scale-110"
                                        style={{ 
                                          background: `linear-gradient(135deg, ${category.color}20, ${category.color}08)`,
                                        }}
                                      >
                                        <Check className="w-3 h-3" style={{ color: category.color }} />
                                      </div>
                                      <span className="text-gray-300 text-sm leading-relaxed font-light group-hover/item:text-white transition-colors duration-300">{service}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <ul className={`grid gap-2.5 ${category.services && category.services.length > 4 ? 'sm:grid-cols-2' : ''}`}>
                            {category.services?.map((service, i) => (
                              <li key={i} className="flex items-start gap-2.5 group/item">
                                <div 
                                  className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover/item:scale-110"
                                  style={{ 
                                    background: `linear-gradient(135deg, ${category.color}20, ${category.color}08)`,
                                  }}
                                >
                                  <Check className="w-3 h-3" style={{ color: category.color }} />
                                </div>
                                <span className="text-gray-300 text-sm leading-relaxed font-light group-hover/item:text-white transition-colors duration-300">{service}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Design */}
      <section className="relative pb-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="relative overflow-hidden rounded-2xl">
            {/* Premium gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0085FF]/20 via-[#0085FF]/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-transparent to-transparent" />
            
            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl border border-[#0085FF]/20" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0085FF]/50 to-transparent" />
            
            <div className="relative p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Ready to Get Started?
                  </h2>
                  <p className="text-gray-400 text-base md:text-lg font-light max-w-md">
                    Contact us for a free quote. Professional pickup & delivery service available across the region.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="group relative overflow-hidden bg-gradient-to-r from-[#0085FF] to-[#0070E0] text-white rounded-xl px-7 py-6 text-base font-semibold shadow-[0_0_30px_rgba(0,133,255,0.3)] hover:shadow-[0_0_50px_rgba(0,133,255,0.5)] transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      Get a Quote
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                  <Button 
                    variant="outline"
                    className="bg-transparent border-white/20 text-white hover:bg-white/5 hover:border-white/30 rounded-xl px-7 py-6 text-base font-medium transition-all duration-300"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info - Premium Cards */}
      <section className="relative border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] p-5 hover:border-[#0085FF]/30 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0085FF]/20 to-[#0085FF]/5 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#0085FF]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-0.5">Call Us</h3>
                  <p className="text-gray-500 text-sm font-light">Contact us for bookings</p>
                </div>
              </div>
            </div>
            <div className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] p-5 hover:border-[#0085FF]/30 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0085FF]/20 to-[#0085FF]/5 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#0085FF]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-0.5">Working Hours</h3>
                  <p className="text-gray-500 text-sm font-light">Mon - Sat: 8:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
            <div className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] p-5 hover:border-[#0085FF]/30 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0085FF]/20 to-[#0085FF]/5 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#0085FF]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-0.5">Location</h3>
                  <p className="text-gray-500 text-sm font-light">South Africa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/[0.05] py-6">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <p className="text-gray-600 text-sm font-light">
            © {new Date().getFullYear()} RP Motorcycles. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
