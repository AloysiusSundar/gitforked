---
title: "AI-Generated Text Detector & Attribution"
description: "Analytics pipeline and deterministic top-k probability gap scoring engine to distinguish human-written text from AI-generated content."
date: 2024-03-15
url: "https://huggingface.co/spaces/AloysiusJoy/TextDetector"
github: "https://github.com/AloysiusSundar"
tags: ["Python", "NLP", "HuggingFace", "Transformers", "Statistics"]
featured: true
---

A data-driven analytics pipeline built and hosted on Hugging Face Spaces to analyze attribution patterns across multiple language models.

## Key Architecture
- **Probability Gap Analysis:** Designed a deterministic confidence-scoring mechanism utilizing top-k probability gap analysis.
- **False-Positive Minimization:** Gracefully handles ambiguous inputs and strictly minimizes false-positive classifications.
