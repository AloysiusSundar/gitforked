---
title: "ProtoGPT"
description: "Generative LLM implementing Post-Layer Normalization based on 'Attention is All You Need'. Designed for next-token prediction experimentations."
date: 2024-01-15
github: "https://github.com/AloysiusSundar/protogpt"
tags: ["Python", "PyTorch", "Transformers", "LLM"]
featured: true
---

ProtoGPT applies normalization after each attention layer to enhance training stability. The model is designed to generate text and predict the next token in a sequence, offering a practical approach to understanding and implementing foundational techniques in generative language modeling.

## Architecture Features
- Post-Layer Normalization (GPT-2/3 style)
- Multi-Head Self Attention mechanism
- Positional Encoding & Causal Masking
- Custom PyTorch Training Pipeline
