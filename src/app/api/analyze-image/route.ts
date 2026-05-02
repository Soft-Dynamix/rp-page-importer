import ZAI from 'z-ai-web-dev-sdk';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { imageUrl, serviceName } = await request.json();
    
    const zai = await ZAI.create();
    
    const response = await zai.chat.completions.createVision({
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this image for a motorcycle service business. 
              
              Service name: "${serviceName}"
              
              Questions:
              1. Is this image showing a motorcycle or motorcycle parts? (yes/no)
              2. What specifically does this image show?
              3. Does it match the service "${serviceName}"? (yes/no)
              4. If no, what type of image would be better?
              
              Respond in JSON format:
              {
                "isMotorcycle": true/false,
                "description": "description of image",
                "matchesService": true/false,
                "suggestion": "better image suggestion if needed"
              }`
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl
              }
            }
          ]
        }
      ],
      thinking: { type: 'disabled' }
    });

    return NextResponse.json({
      success: true,
      analysis: response.choices[0]?.message?.content
    });
  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
