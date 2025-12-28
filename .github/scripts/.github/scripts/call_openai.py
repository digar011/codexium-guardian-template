#!/usr/bin/env python3
"""
Codexium V4 - OpenAI API caller
Handles JSON encoding properly without bash escaping issues
"""
import os
import sys
import json

try:
    from urllib import request
    from urllib.error import HTTPError
except ImportError:
    import urllib.request as request
    from urllib.error import HTTPError

def main():
    # Read prompt from file
    with open('/tmp/prompt_final.txt', 'r') as f:
        prompt_text = f.read()
    
    # Get API key from environment
    api_key = os.environ.get('OPENAI_API_KEY')
    if not api_key:
        print("❌ OPENAI_API_KEY not found in environment")
        sys.exit(1)
    
    # Build payload
    payload = {
        "model": "gpt-4-turbo-2024-04-09",
        "messages": [
            {
                "role": "system",
                "content": "You are Codexium V4, an AI code reviewer. Be concise, specific, and constructive."
            },
            {
                "role": "user",
                "content": prompt_text
            }
        ],
        "temperature": 0.3,
        "max_tokens": 1500
    }
    
    # Make API request
    req = request.Request(
        'https://api.openai.com/v1/chat/completions',
        data=json.dumps(payload).encode('utf-8'),
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
    )
    
    try:
        with request.urlopen(req) as response:
            result = json.loads(response.read())
            review_text = result['choices'][0]['message']['content']
            
            # Save to file
            with open('/tmp/review.txt', 'w') as f:
                f.write(review_text)
            
            print("✅ Review completed successfully")
            return 0
            
    except HTTPError as e:
        error_body = e.read().decode('utf-8')
        print(f"❌ OpenAI API Error:", file=sys.stderr)
        print(error_body, file=sys.stderr)
        return 1
    except Exception as e:
        print(f"❌ Unexpected error: {e}", file=sys.stderr)
        return 1

if __name__ == '__main__':
    sys.exit(main())
