import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const serviceImages = [
  {
    filename: 'core-mechanical.png',
    prompt: 'Professional motorcycle mechanic working on engine repair in modern workshop, tools on workbench, dramatic lighting, high quality professional photography, dark moody atmosphere'
  },
  {
    filename: 'diagnostics.png',
    prompt: 'Motorcycle diagnostic computer scanner testing engine, digital display showing data, professional workshop, modern technology, blue LED lighting, high quality'
  },
  {
    filename: 'engine.png',
    prompt: 'Motorcycle engine being rebuilt by mechanic, detailed engine parts exposed, professional workshop, hands working on pistons and cylinders, dramatic lighting'
  },
  {
    filename: 'electrical.png',
    prompt: 'Motorcycle electrical system wiring, mechanic working on motorcycle electronics, illuminated wires and connections, professional workshop lighting, high quality'
  },
  {
    filename: 'fuel-system.png',
    prompt: 'Motorcycle carburetor being cleaned, fuel system components, mechanic hands working, professional workshop, detailed close-up, high quality photography'
  },
  {
    filename: 'brakes.png',
    prompt: 'Motorcycle brake caliper and disc brake being serviced, mechanic hands working, safety focus, professional workshop, dramatic close-up, high quality'
  },
  {
    filename: 'suspension.png',
    prompt: 'Motorcycle front fork suspension being rebuilt, mechanic working on forks, professional workshop, detailed mechanical work, high quality photography'
  },
  {
    filename: 'wheels.png',
    prompt: 'Motorcycle wheel being fitted with new tire, wheel balancing machine, professional workshop, detailed close-up of tire and rim, high quality'
  },
  {
    filename: 'transmission.png',
    prompt: 'Motorcycle chain and sprocket being serviced, drivetrain components, mechanic hands adjusting chain, professional workshop, high quality photography'
  },
  {
    filename: 'exhaust.png',
    prompt: 'Custom motorcycle exhaust system being installed, chrome exhaust pipes, professional workshop, dramatic lighting, high quality photography'
  },
  {
    filename: 'custom.png',
    prompt: 'Custom motorcycle build in progress, modified frame, custom parts, professional workshop, creative modifications, high quality photography'
  },
  {
    filename: 'performance.png',
    prompt: 'High performance motorcycle engine tuning, performance parts, air intake upgrade, professional workshop, dynamic lighting, high quality'
  },
  {
    filename: 'restoration.png',
    prompt: 'Classic vintage motorcycle restoration project, old motorcycle being restored to pristine condition, professional workshop, nostalgic feel, high quality'
  },
  {
    filename: 'workshop.png',
    prompt: 'Professional motorcycle workshop interior, multiple motorcycles being serviced, mechanics at work, modern well-equipped garage, high quality photography'
  },
  {
    filename: 'accessories.png',
    prompt: 'Motorcycle accessories installation, panniers and crash bars being fitted, various motorcycle accessories displayed, professional workshop, high quality'
  },
  {
    filename: 'business.png',
    prompt: 'Motorcycle pickup service, delivery van with motorcycle, professional service, customer service concept, modern business, high quality photography'
  }
];

async function generateAllImages() {
  const outputDir = './public/images/services';
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const zai = await ZAI.create();
  
  console.log(`\n🚀 Starting image generation for ${serviceImages.length} service categories...\n`);
  
  for (let i = 0; i < serviceImages.length; i++) {
    const { filename, prompt } = serviceImages[i];
    const outputPath = path.join(outputDir, filename);
    
    console.log(`[${i + 1}/${serviceImages.length}] Generating: ${filename}`);
    console.log(`   Prompt: ${prompt.substring(0, 60)}...`);
    
    try {
      const response = await zai.images.generations.create({
        prompt: prompt,
        size: '1344x768'
      });
      
      const imageBase64 = response.data[0].base64;
      const buffer = Buffer.from(imageBase64, 'base64');
      fs.writeFileSync(outputPath, buffer);
      
      console.log(`   ✅ Saved: ${outputPath}\n`);
      
      // Wait between requests to avoid rate limiting
      if (i < serviceImages.length - 1) {
        console.log('   ⏳ Waiting 5 seconds before next request...\n');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error: any) {
      console.error(`   ❌ Failed: ${error.message}\n`);
      
      // Wait longer if rate limited
      if (error.message?.includes('429')) {
        console.log('   ⏳ Rate limited - waiting 30 seconds...\n');
        await new Promise(resolve => setTimeout(resolve, 30000));
        // Retry this image
        i--;
      }
    }
  }
  
  console.log('\n✨ Image generation complete!\n');
}

generateAllImages().catch(console.error);
