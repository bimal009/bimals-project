import subprocess

def build_prompt(matches, recipient):
    # Map urgency numbers to descriptive text for better LLM understanding
    urgency_map = {
        1: "Very Low (routine/elective)",
        2: "Low (can wait several months)", 
        3: "Moderate (within weeks to months)",
        4: "High (within days to weeks)",
        5: "Critical/Emergency (immediate need)"
    }
    
    urgency_level = recipient.get('urgency', 'unknown')
    urgency_desc = urgency_map.get(urgency_level, f"Level {urgency_level}") if urgency_level != 'unknown' else 'unknown'
    
    prompt = f"""You are a medical expert specializing in organ transplant matching. Please rank the following organ donors for optimal transplant success.

RECIPIENT PROFILE:
- Organ needed: {recipient['organ_needed']}
- Blood type: {recipient['blood_type']}
- Urgency level: {urgency_desc}

RANKING CRITERIA (in order of importance):
1. Blood type compatibility (most critical)
2. Health status of donor (excellent > good > fair > poor)
3. Geographic distance (closer is better for organ viability)
4. Urgency level consideration (higher urgency may justify slightly longer distances)

AVAILABLE DONORS:
"""
    
    for i, (m, dist) in enumerate(matches):
        prompt += f"{i+1}. {m['name']}\n"
        prompt += f"   - Blood Type: {m['blood_type']}\n"
        prompt += f"   - Health Status: {m['health_status']}\n"
        prompt += f"   - Distance: {dist:.1f} km\n"
        prompt += f"   - Location: {m.get('city', 'Unknown location')}\n\n"
    
    prompt += """Please provide:
1. A ranked list (1st choice, 2nd choice, etc.) with brief reasoning
2. Any compatibility concerns or red flags
3. Special considerations based on the urgency level
4. Final recommendation with rationale

Format your response clearly with the ranking at the top, followed by your analysis."""
    
    return prompt


def query_deepseek(prompt):
    try:
        # Prepare the command with better parameters for consistent output
        cmd = [
            'ollama', 'run', 
            'deepseek-r1:7b',
           
            prompt
        ]

        # Run the command with UTF-8 output handling
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='replace',
            timeout=60  # Add timeout to prevent hanging
        )

        if result.returncode != 0:
            error_msg = result.stderr.strip() if result.stderr else "Unknown error"
            return f"[ERROR] Ollama failed (exit code {result.returncode}): {error_msg}"

        output = result.stdout.strip()
        if not output:
            return "[ERROR] Ollama returned empty response"
            
        return output

    except subprocess.TimeoutExpired:
        return "[ERROR] Ollama query timed out after 60 seconds"
    except FileNotFoundError:
        return "[ERROR] Ollama not found. Please ensure Ollama is installed and in your PATH"
    except Exception as e:
        return f"[EXCEPTION] Failed to query DeepSeek via Ollama: {str(e)}"


# Optional: Add a function to parse and structure the LLM response
def parse_llm_response(response):
    """
    Parse the LLM response to extract structured ranking information
    """
    if response.startswith('[ERROR]') or response.startswith('[EXCEPTION]'):
        return {
            'error': True,
            'message': response,
            'ranking': [],
            'analysis': response
        }
    
    # Simple parsing - you could make this more sophisticated
    lines = response.split('\n')
    ranking_section = []
    analysis_section = []
    
    in_ranking = True
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Look for numbered rankings
        if line[0].isdigit() and ('.' in line or ')' in line):
            ranking_section.append(line)
        else:
            if ranking_section:  # We've moved past ranking
                in_ranking = False
            if not in_ranking:
                analysis_section.append(line)
    
    return {
        'error': False,
        'ranking': ranking_section,
        'analysis': '\n'.join(analysis_section),
        'full_response': response
    }