
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CLAUDE_API_KEY = Deno.env.get('CLAUDE_API_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      throw new Error('URL is required');
    }

    // Clean and normalize the URL
    let cleanUrl = url.trim(); // Remove any whitespace
    
    // Add https:// if missing
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }
    
    console.log(`Analyzing website: ${cleanUrl}`);

    // Fetch website content
    let html = '';
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      const response = await fetch(cleanUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        redirect: 'follow',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch website: ${response.status} ${response.statusText}`);
      }
      
      html = await response.text();
      console.log(`Successfully fetched website content (${html.length} characters)`);
      
      // Limit HTML size to prevent large requests to Claude
      if (html.length > 20000) {
        html = html.substring(0, 20000);
        console.log("HTML content truncated to 20,000 characters");
      }
    } catch (fetchError) {
      console.error('Error fetching website content:', fetchError);
      throw new Error(`Failed to fetch website content: ${fetchError.message}`);
    }

    // Call Claude API with proper API version and format
    try {
      console.log('Calling Claude API with correct configuration...');
      const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: "claude-3-7-sonnet-20250219",
          max_tokens: 2000,
          messages: [{
            role: "user",
            content: `You are a professional website analyst. Analyze this website's HTML and provide a detailed assessment including:
            1. Basic information (company name, contact details if found)
            2. Design evaluation (layout, colors, responsiveness)
            3. Content quality
            4. Technical aspects
            5. Specific improvement suggestions
            
            Format the response as a JSON object with these properties:
            {
              "score": number (0-100),
              "companyInfo": { "name": string, "contact": string, "address": string },
              "design": { "score": number, "feedback": string[] },
              "content": { "score": number, "feedback": string[] },
              "technical": { "score": number, "feedback": string[] },
              "improvements": string[]
            }
            
            HTML to analyze:
            ${html}`
          }]
        })
      });

      if (!claudeResponse.ok) {
        const errorText = await claudeResponse.text();
        console.error('Claude API error response:', errorText);
        throw new Error(`Claude API error: ${claudeResponse.status} ${claudeResponse.statusText}. Details: ${errorText}`);
      }

      const claudeData = await claudeResponse.json();
      console.log('Claude API response received:', JSON.stringify(claudeData).substring(0, 200) + '...');

      // Parse Claude's response - updated to match Claude 3.7 response format
      if (!claudeData.content || !Array.isArray(claudeData.content) || claudeData.content.length === 0) {
        console.error('Invalid Claude API response format:', JSON.stringify(claudeData));
        throw new Error('Invalid Claude API response format: missing content array');
      }
        
      const content = claudeData.content[0];
      if (!content || !content.text) {
        console.error('Invalid Claude API response format:', JSON.stringify(claudeData.content));
        throw new Error('Invalid Claude API response format: missing text in content');
      }
        
      const textContent = content.text;
      
      // Extract JSON from the response
      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('Full Claude response:', textContent);
        throw new Error('Could not find JSON in Claude response');
      }
        
      const jsonString = jsonMatch[0];
      console.log('Extracted JSON:', jsonString.substring(0, 200) + '...');
        
      try {
        const analysis = JSON.parse(jsonString);
        console.log('Successfully parsed analysis JSON');
          
        return new Response(JSON.stringify(analysis), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError, 'Response JSON string:', jsonString);
        throw new Error(`Failed to parse Claude response as JSON: ${jsonError.message}`);
      }
    } catch (claudeError) {
      console.error('Error calling Claude API:', claudeError);
      throw new Error(`Claude API error: ${claudeError.message}`);
    }
  } catch (error) {
    console.error('Error in analyze-website function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      errorType: error.name || 'Unknown',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
