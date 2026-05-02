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
  Star,
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
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0085FF]/8 via-transparent to-transparent" />
        
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#0085FF]/10 border border-[#0085FF]/25 rounded-full px-5 py-2 mb-6">
              <span className="w-2 h-2 bg-[#0085FF] rounded-full" />
              <span className="text-[#0085FF] text-sm font-semibold">Professional Motorcycle Services</span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Our Services
            </h1>
            
            {/* Description */}
            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
              From routine maintenance to complete engine rebuilds, RP Motorcycles offers comprehensive motorcycle services. Our experienced technicians handle all makes and models.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: Award, label: 'Expert Technicians' },
                { icon: Shield, label: 'Quality Guaranteed' },
                { icon: Users, label: 'All Makes & Models' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                  <item.icon className="w-4 h-4 text-[#0085FF]" />
                  <span className="text-white text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="pb-16 md:pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid gap-5 md:grid-cols-2">
            {serviceCategories.map((category) => {
              const Icon = category.icon
              
              return (
                <div 
                  key={category.id} 
                  className={`bg-[#111827] rounded-xl border border-gray-800 overflow-hidden ${category.highlight ? 'border-[#0085FF]/40' : ''}`}
                >
                  {/* Color Bar */}
                  <div className="h-1" style={{ backgroundColor: category.color }} />
                  
                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: category.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-semibold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {category.title}
                          </h3>
                          {category.highlight && (
                            <Badge className="bg-[#0085FF] text-white text-[10px] px-1.5 py-0.5 font-medium">
                              Popular
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4">
                      {category.description}
                    </p>
                    
                    {/* Services List */}
                    <div className="border-t border-gray-800 pt-4">
                      {category.subsections ? (
                        <div className="grid gap-4 sm:grid-cols-3">
                          {category.subsections.map((subsection, idx) => (
                            <div key={idx}>
                              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                {subsection.title}
                              </h4>
                              <ul className="space-y-2">
                                {subsection.items.map((service, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <div className="w-4 h-4 rounded-full bg-[#0085FF]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                      <Check className="w-2.5 h-2.5 text-[#0085FF]" />
                                    </div>
                                    <span className="text-gray-200 text-sm">{service}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className={`grid gap-2 ${category.services && category.services.length > 5 ? 'sm:grid-cols-2' : ''}`}>
                          {category.services?.map((service, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="w-4 h-4 rounded-full bg-[#0085FF]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-2.5 h-2.5 text-[#0085FF]" />
                              </div>
                              <span className="text-gray-200 text-sm">{service}</span>
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
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-r from-[#0085FF]/20 to-[#0085FF]/5 rounded-2xl border border-[#0085FF]/30 p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Ready to Get Started?
                </h2>
                <p className="text-gray-300">
                  Contact us for a free quote. Pickup & delivery available.
                </p>
              </div>
              <div className="flex gap-3">
                <Button 
                  className="bg-[#0085FF] hover:bg-[#0085FF]/90 text-white rounded-lg px-6 py-3 font-semibold"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Get a Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800 rounded-lg px-6 py-3"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: Phone, title: 'Call Us', value: 'Contact us for bookings' },
              { icon: Clock, title: 'Working Hours', value: 'Mon - Sat: 8:00 AM - 5:00 PM' },
              { icon: MapPin, title: 'Location', value: 'South Africa' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-[#111827] rounded-lg border border-gray-800">
                <div className="w-10 h-10 rounded-lg bg-[#0085FF]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[#0085FF]" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} RP Motorcycles. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
