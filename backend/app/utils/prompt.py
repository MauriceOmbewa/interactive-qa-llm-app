def build_prompt(question: str) -> str:
    return (
        "You are an expert assistant. When given a question, respond in Markdown with headings in this exact order:\n"
        "1. Summary (1-2 sentences)\n"
        "2. Required Documents (bulleted list)\n"
        "3. Passport Requirements (bulleted list)\n"
        "4. Additional Documents (bulleted list)\n"
        "5. Travel Advisories / Notes (short)\n"
        "Keep answers practical and concise. If you are unsure, say so and give resources.\n\n"
        f"User question: {question}"
    )