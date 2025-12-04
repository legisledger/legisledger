// /api/index.js - Vercel Serverless Function (Express wrapper)
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Enable CORS for browser access
app.use(cors());
app.use(express.json());

// Helper function to recursively find all JSON files in a directory
function findJsonFilesRecursive(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively search subdirectories
      findJsonFilesRecursive(filePath, fileList);
    } else if (file.endsWith('.json')) {
      // Add JSON files to the list
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Helper function to read abstract from full path
function readAbstractFromPath(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

// Helper function to read JSON files (legacy, for backward compatibility)
function readAbstract(filename) {
  const filePath = path.join(process.cwd(), 'data', 'abstracts', filename);
  return readAbstractFromPath(filePath);
}

// Helper function to read demo files
function readDemo(filename) {
  const filePath = path.join(process.cwd(), 'data', 'demos', filename);
  return readAbstractFromPath(filePath);
}

// Helper function to list all abstracts (now recursive!)
function listAllAbstracts() {
  const abstracts = [];
  
  // Read from /data/abstracts (recursively)
  const abstractsDir = path.join(process.cwd(), 'data', 'abstracts');
  if (fs.existsSync(abstractsDir)) {
    const jsonFiles = findJsonFilesRecursive(abstractsDir);
    
    jsonFiles.forEach(filePath => {
      const abstract = readAbstractFromPath(filePath);
      if (abstract) {
        // Get relative path for cleaner identifier
        const relativePath = path.relative(abstractsDir, filePath);
        
        abstracts.push({
          identifier: abstract.identifier || abstract['@id'],
          filename: relativePath, // Now includes subdirectory path
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

// API Routes

// GET /api - API documentation
app.get('/api', (req, res) => {
  res.json({
    name: 'Legis Ledger API',
    version: '1.0.0',
    description: 'Knowledge infrastructure with Bayesian confidence levels',
    endpoints: {
      '/api': 'This documentation',
      '/api/abstracts': 'List all available abstracts',
      '/api/abstracts/:id': 'Get specific abstract by identifier',
      '/api/search?q=query': 'Search abstracts',
      '/api/filter?confidence=0.7': 'Filter abstracts by minimum confidence',
      '/api/validate': 'GET: Validate all abstracts; POST: Validate single abstract JSON'
    },
    examples: {
      list: '/api/abstracts',
      get: '/api/abstracts/vitamin-d-health-effects-filtered-2025',
      search: '/api/search?q=vitamin',
      filter: '/api/filter?confidence=0.7',
      validate: '/api/validate'
    }
  });
});

// GET /api/abstracts - List all abstracts
app.get('/api/abstracts', (req, res) => {
  try {
    const abstracts = listAllAbstracts();
    res.json({
      count: abstracts.length,
      abstracts: abstracts
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to list abstracts',
      message: error.message 
    });
  }
});

// GET /api/abstracts/:id - Get specific abstract
app.get('/api/abstracts/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // Try finding in abstracts directory (recursively)
    const abstractsDir = path.join(process.cwd(), 'data', 'abstracts');
    if (fs.existsSync(abstractsDir)) {
      const jsonFiles = findJsonFilesRecursive(abstractsDir);
      
      for (const filePath of jsonFiles) {
        const abstract = readAbstractFromPath(filePath);
        if (abstract && (abstract.identifier === id || abstract['@id'] === id)) {
          return res.json(abstract);
        }
      }
    }
    
    // Try demos directory
    const demosDir = path.join(process.cwd(), 'data', 'demos');
    if (fs.existsSync(demosDir)) {
      const demoFiles = fs.readdirSync(demosDir).filter(f => f.endsWith('.json'));
      
      for (const file of demoFiles) {
        const demo = readDemo(file);
        if (demo) {
          // Check main identifier
          if (demo.identifier === id || demo['@id'] === id) {
            return res.json(demo);
          }
          
          // Check if it's a vitamin D style with individual claim IDs
          if (demo.retainedClaims || demo.removedClaims) {
            const allClaims = [...(demo.retainedClaims || []), ...(demo.removedClaims || [])];
            const claim = allClaims.find(c => c.claimId === id);
            if (claim) {
              return res.json({ ...demo, focusedClaim: claim });
            }
          }
        }
      }
    }
    
    res.status(404).json({ 
      error: 'Abstract not found',
      id: id 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to retrieve abstract',
      message: error.message 
    });
  }
});

// GET /api/search - Search abstracts
app.get('/api/search', (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }
    
    const query = q.toLowerCase();
    const abstracts = listAllAbstracts();
    
    const results = abstracts.filter(abstract => {
      return (
        (abstract.identifier && abstract.identifier.toLowerCase().includes(query)) ||
        (abstract.claim && abstract.claim.toLowerCase().includes(query)) ||
        (abstract.domain && abstract.domain.toLowerCase().includes(query))
      );
    });
    
    res.json({
      query: q,
      count: results.length,
      results: results
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Search failed',
      message: error.message 
    });
  }
});

// GET /api/filter - Filter abstracts by confidence
app.get('/api/filter', (req, res) => {
  try {
    const { confidence, domain } = req.query;
    
    let abstracts = listAllAbstracts();
    
    if (confidence) {
      const minConfidence = parseFloat(confidence);
      if (isNaN(minConfidence)) {
        return res.status(400).json({ error: 'Confidence must be a number' });
      }
      abstracts = abstracts.filter(a => a.confidence >= minConfidence);
    }
    
    if (domain) {
      abstracts = abstracts.filter(a => a.domain === domain);
    }
    
    res.json({
      filters: { confidence, domain },
      count: abstracts.length,
      abstracts: abstracts
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Filter failed',
      message: error.message 
    });
  }
});

// GET /api/validate - Validate all abstracts
app.get('/api/validate', (req, res) => {
  try {
    const abstracts = listAllAbstracts();
    const results = [];
    let allValid = true;
    
    abstracts.forEach(abstract => {
      const errors = [];
      
      // Check if we can fetch the full abstract
      try {
        // Try to load the full abstract (this validates it exists and is parseable)
        const abstractsDir = path.join(process.cwd(), 'data', 'abstracts');
        const demosDir = path.join(process.cwd(), 'data', 'demos');
        
        let found = false;
        let fullAbstract = null;
        
        // Search in abstracts directory
        if (fs.existsSync(abstractsDir)) {
          const jsonFiles = findJsonFilesRecursive(abstractsDir);
          
          for (const filePath of jsonFiles) {
            const candidate = readAbstractFromPath(filePath);
            if (candidate && (candidate.identifier === abstract.identifier || candidate['@id'] === abstract.identifier)) {
              fullAbstract = candidate;
              found = true;
              break;
            }
          }
        }
        
        // Search in demos directory (for vitamin D filtered format)
        if (!found && fs.existsSync(demosDir)) {
          const demoFiles = fs.readdirSync(demosDir).filter(f => f.endsWith('.json'));
          
          for (const file of demoFiles) {
            const filePath = path.join(demosDir, file);
            const demo = readAbstractFromPath(filePath);
            
            if (demo) {
              // Check if this is the main identifier
              if (demo.identifier === abstract.identifier || demo['@id'] === abstract.identifier) {
                fullAbstract = demo;
                found = true;
                break;
              }
              
              // Check if it's a vitamin D style with individual claim IDs
              if (demo.retainedClaims || demo.removedClaims) {
                const allClaims = [...(demo.retainedClaims || []), ...(demo.removedClaims || [])];
                const claim = allClaims.find(c => c.claimId === abstract.identifier);
                if (claim) {
                  // This is a sub-claim from vitamin D format - it's valid
                  fullAbstract = claim;
                  found = true;
                  break;
                }
              }
            }
          }
        }
        
        if (!found) {
          errors.push('Abstract not found in filesystem');
        } else if (fullAbstract) {
          // Check if this is a sub-claim (part of vitamin D filtered format)
          const isSubClaim = fullAbstract.claimId && !fullAbstract['@type'];
          
          // Validate based on type
          const isCollection = fullAbstract['@type'] === 'CollectionPage';
          
          // Regular abstracts and collections need @type
          if (!isSubClaim && !fullAbstract['@type']) {
            errors.push('Missing @type field');
          }
          
          // All need some form of identifier
          if (!fullAbstract.identifier && !fullAbstract['@id'] && !fullAbstract.claimId) {
            errors.push('Missing identifier field');
          }
          
          // Collections have different structure
          if (isCollection) {
            if (!fullAbstract.name && !fullAbstract.description) {
              errors.push('Collection missing name or description');
            }
            if (!fullAbstract.relatedClaims) {
              errors.push('Collection missing relatedClaims field');
            }
          } else if (isSubClaim) {
            // Sub-claims need claim text and confidence
            if (!fullAbstract.claim) {
              errors.push('Sub-claim missing claim field');
            }
            if (fullAbstract.confidence === undefined) {
              errors.push('Sub-claim missing confidence field');
            }
          } else {
            // Regular abstracts need scenario
            if (!fullAbstract.scenario) {
              errors.push('Missing scenario field');
            }
            // Need conclusion
            if (!fullAbstract.conclusion) {
              errors.push('Missing conclusion field');
            }
          }
        }
      } catch (error) {
        errors.push(`Validation error: ${error.message}`);
      }
      
      results.push({
        identifier: abstract.identifier,
        valid: errors.length === 0,
        errors: errors
      });
      
      if (errors.length > 0) allValid = false;
    });
    
    res.json({
      allValid: allValid,
      totalAbstracts: abstracts.length,
      validAbstracts: results.filter(r => r.valid).length,
      results: results
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Validation failed',
      message: error.message 
    });
  }
});

// POST /api/validate - Validate a single abstract JSON
app.post('/api/validate', (req, res) => {
  try {
    const abstract = req.body;
    
    // Basic validation
    const errors = [];
    
    if (!abstract['@type']) errors.push('Missing @type field');
    if (!abstract.identifier) errors.push('Missing identifier field');
    if (!abstract.scenario) errors.push('Missing scenario field');
    if (!abstract.conclusion) errors.push('Missing conclusion field');
    
    if (errors.length > 0) {
      return res.status(400).json({
        valid: false,
        errors: errors
      });
    }
    
    res.json({
      valid: true,
      message: 'Abstract structure is valid'
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Validation failed',
      message: error.message 
    });
  }
});

// Export for Vercel serverless
module.exports = app;
