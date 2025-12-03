# Legis Ledger API

Base URL: https://demo.legisledger.org/api/

## Endpoints

### List all abstracts
GET /abstracts
Returns: Array of abstracts with metadata

### Get single abstract
GET /abstracts/{id}
Example: /abstracts/creatine-lbm-resistance-training-2025

### Filter by confidence
GET /filter?threshold=0.70&domain=scientific
Parameters:
- threshold: 0.0-1.0 (default 0.70)
- domain: scientific, policy, legal (optional)

### Validate schemas
GET /validate
Returns: Validation report for all abstracts

### Search abstracts by text
GET /search?q={search_term}

Example: /search?q=vitamin
Example: /search?q=employment

Parameters:
- q: Search term (searches in claim text, domain, and identifier)

Returns: Filtered array of matching abstracts