# Elementor AI Intent Schema Demo

A minimal, versioned intent schema for Elementor AI requests, plus a validator that checks example intents against the schema.

## What This Covers

- A JSON Schema contract for intent-driven AI requests
- Example intents for common operations (generate, edit, optimize)
- A validator script to keep demos aligned with the schema

## Quickstart

```bash
npm install
npm test
```

## Schema Highlights

- `intent`: what the AI should do (generate, edit, optimize)
- `target`: what the intent applies to (page, section, widget)
- `constraints`: tone, layout density, accessibility, tokens
- `output`: expected output format and confidence hints

## Example Intent

```json
{
  "version": "1.0.0",
  "intent": "generate_section",
  "target": {"type": "section", "name": "Hero"},
  "prompt": "Create a hero section for a cybersecurity SaaS...",
  "constraints": {
    "tone": "bold",
    "layout": {"density": "balanced", "max_columns": 2}
  }
}
```

## Notes

This is a demo schema meant to be expanded with real Elementor output contracts and design token mappings.
