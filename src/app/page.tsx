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
import Image from 'next/image'

const serviceCategories = [
  {
    id: 'core-mechanical',
    title: 'Core Mechanical Services',
    description: 'Essential maintenance and repairs to keep your motorcycle running smoothly',
    icon: Wrench,
    color: '#0085FF',
    image: '/core-mechanical.jpg',
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
    image: '/diagnostics.jpg',
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
    image: '/engine-services.jpg',
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
    image: '/electrical-services.jpeg',
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
    image: 'https://placehold.co/800x400/22C55E/FFFFFF/png?text=Fuel+System',
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
    image: 'https://placehold.co/800x400/EF4444/FFFFFF/png?text=Brakes+Safety',
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
    image: 'https://placehold.co/800x400/6366F1/FFFFFF/png?text=Suspension',
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
    image: 'https://placehold.co/800x400/64748B/FFFFFF/png?text=Wheels+Tyres',
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
    image: 'https://placehold.co/800x400/10B981/FFFFFF/png?text=Transmission',
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
    image: 'https://placehold.co/800x400/F59E0B/000000/png?text=Exhaust',
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
    image: 'https://placehold.co/800x400/EC4899/FFFFFF/png?text=Custom+Builds',
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
    image: 'https://placehold.co/800x400/06B6D4/FFFFFF/png?text=Performance',
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
    image: 'https://placehold.co/800x400/D97706/FFFFFF/png?text=Restoration',
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
    image: 'https://placehold.co/800x400/14B8A6/FFFFFF/png?text=Workshop',
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
    image: 'https://placehold.co/800x400/8B5CF6/FFFFFF/png?text=Accessories',
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
    image: 'https://placehold.co/800x400/0EA5E9/FFFFFF/png?text=Business+Services',
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
    <div className="min-h-screen bg-[#080c14] relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main radial gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[900px] bg-[radial-gradient(ellipse_at_center,rgba(0,133,255,0.12)_0%,rgba(0,133,255,0.03)_40%,transparent_70%)]" />
        
        {/* Subtle noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] bg-[#0085FF]/[0.04] rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[20%] left-[5%] w-[500px] h-[500px] bg-[#A855F7]/[0.03] rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-[50%] left-[30%] w-[300px] h-[300px] bg-[#0085FF]/[0.02] rounded-full blur-[80px]" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-[#0085FF]/15 via-[#0085FF]/8 to-[#0085FF]/15 border border-[#0085FF]/25 rounded-full px-8 py-3 mb-10 backdrop-blur-md shadow-[0_0_30px_rgba(0,133,255,0.1)]">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-[#0085FF]" fill="#0085FF" />
                <Star className="w-3 h-3 text-[#0085FF]/60" fill="#0085FF" />
              </div>
              <span className="text-[#0085FF] text-base font-bold tracking-[0.15em] uppercase">Professional Motorcycle Services</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-[#0085FF]/60" fill="#0085FF" />
                <Star className="w-4 h-4 text-[#0085FF]" fill="#0085FF" />
              </div>
            </div>
            
            {/* Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 mb-8 tracking-[-0.02em]" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Our Services
            </h1>
            
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#0085FF]/50" />
              <div className="w-2 h-2 rounded-full bg-[#0085FF]" />
              <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#0085FF]/50" />
            </div>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-14 max-w-4xl mx-auto font-light">
              From routine maintenance to complete engine rebuilds, RP Motorcycles offers comprehensive motorcycle services. Our experienced technicians handle all makes and models with <span className="text-white font-medium">precision and care</span>.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: Award, title: 'Expert Technicians', subtitle: 'Certified Professionals', color: '#0085FF' },
                { icon: Shield, title: 'Quality Guaranteed', subtitle: 'Workmanship Warranty', color: '#22C55E' },
                { icon: Users, title: 'All Makes & Models', subtitle: 'Universal Expertise', color: '#A855F7' },
              ].map((item, index) => (
                <div key={index} className="group relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#0085FF]/20 via-[#0085FF]/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative flex items-center gap-5 bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.12] rounded-2xl px-7 py-5 backdrop-blur-md hover:border-[#0085FF]/40 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,133,255,0.15)]">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0085FF]/30 to-transparent rounded-xl blur-md" />
                      <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#0085FF] to-[#0085FF]/80 flex items-center justify-center shadow-[0_4px_20px_rgba(0,133,255,0.4)]">
                        <item.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="text-left">
                      <span className="text-white text-xl font-bold block tracking-tight">{item.title}</span>
                      <span className="text-gray-400 text-sm font-medium">{item.subtitle}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid gap-7 md:gap-8 md:grid-cols-2">
            {serviceCategories.map((category, index) => {
              const Icon = category.icon
              
              return (
                <div 
                  key={category.id} 
                  className={`group relative ${category.highlight ? 'md:col-span-2' : ''}`}
                >
                  {/* Card Container */}
                  <div className={`
                    relative h-full rounded-3xl overflow-hidden
                    bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent
                    border border-white/[0.1]
                    backdrop-blur-2xl
                    transition-all duration-700 ease-out
                    hover:border-[#0085FF]/40 hover:shadow-[0_20px_60px_rgba(0,133,255,0.15)]
                    ${category.highlight ? 'border-[#0085FF]/25 shadow-[0_0_40px_rgba(0,133,255,0.08)]' : ''}
                  `}>
                    {/* Premium Color Accent Bar */}
                    <div className="absolute top-0 left-0 right-0 h-[4px] overflow-hidden z-20">
                      <div 
                        className="absolute inset-0"
                        style={{ 
                          background: `linear-gradient(90deg, transparent 0%, ${category.color} 20%, ${category.color} 80%, transparent 100%)`,
                          boxShadow: `0 0 20px ${category.color}80`
                        }}
                      />
                    </div>
                    
                    {/* Service Image */}
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/60 to-transparent z-10" />
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Fallback gradient if image doesn't load */}
                      <div 
                        className="absolute inset-0 opacity-50"
                        style={{
                          background: `linear-gradient(135deg, ${category.color}20, transparent)`
                        }}
                      />
                    </div>
                    
                    {/* Corner accent */}
                    <div 
                      className="absolute top-48 right-0 w-32 h-32 opacity-20"
                      style={{
                        background: `radial-gradient(circle at top right, ${category.color}20, transparent 70%)`
                      }}
                    />
                    
                    {/* Inner glow on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at top, ${category.color}06, transparent 60%)`
                      }}
                    />

                    <div className="relative p-8 md:p-10">
                      {/* Header */}
                      <div className="flex items-start gap-6 mb-8 -mt-16 relative z-10">
                        {/* Premium Icon Container */}
                        <div className="relative flex-shrink-0">
                          <div 
                            className="absolute inset-0 rounded-2xl blur-xl opacity-50"
                            style={{ backgroundColor: `${category.color}40` }}
                          />
                          <div 
                            className="relative w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-[#080c14]"
                            style={{ 
                              background: `linear-gradient(135deg, ${category.color}25, ${category.color}08)`,
                              boxShadow: `inset 0 1px 0 ${category.color}20, 0 8px 32px ${category.color}20`
                            }}
                          >
                            <div 
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              style={{
                                background: `linear-gradient(135deg, ${category.color}40, transparent)`
                              }}
                            />
                            <Icon className="w-8 h-8 relative z-10 transition-transform duration-500 group-hover:scale-110" style={{ color: category.color }} />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0 pt-1">
                          <div className="flex items-center gap-4 flex-wrap">
                            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                              {category.title}
                            </h3>
                            {category.highlight && (
                              <Badge className="bg-gradient-to-r from-[#0085FF] to-[#0066CC] text-white text-xs px-4 py-1.5 font-bold rounded-full border-0 shadow-[0_4px_15px_rgba(0,133,255,0.3)]">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-400 text-lg mt-3 leading-relaxed font-light">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Divider */}
                      <div className="relative mb-8">
                        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
                      </div>
                      
                      {/* Services List */}
                      {category.subsections ? (
                        <div className="grid gap-8 md:grid-cols-3">
                          {category.subsections.map((subsection, idx) => (
                            <div key={idx}>
                              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-5 flex items-center gap-3">
                                <span 
                                  className="w-2.5 h-2.5 rounded-full" 
                                  style={{ 
                                    backgroundColor: category.color,
                                    boxShadow: `0 0 10px ${category.color}60`
                                  }} 
                                />
                                {subsection.title}
                              </h4>
                              <ul className="space-y-4">
                                {subsection.items.map((service, i) => (
                                  <li key={i} className="flex items-start gap-4 group/item">
                                    <div 
                                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-400 group-hover/item:scale-110 group-hover/item:shadow-lg"
                                      style={{ 
                                        background: `linear-gradient(135deg, ${category.color}18, ${category.color}08)`,
                                        boxShadow: `0 2px 8px ${category.color}10`
                                      }}
                                    >
                                      <Check className="w-4 h-4" style={{ color: category.color }} />
                                    </div>
                                    <span className="text-gray-200 text-lg leading-relaxed group-hover/item:text-white transition-colors duration-300 font-light">{service}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className={`grid gap-4 ${category.services && category.services.length > 5 ? 'sm:grid-cols-2' : ''}`}>
                          {category.services?.map((service, i) => (
                            <li key={i} className="flex items-start gap-4 group/item">
                              <div 
                                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-400 group-hover/item:scale-110"
                                style={{ 
                                  background: `linear-gradient(135deg, ${category.color}18, ${category.color}08)`,
                                }}
                              >
                                <Check className="w-4 h-4" style={{ color: category.color }} />
                              </div>
                              <span className="text-gray-200 text-lg leading-relaxed group-hover/item:text-white transition-colors duration-300 font-light">{service}</span>
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
      <section className="relative pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Multi-layered background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0085FF]/25 via-[#0085FF]/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#A855F7]/10 via-transparent to-transparent" />
            
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-3xl">
              <div className="absolute inset-0 rounded-3xl border border-[#0085FF]/20" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0085FF] to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0085FF]/30 to-transparent" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-[#0085FF]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-[#A855F7]/10 rounded-full blur-2xl" />
            
            <div className="relative p-12 md:p-16 lg:p-20">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="text-center lg:text-left">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-5 tracking-[-0.02em]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Ready to Get Started?
                  </h2>
                  <p className="text-gray-300 text-xl md:text-2xl max-w-xl font-light leading-relaxed">
                    Contact us for a <span className="text-white font-medium">free quote</span>. Professional pickup & delivery service available.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-5">
                  <Button 
                    className="group relative overflow-hidden bg-gradient-to-r from-[#0085FF] via-[#0085FF] to-[#0070E0] text-white rounded-2xl px-10 py-8 text-xl font-bold shadow-[0_8px_40px_rgba(0,133,255,0.4)] hover:shadow-[0_12px_60px_rgba(0,133,255,0.6)] transition-all duration-500"
                  >
                    <span className="relative z-10 flex items-center">
                      <Phone className="w-6 h-6 mr-3" />
                      Get a Quote
                      <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                  </Button>
                  <Button 
                    variant="outline"
                    className="bg-white/[0.05] border-white/20 text-white hover:bg-white/10 hover:border-white/40 rounded-2xl px-10 py-8 text-xl font-semibold transition-all duration-500 backdrop-blur-sm"
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
      <section className="relative border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-14">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Phone, title: 'Call Us', subtitle: 'Contact us for bookings' },
              { icon: Clock, title: 'Working Hours', subtitle: 'Mon - Sat: 8:00 AM - 5:00 PM' },
              { icon: MapPin, title: 'Location', subtitle: 'South Africa' },
            ].map((item, index) => (
              <div 
                key={index}
                className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.1] p-7 hover:border-[#0085FF]/40 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,133,255,0.1)]"
              >
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#0085FF]/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-[#0085FF]/20 to-[#0085FF]/5 flex items-center justify-center border border-[#0085FF]/20">
                      <item.icon className="w-7 h-7 text-[#0085FF]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-lg font-light">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
