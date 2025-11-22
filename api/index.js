// api/index.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS for browser access
app.use(cors());
app.use(express.json());

// Helper function to read JSON files
function readAbstract(filename) {
  const filePath = path.join(__dirname, '..', 'data', 'abstracts', filename);
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error.message);
    return null;
  }
}

function getAllAbstracts() {
  const abstracts = [];

  const files = [
  'health/creatine-lbm-resistance-training-2025.json',
  'health/dark-chocolate-cardiovascular-2025.json',
  'health/seed-oils-cardiovascular-2025.json',
  'policy/minimum-wage-employment-effects-2025.json',
  'policy/minimum-wage-poverty-reduction-2025.json',
  'health/vitamin-d-bone-health-2025.json',
  'health/vitamin-d-cardiovascular-prevention-2025.json',
  'health/vitamin-d-dementia-prevention-2025.json'
  ];
  
  files.forEach(filename => {
    const abstract = readAbstract(filename);
    if (abstract) {
      // Validate required fields
      if (!abstract.identifier) {
        console.warn(`⚠️  ${filename} missing identifier field`);
      }
      if (!abstract.conclusion?.confidence) {
        console.warn(`⚠️  ${filename} missing conclusion.confidence field`);
      }
      if (!abstract.conclusion?.claim) {
        console.warn(`⚠️  ${filename} missing conclusion.claim field`);
      }
      
      abstracts.push({
        id: abstract.identifier || filename.replace('.json', ''),
        filename: filename,
        domain: abstract.scenario?.domain,
        confidence: abstract.conclusion?.confidence,
        claim: abstract.conclusion?.claim
      });
    }
  });
  
  return abstracts;
}

// ENDPOINT 1: List all abstracts
app.get('/api/abstracts', (req, res) => {
  const abstracts = getAllAbstracts();
  res.json({
    count: abstracts.length,
    abstracts: abstracts
  });
});

// ENDPOINT 2: Get single abstract by ID
app.get('/api/abstracts/:id', (req, res) => {
  const id = req.params.id;
  const filename = `${id}.json`;
  const abstract = readAbstract(filename);
  
  if (abstract) {
    res.json(abstract);
  } else {
    res.status(404).json({ error: 'Abstract not found' });
  }
});

// ENDPOINT 3: Filter by confidence threshold
app.get('/api/filter', (req, res) => {
  const threshold = parseFloat(req.query.threshold) || 0.70;
  const domain = req.query.domain;
  
  const allAbstracts = getAllAbstracts();
  
  let filtered = allAbstracts.filter(a => a.confidence >= threshold);
  
  if (domain) {
    filtered = filtered.filter(a => a.domain === domain);
  }
  
  res.json({
    threshold: threshold,
    domain: domain || 'all',
    count: filtered.length,
    abstracts: filtered
  });
});

// ENDPOINT 4: Validate all abstracts
app.get('/api/validate', (req, res) => {
const files = [
  'health/creatine-lbm-resistance-training-2025.json',
  'health/dark-chocolate-cardiovascular-2025.json',
  'health/seed-oils-cardiovascular-2025.json',
  'policy/minimum-wage-employment-effects-2025.json',
  'policy/minimum-wage-poverty-reduction-2025.json',
  'health/vitamin-d-bone-health-2025.json',
  'health/vitamin-d-cardiovascular-prevention-2025.json',
  'health/vitamin-d-dementia-prevention-2025.json'
];
  
  const results = [];
  let validCount = 0;
  let warningCount = 0;
  let errorCount = 0;
  
  files.forEach(filename => {
    const abstract = readAbstract(filename);
    
    if (!abstract) {
      results.push({
        file: filename,
        status: '❌ error',
        error: 'File not found or invalid JSON'
      });
      errorCount++;
      return;
    }
    
    const validation = {
      file: filename,
      status: '✅ valid',
      checks: {},
      warnings: [],
      errors: []
    };
    
    // Required fields check
    validation.checks.hasIdentifier = !!abstract.identifier;
    validation.checks.hasConfidence = !!abstract.conclusion?.confidence;
    validation.checks.hasClaim = !!abstract.conclusion?.claim;
    validation.checks.hasDomain = !!abstract.scenario?.domain;
    validation.checks.hasBayesianAnalysis = !!abstract.bayesianAnalysis;
    validation.checks.hasEvidenceGrade = abstract.metadata?.funnelPosition || abstract.claimBasis?.some(s => s.grade);
    
    // Check for missing required fields
    if (!validation.checks.hasIdentifier) {
      validation.errors.push('Missing required field: identifier');
      errorCount++;
    }
    if (!validation.checks.hasConfidence) {
      validation.errors.push('Missing required field: conclusion.confidence');
      errorCount++;
    }
    if (!validation.checks.hasClaim) {
      validation.errors.push('Missing required field: conclusion.claim');
      errorCount++;
    }
    
    // Warnings for recommended fields
    if (!validation.checks.hasBayesianAnalysis) {
      validation.warnings.push('Missing recommended field: bayesianAnalysis');
      warningCount++;
    }
    if (!validation.checks.hasEvidenceGrade) {
      validation.warnings.push('Missing evidence grade information');
      warningCount++;
    }
    
    // Schema version check
    if (String(abstract['@context']).includes('https://schema.org')){
      validation.warnings.push('Non-standard @context');
      warningCount++;
    }
    
    // Confidence range check
    if (abstract.conclusion?.confidence) {
      if (abstract.conclusion.confidence < 0 || abstract.conclusion.confidence > 1) {
        validation.errors.push('Confidence must be between 0 and 1');
        errorCount++;
      }
      if (abstract.conclusion.confidence === 1.0) {
        validation.warnings.push('Confidence = 1.0 violates epistemic humility principle');
        warningCount++;
      }
    }
    
    // Set overall status
    if (validation.errors.length > 0) {
      validation.status = '❌ error';
    } else if (validation.warnings.length > 0) {
      validation.status = '⚠️  warning';
    } else {
      validCount++;
    }
    
    results.push(validation);
  });
  
  res.json({
    summary: {
      totalFiles: files.length,
      valid: validCount,
      warnings: warningCount,
      errors: errorCount
    },
    details: results,
    timestamp: new Date().toISOString()
  });
});

// ENDPOINT 5: Search abstracts by claim text
app.get('/api/search', (req, res) => {
  const query = req.query.q || req.query.query;
  
  if (!query) {
    return res.status(400).json({ 
      error: 'Missing search query. Use ?q=your+search+terms' 
    });
  }
  
  const searchTerm = query.toLowerCase();
  const allAbstracts = getAllAbstracts();
  
  // Search in claim text, domain, and identifier
  const results = allAbstracts.filter(abstract => {
    const claimMatch = abstract.claim?.toLowerCase().includes(searchTerm);
    const domainMatch = abstract.domain?.toLowerCase().includes(searchTerm);
    const idMatch = abstract.id?.toLowerCase().includes(searchTerm);
    
    return claimMatch || domainMatch || idMatch;
  });
  
  res.json({
    query: query,
    count: results.length,
    results: results
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Legis Ledger API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Legis Ledger API running on http://localhost:${PORT}`);
  console.log(`📊 Try: http://localhost:${PORT}/api/abstracts`);
});