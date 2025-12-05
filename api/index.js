// /api/index.js - Vercel Serverless Function with API Authentication
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Enable CORS for browser access
app.use(cors());
app.use(express.json());

// API Authentication Middleware
function requireApiKey(req, res, next) {
  const referer = req.headers.referer || req.headers.origin || '';
  
  // Tier 1: Internal Website (No API Key Required)
  if (referer.includes('demo.legisledger.com') ||   // Primary
      referer.includes('demo.legisledger.org') ||   // Old (fallback during transition)
      referer.includes('localhost')) {
    req.apiKey = 'internal-website';
    req.keyData = { tier: 'internal', rateLimit: 10000 };
    return next();
  }
  
  // Tier 2: External API Access (Requires Key)
  const apiKey = req.query.api_key || req.headers['x-api-key'] || req.headers.authorization;
  
  if (!apiKey) {
    return res.status(401).json({
      error: 'API key required for external access',
      message: 'Visit demo.legisledger.com to browse abstracts, or email hello@legisledger.com for API access',
      howToGetKey: {
        demo: 'Visit https://demo.legisledger.com (free, no signup)',
        pilot: 'Email hello@legisledger.com for pilot program (free 3 months)'
      }
    });
  }
  
  // Validate API key (simple validation for now)
  // TODO: Replace with database lookup
  const validKeys = {
    'demo-key-2025': { tier: 'demo', rateLimit: 10 },
    'pilot-key-2025': { tier: 'pilot', rateLimit: 100 }
  };
  
  if (!validKeys[apiKey]) {
    return res.status(403).json({
      error: 'Invalid API key',
      message: 'Email hello@legisledger.com for valid API key'
    });
  }
  
  req.apiKey = apiKey;
  req.keyData = validKeys[apiKey];
  next();
}

// Apply authentication to all API routes
app.use(requireApiKey);

// Helper function to recursively find all JSON files
function findJsonFilesRecursive(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findJsonFilesRecursive(filePath, fileList);
    } else if (file.endsWith('.json')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Helper function to read abstract
function readAbstractFromPath(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

// GET /api/abstracts - List all abstracts
app.get('/abstracts', (req, res) => {
  try {
    const abstractsDir = path.join(process.cwd(), 'data', 'abstracts');
    const jsonFiles = findJsonFilesRecursive(abstractsDir);
    
    const abstracts = jsonFiles
      .map(filePath => {
        const abstract = readAbstractFromPath(filePath);
        if (!abstract) return null;
        
        return {
          id: abstract.identifier || abstract['@id'],
          title: abstract.scenario?.description || 'Untitled',
          confidence: abstract.conclusion?.confidence || 0,
          domain: abstract.scenario?.domain || 'unknown',
          type: abstract['@type'] || 'KnowledgeClaim'
        };
      })
      .filter(Boolean);
    
    res.json(abstracts);
  } catch (error) {
    console.error('Error listing abstracts:', error);
    res.status(500).json({ error: 'Failed to list abstracts' });
  }
});

// GET /api/abstracts/:id - Get specific abstract
app.get('/abstracts/:id', (req, res) => {
  try {
    const { id } = req.params;
    const abstractsDir = path.join(process.cwd(), 'data', 'abstracts');
    const jsonFiles = findJsonFilesRecursive(abstractsDir);
    
    // Find file with matching identifier
    const matchingFile = jsonFiles.find(filePath => {
      const abstract = readAbstractFromPath(filePath);
      return abstract && (abstract.identifier === id || abstract['@id'] === id);
    });
    
    if (!matchingFile) {
      return res.status(404).json({ error: 'Abstract not found' });
    }
    
    const abstract = readAbstractFromPath(matchingFile);
    res.json(abstract);
  } catch (error) {
    console.error('Error fetching abstract:', error);
    res.status(500).json({ error: 'Failed to fetch abstract' });
  }
});

// GET /api/validate/:id - Validate abstract schema
app.get('/validate/:id', (req, res) => {
  try {
    const { id } = req.params;
    const abstractsDir = path.join(process.cwd(), 'data', 'abstracts');
    const jsonFiles = findJsonFilesRecursive(abstractsDir);
    
    const matchingFile = jsonFiles.find(filePath => {
      const abstract = readAbstractFromPath(filePath);
      return abstract && (abstract.identifier === id || abstract['@id'] === id);
    });
    
    if (!matchingFile) {
      return res.status(404).json({ error: 'Abstract not found' });
    }
    
    const abstract = readAbstractFromPath(matchingFile);
    
    // Basic validation
    const errors = [];
    if (!abstract['@context']) errors.push('Missing @context');
    if (!abstract['@type']) errors.push('Missing @type');
    if (!abstract.identifier) errors.push('Missing identifier');
    if (!abstract.scenario) errors.push('Missing scenario');
    if (!abstract.conclusion) errors.push('Missing conclusion');
    
    res.json({
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
      abstract: abstract
    });
  } catch (error) {
    console.error('Error validating abstract:', error);
    res.status(500).json({ error: 'Validation failed' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Export for Vercel
module.exports = app;
