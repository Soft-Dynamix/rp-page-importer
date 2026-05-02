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
  Truck,
  ChevronDown,
  Phone,
  MapPin,
  Clock,
  Mail,
  Menu,
  X
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

// Service categories with icons
const serviceCategories = [
  {
    id: 'core-mechanical',
    title: 'Core Mechanical Services',
    icon: Wrench,
    color: 'from-orange-500 to-amber-500',
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
    color: 'from-purple-500 to-violet-500',
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
    color: 'from-red-500 to-rose-500',
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
    color: 'from-yellow-500 to-amber-400',
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
    color: 'from-green-500 to-emerald-500',
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
    color: 'from-red-600 to-red-500',
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
    color: 'from-cyan-500 to-teal-500',
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
    color: 'from-slate-500 to-gray-500',
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
    color: 'from-zinc-600 to-zinc-500',
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
    color: 'from-orange-600 to-orange-500',
    services: [
      'Exhaust system installation',
      'Custom exhaust fabrication'
    ]
  },
  {
    id: 'custom',
    title: 'Custom Builds & Modifications',
    icon: Paintbrush,
    color: 'from-pink-500 to-rose-400',
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
    color: 'from-indigo-500 to-purple-500',
    services: [
      'Air intake upgrades',
      'Throttle upgrade'
    ]
  },
  {
    id: 'restoration',
    title: 'Restoration Services',
    icon: RotateCcw,
    color: 'from-amber-600 to-yellow-500',
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
    icon: Package,
    color: 'from-violet-500 to-purple-400',
    services: [
      'Crash bars installation'
    ]
  },
  {
    id: 'business',
    title: 'Business Services',
    icon: Briefcase,
    color: 'from-emerald-500 to-green-400',
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Bike className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">RP Motorcycles</h1>
                <p className="text-xs text-gray-400">Expert Motorcycle Services</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-gray-300 hover:text-orange-400 transition-colors">Services</a>
              <a href="#contact" className="text-gray-300 hover:text-orange-400 transition-colors">Contact</a>
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                <Phone className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-300 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-gray-700/50 pt-4 flex flex-col gap-3">
              <a href="#services" className="text-gray-300 hover:text-orange-400 transition-colors py-2">Services</a>
              <a href="#contact" className="text-gray-300 hover:text-orange-400 transition-colors py-2">Contact</a>
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white w-full">
                <Phone className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/30">
              Professional Motorcycle Workshop
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Expert Motorcycle{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Services
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              From routine maintenance to full engine rebuilds, we provide comprehensive motorcycle services with expertise you can trust.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                <Phone className="w-5 h-5 mr-2" />
                Get a Quote
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                View All Services
                <ChevronDown className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gray-700/50 text-gray-300 border-gray-600">
            Our Expertise
          </Badge>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Complete Motorcycle Services
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We offer a full range of motorcycle services to keep your bike running at its best. Click on any category to see our detailed offerings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((category) => {
            const Icon = category.icon
            return (
              <Card 
                key={category.id}
                className={`bg-gray-800/50 border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 group ${
                  category.highlight ? 'ring-2 ring-orange-500/30' : ''
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        {category.title}
                        {category.highlight && (
                          <Badge className="bg-orange-500/20 text-orange-300 text-xs border-orange-500/30">
                            High Value
                          </Badge>
                        )}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {category.subsections ? (
                    <div className="space-y-4">
                      {category.subsections.map((subsection, idx) => (
                        <div key={idx}>
                          <h4 className="text-sm font-semibold text-orange-400 mb-2">{subsection.title}</h4>
                          <ul className="space-y-1.5">
                            {subsection.items.map((service, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-red-500 mt-1.5 flex-shrink-0"></div>
                                {service}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {category.services?.map((service, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-red-500 mt-1.5 flex-shrink-0"></div>
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
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Your Motorcycle Serviced?
          </h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today for a free quote. We offer pickup & delivery services and mobile mechanic options.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              <Phone className="w-5 h-5 mr-2" />
              Call Us Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Mail className="w-5 h-5 mr-2" />
              Send a Message
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gray-700/50 text-gray-300 border-gray-600">
              Get In Touch
            </Badge>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Contact RP Motorcycles
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="pt-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">Phone</h4>
                <p className="text-gray-400 text-sm">Call us for bookings</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="pt-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">Location</h4>
                <p className="text-gray-400 text-sm">South Africa</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardContent className="pt-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">Hours</h4>
                <p className="text-gray-400 text-sm">Mon - Sat: 8AM - 5PM</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Bike className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">RP Motorcycles</p>
                <p className="text-xs text-gray-500">Expert Motorcycle Services</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} RP Motorcycles. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
