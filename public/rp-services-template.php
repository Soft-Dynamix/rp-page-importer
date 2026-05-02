<?php
/**
 * Template Name: RP Motorcycles Services
 * Description: Premium Services Page for RP Motorcycles
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Services - RP Motorcycles</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #080c14;
            color: #fff;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
        }

        .rp-page {
            min-height: 100vh;
            background: #080c14;
            position: relative;
            overflow-x: hidden;
        }

        /* Background Effects */
        .rp-bg-effects {
            position: fixed;
            inset: 0;
            pointer-events: none;
            overflow: hidden;
            z-index: 0;
        }

        .rp-bg-effects::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 1400px;
            height: 900px;
            background: radial-gradient(ellipse at center, rgba(0,133,255,0.12) 0%, rgba(0,133,255,0.03) 40%, transparent 70%);
        }

        .rp-bg-effects::after {
            content: '';
            position: absolute;
            top: 10%;
            right: 5%;
            width: 600px;
            height: 600px;
            background: rgba(0,133,255,0.04);
            border-radius: 50%;
            filter: blur(120px);
            animation: pulse 8s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }

        /* Hero Section */
        .rp-hero {
            position: relative;
            z-index: 1;
            text-align: center;
            padding: 80px 20px 60px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .rp-badge {
            display: inline-flex;
            align-items: center;
            gap: 16px;
            background: linear-gradient(90deg, rgba(0,133,255,0.15), rgba(0,133,255,0.08), rgba(0,133,255,0.15));
            border: 1px solid rgba(0,133,255,0.25);
            border-radius: 50px;
            padding: 14px 32px;
            margin-bottom: 40px;
            backdrop-filter: blur(10px);
        }

        .rp-badge span {
            color: #0085FF;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            font-size: 14px;
        }

        .rp-title {
            font-family: 'Outfit', sans-serif;
            font-size: clamp(48px, 8vw, 96px);
            font-weight: 900;
            background: linear-gradient(180deg, #fff 0%, #6b7280 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 30px;
            letter-spacing: -0.02em;
            line-height: 1.1;
        }

        .rp-subtitle {
            font-size: clamp(18px, 2.5vw, 24px);
            color: #d1d5db;
            max-width: 800px;
            margin: 0 auto 50px;
            line-height: 1.7;
            font-weight: 300;
        }

        .rp-subtitle strong {
            color: #fff;
            font-weight: 500;
        }

        /* Trust Badges */
        .rp-trust {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            margin-bottom: 60px;
        }

        .rp-trust-item {
            display: flex;
            align-items: center;
            gap: 16px;
            background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 16px;
            padding: 16px 24px;
            transition: all 0.3s ease;
        }

        .rp-trust-item:hover {
            border-color: rgba(0,133,255,0.4);
            transform: translateY(-2px);
            box-shadow: 0 10px 40px rgba(0,133,255,0.1);
        }

        .rp-trust-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #0085FF, #0066cc);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }

        .rp-trust-text h4 {
            font-size: 16px;
            font-weight: 700;
            color: #fff;
            margin: 0;
        }

        .rp-trust-text p {
            font-size: 13px;
            color: #9ca3af;
            margin: 4px 0 0;
        }

        /* Services Grid */
        .rp-services {
            position: relative;
            z-index: 1;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .rp-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
        }

        @media (max-width: 900px) {
            .rp-grid {
                grid-template-columns: 1fr;
            }
        }

        /* Service Card */
        .rp-card {
            background: linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 24px;
            overflow: hidden;
            position: relative;
            transition: all 0.4s ease;
        }

        .rp-card:hover {
            border-color: rgba(0,133,255,0.4);
            transform: translateY(-5px);
            box-shadow: 0 20px 60px rgba(0,133,255,0.15);
        }

        .rp-card.featured {
            grid-column: 1 / -1;
        }

        .rp-card-accent {
            height: 4px;
        }

        .rp-card-image {
            height: 180px;
            position: relative;
            overflow: hidden;
        }

        .rp-card-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.7;
            transition: all 0.5s ease;
        }

        .rp-card:hover .rp-card-image img {
            opacity: 0.9;
            transform: scale(1.05);
        }

        .rp-card-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, #080c14, transparent);
        }

        .rp-card-content {
            padding: 30px;
        }

        .rp-card-icon {
            width: 60px;
            height: 60px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: -60px 0 20px;
            position: relative;
            z-index: 10;
            font-size: 28px;
            border: 3px solid #080c14;
        }

        .rp-card-title {
            font-family: 'Outfit', sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: #fff;
            margin: 0 0 10px;
        }

        .rp-card-desc {
            font-size: 16px;
            color: #8892a0;
            margin: 0 0 25px;
            font-weight: 300;
        }

        .rp-card-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            gap: 10px;
        }

        .rp-card-list.cols-2 {
            grid-template-columns: repeat(2, 1fr);
        }

        .rp-card-list.cols-3 {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 600px) {
            .rp-card-list.cols-2,
            .rp-card-list.cols-3 {
                grid-template-columns: 1fr;
            }
        }

        .rp-card-list li {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 15px;
            color: #d0d4da;
            font-weight: 300;
        }

        .rp-card-list li::before {
            content: '✓';
            width: 24px;
            height: 24px;
            background: rgba(0,133,255,0.15);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: #0085FF;
            flex-shrink: 0;
        }

        /* CTA Section */
        .rp-cta {
            position: relative;
            z-index: 1;
            max-width: 1200px;
            margin: 60px auto 0;
            padding: 0 20px;
        }

        .rp-cta-box {
            background: linear-gradient(135deg, rgba(0,133,255,0.2), rgba(0,133,255,0.05));
            border: 1px solid rgba(0,133,255,0.2);
            border-radius: 24px;
            padding: 60px;
            text-align: center;
        }

        .rp-cta-title {
            font-family: 'Outfit', sans-serif;
            font-size: clamp(32px, 5vw, 48px);
            font-weight: 800;
            background: linear-gradient(180deg, #fff 0%, #9ca3af 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin: 0 0 15px;
        }

        .rp-cta-text {
            font-size: 18px;
            color: #d1d5db;
            margin: 0 0 30px;
        }

        .rp-cta-buttons {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 16px;
        }

        .rp-btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 18px 40px;
            border-radius: 16px;
            font-size: 18px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .rp-btn-primary {
            background: linear-gradient(135deg, #0085FF, #0066cc);
            color: #fff;
            box-shadow: 0 8px 30px rgba(0,133,255,0.3);
        }

        .rp-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(0,133,255,0.4);
        }

        .rp-btn-secondary {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.2);
            color: #fff;
        }

        .rp-btn-secondary:hover {
            background: rgba(255,255,255,0.1);
            border-color: rgba(255,255,255,0.4);
        }

        /* Contact Bar */
        .rp-contact {
            position: relative;
            z-index: 1;
            max-width: 1200px;
            margin: 50px auto;
            padding: 40px 20px;
            border-top: 1px solid rgba(255,255,255,0.1);
        }

        .rp-contact-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
        }

        .rp-contact-item {
            display: flex;
            align-items: center;
            gap: 16px;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 16px;
            padding: 20px 30px;
            min-width: 280px;
        }

        .rp-contact-icon {
            width: 50px;
            height: 50px;
            background: rgba(0,133,255,0.15);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }

        .rp-contact-info h4 {
            font-size: 16px;
            font-weight: 700;
            color: #fff;
            margin: 0;
        }

        .rp-contact-info p {
            font-size: 14px;
            color: #9ca3af;
            margin: 4px 0 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .rp-hero {
                padding: 60px 20px 40px;
            }
            
            .rp-cta-box {
                padding: 40px 20px;
            }
            
            .rp-contact-item {
                min-width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="rp-page">
        <!-- Background Effects -->
        <div class="rp-bg-effects"></div>

        <!-- Hero Section -->
        <section class="rp-hero">
            <div class="rp-badge">
                <span>⭐ Professional Motorcycle Services ⭐</span>
            </div>
            
            <h1 class="rp-title">Our Services</h1>
            
            <p class="rp-subtitle">From routine maintenance to complete engine rebuilds, RP Motorcycles offers comprehensive motorcycle services. Our experienced technicians handle all makes and models with <strong>precision and care</strong>.</p>
            
            <div class="rp-trust">
                <div class="rp-trust-item">
                    <div class="rp-trust-icon">🏆</div>
                    <div class="rp-trust-text">
                        <h4>Expert Technicians</h4>
                        <p>Certified Professionals</p>
                    </div>
                </div>
                <div class="rp-trust-item">
                    <div class="rp-trust-icon">✅</div>
                    <div class="rp-trust-text">
                        <h4>Quality Guaranteed</h4>
                        <p>Workmanship Warranty</p>
                    </div>
                </div>
                <div class="rp-trust-item">
                    <div class="rp-trust-icon">🔧</div>
                    <div class="rp-trust-text">
                        <h4>All Makes & Models</h4>
                        <p>Universal Expertise</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Grid -->
        <section class="rp-services">
            <div class="rp-grid">

                <!-- Core Mechanical Services -->
                <div class="rp-card">
                    <div class="rp-card-accent" style="background: linear-gradient(90deg, transparent, #0085FF, transparent);"></div>
                    <div class="rp-card-image">
                        <img src="https://images.unsplash.com/photo-1486262715615-1e3d50a4c6e6?w=800&q=80" alt="Motorcycle Repair">
                        <div class="rp-card-overlay"></div>
                    </div>
                    <div class="rp-card-content">
                        <div class="rp-card-icon" style="background: linear-gradient(135deg, rgba(0,133,255,0.3), rgba(0,133,255,0.1));">🔧</div>
                        <h3 class="rp-card-title">Core Mechanical Services</h3>
                        <p class="rp-card-desc">Essential maintenance and repairs to keep your motorcycle running smoothly</p>
                        <ul class="rp-card-list cols-2">
                            <li>General repair & servicing</li>
                            <li>Full motorcycle servicing</li>
                            <li>Oil & filter changes</li>
                            <li>Spark plug replacement</li>
                            <li>Air filter cleaning</li>
                            <li>Coolant flush & refill</li>
                            <li>Brake fluid replacement</li>
                            <li>Chain adjustment</li>
                            <li>Belt & shaft servicing</li>
                            <li>Safety checks</li>
                        </ul>
                    </div>
                </div>

                <!-- Diagnostics -->
                <div class="rp-card">
                    <div class="rp-card-accent" style="background: linear-gradient(90deg, transparent, #A855F7, transparent);"></div>
                    <div class="rp-card-image">
                        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="Diagnostics">
                        <div class="rp-card-overlay"></div>
                    </div>
                    <div class="rp-card-content">
                        <div class="rp-card-icon" style="background: linear-gradient(135deg, rgba(168,85,247,0.3), rgba(168,85,247,0.1));">🔍</div>
                        <h3 class="rp-card-title">Diagnostics & Troubleshooting</h3>
                        <p class="rp-card-desc">Advanced diagnostic services to identify and resolve issues</p>
                        <ul class="rp-card-list">
                            <li>Full diagnostic checks</li>
                            <li>Fault finding</li>
                            <li>Performance issues analysis</li>
                            <li>Pre-purchase inspections</li>
                            <li>Roadworthy inspections</li>
                        </ul>
                    </div>
                </div>

                <!-- Engine Services -->
                <div class="rp-card featured">
                    <div class="rp-card-accent" style="background: linear-gradient(90deg, transparent, #F97316, transparent);"></div>
                    <div class="rp-card-image">
                        <img src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80" alt="Engine">
                        <div class="rp-card-overlay"></div>
                    </div>
                    <div class="rp-card-content">
                        <div class="rp-card-icon" style="background: linear-gradient(135deg, rgba(249,115,22,0.3), rgba(249,115,22,0.1));">⚙️</div>
                        <h3 class="rp-card-title">Engine Services</h3>
                        <p class="rp-card-desc">Complete engine repair, rebuild, and performance tuning</p>
                        <ul class="rp-card-list cols-3">
                            <li>Engine fault diagnosis</li>
                            <li>Top-end repairs</li>
                            <li>Bottom-end repairs</li>
                            <li>Full engine rebuild</li>
                            <li>Engine overhaul</li>
                            <li>Cylinder head reconditioning</li>
                            <li>Valve adjustment</li>
                            <li>Piston & ring replacement</li>
                            <li>Crankshaft repair</li>
                            <li>Bearing replacement</li>
                            <li>Gasket & seal replacement</li>
                            <li>Engine tuning</li>
                            <li>Performance builds</li>
                            <li>High-performance cams</li>
                            <li>Carburetor tuning</li>
                        </ul>
                    </div>
                </div>

                <!-- Electrical -->
                <div class="rp-card">
                    <div class="rp-card-accent" style="background: linear-gradient(90deg, transparent, #EAB308, transparent);"></div>
                    <div class="rp-card-image">
                        <img src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80" alt="Electrical">
                        <div class="rp-card-overlay"></div>
                    </div>
                    <div class="rp-card-content">
                        <div class="rp-card-icon" style="background: linear-gradient(135deg, rgba(234,179,8,0.3), rgba(234,179,8,0.1));">⚡</div>
                        <h3 class="rp-card-title">Electrical Services</h3>
                        <p class="rp-card-desc">Complete electrical system diagnosis and repair</p>
                        <ul class="rp-card-list cols-2">
                            <li>Battery testing</li>
                            <li>Charging system repairs</li>
                            <li>Starter motor repairs</li>
                            <li>Wiring repairs</li>
                            <li>Lighting installation</li>
                            <li>Indicator fixes</li>
                        </ul>
                    </div>
                </div>

                <!-- Fuel System -->
                <div class="rp-card">
                    <div class="rp-card-accent" style="background: linear-gradient(90deg, transparent, #22C55E, transparent);"></div>
                    <div class="rp-card-image">
                        <img src="https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&q=80" alt="Fuel System">
                        <div class="rp-card-overlay"></div>
                    </div>
                    <div class="rp-card-content">
                        <div class="rp-card-icon" style="background: linear-gradient(135deg, rgba(34,197,94,0.3), rgba(34,197,94,0.1));">⛽</div>
                        <h3 class="rp-card-title">Fuel System Services</h3>
                        <p class="rp-card-desc">Fuel system maintenance, cleaning, and repair</p>
                        <ul class="rp-card-list">
                            <li>Carburetor cleaning & rebuild</li>
                            <li>Fuel injector cleaning</li>
                            <li>Fuel pump repair</li>
                            <li>Fuel line replacement</li>
                            <li>Tank cleaning</li>
                        </ul>
                    </div>
                </div>

                <!-- Brakes -->
                <div class="rp-card">
                    <div class="rp-card-accent" style="background: linear-gradient(90deg, transparent, #EF4444, transparent);"></div>
                    <div class="rp-card-image">
                        <img src="https://images.unsplash.com/photo-1449426468152-d7713fa16e59?w=800&q=80" alt="Brakes">
                        <div class="rp-card-overlay"></div>
                    </div>
                    <div class="rp-card-content">
                        <div class="rp-card-icon" style="background: linear-gradient(135deg, rgba(239,68,68,0.3), rgba(239,68,68,0.1));">🛡️</div>
                        <h3 class="rp-card-title">Brakes & Safety</h3>
                        <p class="rp-card-desc">Critical brake system services for your safety</p>
                        <ul class="rp-card-list cols-2">
                            <li>Brake pad replacement</li>
                            <li>Brake disc replacement</li>
                            <li>Caliper rebuild</li>
                            <li>Brake bleeding</li>
                        </ul>
                    </div>
                </div>

                <!-- Suspension -->
                <div class="rp-card">
                    <div class="rp-card-accent" style="background: linear-gradient(90deg, transparent, #6366F1, transparent);"></div>
                    <div class="rp-card-image">
                        <img src="https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800&q=80" alt="Suspension">
                        <div class="rp-card-overlay"></div>
                    </div>
                    <div class="rp-card-content">
                        <div class="rp-card-icon" style="background: linear-gradient(135deg, rgba(99,102,241,0.3), rgba(99,102,241,0.1));">🔧</div>
                        <h3 class="rp-card-title">Suspension & Handling</h3>
                        <p class="rp-card-desc">Optimize your ride quality and handling</p>
                        <ul class="rp-card-list">
                            <li>Fork seal replacement</li>
                            <li>Fork rebuilds</li>
                            <li>Shock absorber replacement</li>
                            <li>Suspension tuning</li>
                            <li>Steering head bearing</li>
                        </ul>
                    </div>
                </div>

                <!-- Wheels -->
                <div class="rp-card">
                    <div class="rp-card-accent" style="background: linear-gradient(90deg, transparent, #64748B, transparent);"></div>
                    <div class="rp-card-image">
                        <img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80" alt="Wheels">
                        <div class="rp-card-overlay"></div>
                    </div>
                    <div class="rp-card-content">
                        <div class="rp-card-icon" style="background: linear-gradient(135deg, rgba(100,116,139,0.3), rgba(100,116,139,0.1));">⭕</div>
                        <h3 class="rp-card-title">Wheels & Tyres</h3>
                        <p class="rp-card-desc">Complete wheel and tyre services</p>
                        <ul class="rp-card-list">
                            <li>Tyre fitting & replacement</li>
                            <li>Wheel balancing</li>
                            <li>Spoke tightening</li>
                            <li>Bearing replacement</li>
                        </ul>
                    </div>
                </div>

                <!-- Transmission -->
                <div class="rp-card">
                    <div class="rp-card-accent" style="background: linear-gradient(90deg, transparent, #10B981, transparent);"></div>
                    <div class="rp-card-image">
                        <img src="https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=800&q=80" alt="Transmission">
                        <div class="rp-card-overlay"></div>
                    </div>
                    <div class="rp-card-content">
                        <div class="rp-card-icon" style="background: linear-gradient(135deg, rgba(16,185,129,0.3), rgba(16,185,129,0.1));">⚙️</div>
                        <h3 class="rp-card-title">Transmission & Drivetrain</h3>
                        <p class="rp-card-desc">Keep your power transfer smooth and reliable</p>
                        <ul class="rp-card-list">
                            <li>Clutch replacement</li>
                            <li>Clutch cable adjustment</li>
                            <li>Gearbox repairs</li>
                            <li>Sprocket replacement</li>
                        </ul>
                    </div>
                </div>

                <!-- Exhaust -->
                <div class="rp-card">
                    <div class="rp-card-accent" style="background: linear-gradient(90deg, transparent, #F59E0B, transparent);"></div>
                    <div class="rp-card-image">
                        <img src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80" alt="Exhaust">
                        <div class="rp-card-overlay"></div>
                    </div>
                    <div class="rp-card-content">
                        <div class="rp-card-icon" style="background: linear-gradient(135deg, rgba(245,158,11,0.3), rgba(245,158,11,0.1));">🚀</div>
                        <h3 class="rp-card-title">Exhaust & Performance</h3>
                        <p class="rp-card-desc">Custom exhaust solutions and performance upgrades</p>
                        <ul class="rp-card-list">
                            <li>Exhaust system installation</li>
                            <li>Custom exhaust fabrication</li>
                        </ul>
                    </div>
                </div>

                <!-- Custom Builds -->
                <div class="rp-card">
                    <div class="rp-card-accent" style="background: linear-gradient(90deg, transparent, #EC4899, transparent);"></div>
                    <div class="rp-card-image">
                        <img src="https://images.unsplash.com/photo-1558981033-0f0309284409?w=800&q=80" alt="Custom">
                        <div class="rp-card-overlay"></div>
                    </div>
                    <div class="rp-card-content">
                        <div class="rp-card-icon" style="background: linear-gradient(135deg, rgba(236,72,153,0.3), rgba(236,72,153,0.1));">🎨</div>
                        <h3 class="rp-card-title">Custom Builds & Modifications</h3>
                        <p class="rp-card-desc">Transform your motorcycle with custom modifications</p>
                        <ul class="rp-card-list">
                            <li>Frame modifications</li>
                            <li>LED lighting upgrades</li>
                            <li>Footpeg relocation</li>
                        </ul>
                    </div>
                </div>

                <!-- Performance -->
                <div class="rp-card">
                    <div class="rp-card-accent" style="background: linear-gradient(90deg, transparent, #06B6D4, transparent);"></div>
                    <div class="rp-card-image">
                        <img src="https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800&q=80" alt="Performance">
                        <div class="rp-card-overlay"></div>
                    </div>
                    <div class="rp-card-content">
                        <div class="rp-card-icon" style="background: linear-gradient(135deg, rgba(6,182,212,0.3), rgba(6,182,212,0.1));">✨</div>
                        <h3 class="rp-card-title">Performance Upgrades</h3>
                        <p class="rp-card-desc">Unlock your motorcycle's full potential</p>
                        <ul class="rp-card-list">
                            <li>Air intake upgrades</li>
                            <li>Throttle upgrade</li>
                        </ul>
                    </div>
                </div>

                <!-- Restoration -->
                <div class="rp-card">
                    <div class="rp-card-accent" style="background: linear-gradient(90deg, transparent, #D97706, transparent);"></div>
                    <div class="rp-card-image">
                        <img src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80" alt="Restoration">
                        <div class="rp-card-overlay"></div>
                    </div>
                    <div class="rp-card-content">
                        <div class="rp-card-icon" style="background: linear-gradient(135deg, rgba(217,119,6,0.3), rgba(217,119,6,0.1));">🔄</div>
                        <h3 class="rp-card-title">Restoration Services</h3>
                        <p class="rp-card-desc">Bring classic motorcycles back to life</p>
                        <ul class="rp-card-list">
                            <li>Full bike restoration</li>
                            <li>Vintage motorcycle restoration</li>
                            <li>Engine restoration</li>
                            <li>Parts refurbishment</li>
                        </ul>
                    </div>
                </div>

                <!-- Workshop -->
                <div class="rp-card">
                    <div class="rp-card-accent" style="background: linear-gradient(90deg, transparent, #14B8A6, transparent);"></div>
                    <div class="rp-card-image">
                        <img src="https://images.unsplash.com/photo-1486262715615-1e3d50a4c6e6?w=800&q=80" alt="Workshop">
                        <div class="rp-card-overlay"></div>
                    </div>
                    <div class="rp-card-content">
                        <div class="rp-card-icon" style="background: linear-gradient(135deg, rgba(20,184,166,0.3), rgba(20,184,166,0.1));">📦</div>
                        <h3 class="rp-card-title">General Workshop Services</h3>
                        <p class="rp-card-desc">Comprehensive workshop services for all needs</p>
                        <ul class="rp-card-list">
                            <li>Bike assembly</li>
                            <li>Accident repairs</li>
                            <li>Insurance assessments</li>
                            <li>Parts sourcing</li>
                            <li>Accessory installation</li>
                        </ul>
                    </div>
                </div>

                <!-- Accessories -->
                <div class="rp-card featured">
                    <div class="rp-card-accent" style="background: linear-gradient(90deg, transparent, #8B5CF6, transparent);"></div>
                    <div class="rp-card-image">
                        <img src="https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800&q=80" alt="Accessories">
                        <div class="rp-card-overlay"></div>
                    </div>
                    <div class="rp-card-content">
                        <div class="rp-card-icon" style="background: linear-gradient(135deg, rgba(139,92,246,0.3), rgba(139,92,246,0.1));">🧩</div>
                        <h3 class="rp-card-title">Accessories & Add-Ons</h3>
                        <p class="rp-card-desc">Enhance your motorcycle with quality accessories and upgrades</p>
                        <ul class="rp-card-list cols-3">
                            <li>Crash bars & engine guards</li>
                            <li>Panniers & top box fitting</li>
                            <li>Windshield installation</li>
                            <li>Handlebar grips & mirrors</li>
                            <li>LED light kits</li>
                            <li>Phone mounts & GPS</li>
                            <li>Tank pads & protectors</li>
                            <li>Handguards</li>
                            <li>Seat upgrades</li>
                            <li>Exhaust heat shields</li>
                            <li>Radiator guards</li>
                            <li>Frame sliders</li>
                        </ul>
                    </div>
                </div>

                <!-- Business Services -->
                <div class="rp-card featured">
                    <div class="rp-card-accent" style="background: linear-gradient(90deg, transparent, #0EA5E9, transparent);"></div>
                    <div class="rp-card-image">
                        <img src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80" alt="Business">
                        <div class="rp-card-overlay"></div>
                    </div>
                    <div class="rp-card-content">
                        <div class="rp-card-icon" style="background: linear-gradient(135deg, rgba(14,165,233,0.3), rgba(14,165,233,0.1));">💼</div>
                        <h3 class="rp-card-title">Business Services</h3>
                        <p class="rp-card-desc">Convenient services designed for busy riders</p>
                        <ul class="rp-card-list cols-3">
                            <li>Pickup & delivery service</li>
                            <li>Mobile mechanic services</li>
                            <li>Breakdown assistance</li>
                            <li>Warranty on repairs</li>
                            <li>Consultation & advice</li>
                        </ul>
                    </div>
                </div>

            </div>
        </section>

        <!-- CTA Section -->
        <section class="rp-cta">
            <div class="rp-cta-box">
                <h2 class="rp-cta-title">Ready to Get Started?</h2>
                <p class="rp-cta-text">Contact us for a free quote. Professional pickup & delivery service available.</p>
                <div class="rp-cta-buttons">
                    <a href="/contact" class="rp-btn rp-btn-primary">📞 Get a Quote</a>
                    <a href="/contact" class="rp-btn rp-btn-secondary">Contact Us</a>
                </div>
            </div>
        </section>

        <!-- Contact Bar -->
        <section class="rp-contact">
            <div class="rp-contact-grid">
                <div class="rp-contact-item">
                    <div class="rp-contact-icon">📞</div>
                    <div class="rp-contact-info">
                        <h4>Call Us</h4>
                        <p>Contact us for bookings</p>
                    </div>
                </div>
                <div class="rp-contact-item">
                    <div class="rp-contact-icon">🕐</div>
                    <div class="rp-contact-info">
                        <h4>Working Hours</h4>
                        <p>Mon - Sat: 8:00 AM - 5:00 PM</p>
                    </div>
                </div>
                <div class="rp-contact-item">
                    <div class="rp-contact-icon">📍</div>
                    <div class="rp-contact-info">
                        <h4>Location</h4>
                        <p>South Africa</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</body>
</html>
