# LLM Prompt Documentation

This document provides detailed information about the prompts used in the Interactive Q&A LLM App for generating structured, consistent responses from the Google Gemini API.

## Overview

The application uses a sophisticated prompt engineering approach to ensure the AI assistant provides consistent, well-formatted responses specifically focused on international travel documentation requirements.

## Prompt Structure

### Location
The main prompt template is defined in: `backend/app/utils/prompt.py`

### Function: `build_prompt(question: str, chat_history=None) -> str`

## System Prompt Components

### 1. Role Definition
```
You are an expert assistant specializing in international travel documentation. 
You only answer questions related to travel document requirements for visiting a country, 
including passports, visas, supporting paperwork, and travel advisories.
```

**Purpose**: Establishes the AI's expertise domain and scope limitations.

### 2. Scope Limitations
```
You must politely refuse unrelated questions, except for relevant meta-questions such as 
'What can you do?' or 'How do I use this?', which you should answer in the context of travel documentation.
```

**Purpose**: Prevents off-topic responses while allowing helpful meta-questions.

### 3. Response Quality Guidelines
```
Your goal is to provide factual, clear, and structured answers, avoiding speculation, 
and directing the user to official embassy or government resources when unsure.
```

**Purpose**: Ensures accuracy and reliability of information provided.

### 4. Structured Response Format
```
When given a valid travel-related question, respond in Markdown with headings in this exact order:
1. Summary (1–2 sentences)
2. Required Documents (bulleted list)
3. Passport Requirements (bulleted list)
4. Additional Documents (bulleted list)
5. Travel Advisories / Notes (short)
If a section does not apply, write 'None' or 'Not applicable'.
```

**Purpose**: Ensures consistent, scannable response format for users.

### 5. Meta-Question Handling
```
If the user asks what you can do, respond that you specialize in providing accurate, 
country-specific travel document requirements in the above format, and explain how they 
can ask for requirements by specifying the destination, nationality, and purpose of travel.

If the user asks how to use you, explain that they should simply ask about any country 
they want to visit, and optionally provide details like purpose of travel, nationality, 
and length of stay for more precise information.
```

**Purpose**: Provides helpful guidance for new users.

### 6. Off-Topic Request Handling
```
If the user requests something outside your scope (e.g., writing a poem), politely refuse 
and remind them you only assist with travel documentation requirements.
```

**Purpose**: Maintains focus while being polite to users.

## Chat History Integration

### Context Window
- **Size**: Last 6 messages from conversation history
- **Format**: "User: [message]" and "Assistant: [response]"
- **Purpose**: Maintains conversation context for follow-up questions

### Implementation
```python
if chat_history:
    context = "Previous conversation:\n"
    for msg in chat_history[-6:]:  # Last 6 messages for context
        role = "User" if msg.role == "user" else "Assistant"
        context += f"{role}: {msg.content}\n"
    context += "\n"
    system_prompt += context
```

## Final Prompt Assembly

The complete prompt sent to Gemini API consists of:
1. **System Prompt** (role, guidelines, format requirements)
2. **Chat History** (if available, last 6 messages)
3. **Current Question** (`Current question: {question}`)

## Example Prompts

### Basic Travel Question
```
You are an expert assistant specializing in international travel documentation...
[full system prompt]

Current question: What documents do I need to travel from Kenya to Ireland?
```

### With Chat History
```
You are an expert assistant specializing in international travel documentation...
[full system prompt]

Previous conversation:
User: What documents do I need to travel from Kenya to Ireland?
Assistant: # Summary
Irish visa requirements for Kenyan citizens...
User: How long does the visa process take?

Current question: What about transit visas?
```

## Response Format Examples

### Successful Response
```markdown
# Summary
Irish visa requirements for Kenyan citizens include a valid passport and tourist visa.

## Required Documents
- Valid Kenyan passport (minimum 6 months validity)
- Completed visa application form
- Recent passport photographs
- Proof of accommodation in Ireland

## Passport Requirements
- Must be valid for at least 6 months beyond intended stay
- Must have at least 2 blank pages for stamps
- Original passport required for application

## Additional Documents
- Bank statements (last 3 months)
- Employment letter or proof of income
- Travel insurance covering €30,000
- Return flight tickets

## Travel Advisories / Notes
Apply at least 4-6 weeks before travel. Processing time is typically 10-15 working days.
```

### Off-Topic Response
```markdown
I specialize in providing information about international travel documentation requirements, 
including passports, visas, and supporting paperwork. I cannot assist with writing poems 
or other non-travel related requests.

Please ask me about travel document requirements for any country you plan to visit!
```

## API Configuration

### Gemini API Settings
- **Model**: `gemini-1.5-flash`
- **Max Output Tokens**: 700
- **Temperature**: 0.7
- **Timeout**: 30 seconds

### Token Optimization
The 700-token limit ensures:
- Concise, focused responses
- Faster API response times
- Cost-effective API usage
- Consistent response length

## Prompt Engineering Best Practices Applied

1. **Clear Role Definition**: Establishes expertise and boundaries
2. **Structured Output**: Consistent markdown formatting
3. **Context Awareness**: Chat history integration
4. **Error Handling**: Graceful handling of off-topic requests
5. **User Guidance**: Meta-question support for better UX
6. **Factual Accuracy**: Emphasis on official sources and avoiding speculation
7. **Scalability**: Easy to modify for different domains

## Testing the Prompts

### Recommended Test Cases

1. **Valid Travel Questions**:
   - "What documents do I need to travel from Kenya to Ireland?"
   - "Visa requirements for US citizens visiting Japan"
   - "Passport requirements for Germany"

2. **Meta Questions**:
   - "What can you do?"
   - "How do I use this service?"

3. **Off-Topic Questions**:
   - "Write me a poem"
   - "What's the weather like?"
   - "Help me with math homework"

4. **Follow-up Questions**:
   - After initial response: "How long does processing take?"
   - "What about transit visas?"

## Maintenance and Updates

### When to Update Prompts
- Changes in travel regulations
- User feedback indicating confusion
- Need for additional response sections
- Performance optimization requirements

### Version Control
All prompt changes should be:
- Documented in git commits
- Tested with sample questions
- Reviewed for consistency with existing format

## Performance Metrics

### Success Indicators
- Consistent response format adherence
- Appropriate handling of off-topic requests
- Relevant context usage from chat history
- User satisfaction with response quality

### Monitoring
- Track API response times
- Monitor token usage efficiency
- Collect user feedback on response quality
- Analyze conversation flow patterns