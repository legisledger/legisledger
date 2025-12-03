// /api/index.js - Vercel Serverless Function (Express wrapper)
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Enable CORS for browser access
app.use(cors());
app.use(express.json());

// Helper function to read JSON files
function readAbstract(filename) {
  const filePath = path.join(process.cwd(), 'data', 'abstracts', filename);
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error.message);
    return null;
  }
}

// Helper function to read demo files
function readDemo(filename) {
  const filePath = path.join(process.cwd(), 'data', 'demos', filename);
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading demo ${filename}:`, error.message);
    return null;
  }
}

// Helper function to list all abstracts
function listAllAbstracts() {
  const abstracts = [];
  
  // Read from /data/abstracts
  const abstractsDir = path.join(process.cwd(), 'data', 'abstracts');
  if (fs.existsSync(abstractsDir)) {
    const files = fs.readdirSync(abstractsDir).filter(f => f.endsWith('.json'));
    files.forEach(file => {
      const abstract = readAbstract(file);
      if (abstract) {
        abstracts.push({
          identifier: abstract.identifier || abstract['@id'],
          filename: file,
          domain: abstract.scenario?.domain,
          claim: abstract.conclusion?.claim,
          confidence: abstract.conclusion?.confidence
        });
      }
    });
  }
  
  // Read from /data/demos
  const demosDir = path.join(process.cwd(), 'data', 'demos');
  if (fs.existsSync(demosDir)) {
    const files = fs.readdirSync(demosDir).filter(f => f.endsWith('.json'));
    files.forEach(file => {
      const demo = readDemo(file);
      if (demo) {
        // Handle vitamin D filtered structure
        if (demo.retainedClaims && demo.removedClaims) {
          const allClaims = [...demo.retainedClaims, ...demo.removedClaims];
          allClaims.forEach(claim => {
            abstracts.push({
              identifier: claim.claimId,
              filename: file,
              domain: demo.scenario?.domain || 'scientific',
              claim: claim.claim,
              confidence: claim.confidence
            });
          });
        } else {
          abstracts.push({
            identifier: demo.identifier || demo['@id'],
            filename: file,
            domain: demo.scenario?.domain,
            claim: demo.conclusion?.claim,
            confidence: demo.conclusion?.confidence
          });
        }
      }
    });
  }
  
  return abstracts;
}

// API Documentation (root endpoint)
app.get('/api', (req, res) => {
  res.json({
    name: 'Legis Ledger API',
    version: '1.0.0',
    description: 'Bayesian fact-checker with quantified confidence levels',
    documentation: 'https://github.com/damonregan/legis-ledger',
    endpoints: {
      'GET /api': {
        description: 'This documentation page'
      },
      'GET /api/abstracts': {
        description: 'List all available abstracts with metadata',
        example: 'https://demo.legisledger.org/api/abstracts'
      },
      'GET /api/abstracts/:id': {
        description: 'Get a specific abstract by identifier',
        example: 'https://demo.legisledger.org/api/abstracts/vitamin-d-rickets-prevention',
        parameters: {
          id: 'Abstract identifier'
        }
      },
      'GET /api/filter': {
        description: 'Filter abstracts by confidence threshold',
        example: 'https://demo.legisledger.org/api/filter?threshold=0.70',
        parameters: {
          threshold: 'Minimum confidence level (0.0 to 1.0)'
        }
      },
      'GET /api/search': {
        description: 'Search abstracts by text query',
        example: 'https://demo.legisledger.org/api/search?q=vitamin',
        parameters: {
          q: 'Search query (searches claim, domain, and identifier)'
        }
      },
      'GET /api/validate': {
        description: 'Validate all abstracts against schema requirements',
        example: 'https://demo.legisledger.org/api/validate'
      }
    },
    contact: {
      project: 'Legis Ledger',
      purpose: 'Knowledge infrastructure for democracy with epistemic humility',
      status: 'Pre-launch development'
    }
  });
});

// List all abstracts
app.get('/api/abstracts', (req, res) => {
  try {
    const abstracts = listAllAbstracts();
    res.json({
      totalAbstracts: abstracts.length,
      abstracts
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific abstract
app.get('/api/abstracts/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // Try reading from abstracts directory
    let abstract = readAbstract(`${id}.json`);
    
    // Try reading from demos directory
    if (!abstract) {
      abstract = readDemo(`${id}.json`);
    }
    
    // Try matching against claim IDs in vitamin D structure
    if (!abstract) {
      const vitaminD = readDemo('vitamin-d-filtered-mvp.json');
      if (vitaminD && vitaminD.retainedClaims) {
        const claim = [...vitaminD.retainedClaims, ...vitaminD.removedClaims]
          .find(c => c.claimId === id);
        if (claim) {
          abstract = { ...claim, source: 'vitamin-d-filtered-mvp.json' };
        }
      }
    }
    
    if (!abstract) {
      return res.status(404).json({ error: 'Abstract not found', id });
    }
    
    res.json(abstract);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search abstracts
app.get('/api/search', (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }
    
    const allAbstracts = listAllAbstracts();
    const query = q.toLowerCase();
    
    const results = allAbstracts.filter(a => 
      (a.claim && a.claim.toLowerCase().includes(query)) ||
      (a.identifier && a.identifier.toLowerCase().includes(query)) ||
      (a.domain && a.domain.toLowerCase().includes(query))
    );
    
    res.json({
      query: q,
      resultsCount: results.length,
      results
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Filter by confidence threshold
app.get('/api/filter', (req, res) => {
  try {
    const { threshold } = req.query;
    if (!threshold) {
      return res.status(400).json({ error: 'Query parameter "threshold" is required (0.0 to 1.0)' });
    }
    
    const thresholdNum = parseFloat(threshold);
    if (isNaN(thresholdNum) || thresholdNum < 0 || thresholdNum > 1) {
      return res.status(400).json({ error: 'Threshold must be between 0.0 and 1.0' });
    }
    
    const allAbstracts = listAllAbstracts();
    const filtered = allAbstracts.filter(a => 
      a.confidence && a.confidence >= thresholdNum
    );
    
    res.json({
      threshold: thresholdNum,
      totalAbstracts: allAbstracts.length,
      filteredCount: filtered.length,
      filtered
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Validate abstracts (basic check)
app.get('/api/validate', (req, res) => {
  try {
    const allAbstracts = listAllAbstracts();
    const validation = {
      totalAbstracts: allAbstracts.length,
      valid: allAbstracts.length > 0,
      errors: [],
      abstracts: allAbstracts.map(a => ({
        identifier: a.identifier,
        hasConfidence: typeof a.confidence === 'number',
        hasClaim: typeof a.claim === 'string',
        hasDomain: typeof a.domain === 'string'
      }))
    };
    
    res.json(validation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    path: req.path,
    availableEndpoints: [
      'GET /api',
      'GET /api/abstracts',
      'GET /api/abstracts/:id',
      'GET /api/search?q=query',
      'GET /api/filter?threshold=0.70',
      'GET /api/validate'
    ]
  });
});

// CRITICAL: Export for Vercel serverless
// Do NOT use app.listen() - Vercel handles that
module.exports = app;
