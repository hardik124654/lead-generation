import { GoogleGenAI, Type, GenerateContentResponse } from '@google/genai';
import { Lead } from '../types';

export const generateLeads = async (subject: string, quantity: number, category: string): Promise<Lead[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const leadSchema = {
    type: Type.OBJECT,
    properties: {
      companyName: { type: Type.STRING, description: 'The name of the company.' },
      productOrService: { type: Type.STRING, description: 'A brief, one-sentence description of the company\'s main product or service.' },
      aboutCompany: { type: Type.STRING, description: 'A short paragraph about the company.' },
      detailedProductInfo: { type: Type.STRING, description: 'More detailed information about the company\'s key products or services.' },
      address: { type: Type.STRING, description: 'The full physical address of the company.' },
      city: { type: Type.STRING, description: 'The city where the company is located, extracted from the address.' },
      email: { type: Type.STRING, description: 'A primary contact email address for the company. Any available email will do.' },
      secondaryEmail: { type: Type.STRING, description: 'A secondary contact email address if available (e.g., support, sales). Use "N/A" if not found.' },
      mobileNumber: { type: Type.STRING, description: 'A contact mobile or phone number for the company.' },
    },
    required: ['companyName', 'productOrService', 'aboutCompany', 'detailedProductInfo', 'address', 'city', 'email', 'secondaryEmail', 'mobileNumber'],
  };

  const categoryInstruction = (category && category.toLowerCase() !== 'any') 
    ? ` The companies must be in the "${category}" industry or category.` 
    : '';

  const prompt = `
    You are a world-class lead generation expert. Your task is to find and list companies related to the following subject: "${subject}".${categoryInstruction}
    For each company you find, provide the following details:
    1. Company Name: The official name of the company.
    2. About Company: A short paragraph describing the company, its mission, or history.
    3. Product or Service: A brief, one-sentence description of their main product or service.
    4. Detailed Product Info: More detailed information about their key products or services.
    5. Address: The company's full physical address.
    6. City: The city from the address.
    7. Email: A primary contact email address. Find any available email.
    8. Secondary Email: A second contact email if one can be found (e.g., info@, sales@, support@).
    9. Mobile Number: A contact mobile or phone number.

    If a specific piece of information (like email or mobile number) is not publicly available, you must specify "N/A".
    Return a list of exactly ${quantity} companies. If you cannot find that many, return as many as you can find.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: leadSchema,
        },
      },
    });
    
    const responseText = response.text.trim();
    if (!responseText) {
        throw new Error("Received an empty response from the AI. The model may not have found relevant leads.");
    }

    const leads: Lead[] = JSON.parse(responseText);
    return leads;
  } catch (error) {
    console.error('Gemini API call failed:', error);
    throw new Error('Failed to generate leads from AI. Please check the console for more details.');
  }
};
