// Vercel Serverless Function
const fs = require('fs');
const path = require('path');

// Helper: Recursively find JSON files
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

// Helper: Read abstract
function readAbstractFromPath(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

// Helper: Get all abstracts (used by multiple endpoints)
function getAllAbstracts() {
  const abstractsDir = path.join(process.cwd(), 'data', 'abstracts');
  const jsonFiles = findJsonFilesRecursive(abstractsDir);
  
  return jsonFiles
    .map(filePath => {
      const abstract = readAbstractFromPath(filePath);
      if (!abstract) return null;
      return {
        id: abstract.identifier || abstract['@id'],
        title: abstract.scenario?.description || 'Untitled',
        claim: abstract.conclusion?.claim || abstract.scenario?.description || 'No claim available',
        confidence: abstract.conclusion?.confidence || 0,
        domain: abstract.scenario?.domain || 'unknown',
        type: abstract['@type'] || 'KnowledgeClaim'
      };
    })
    .filter(Boolean);
}

// Main handler
module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Parse URL and pathname (remove query string)
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // Route: / or /api or /api/ (root) - API documentation
  if (pathname === '/' || pathname === '' || pathname === '/api' || pathname === '/api/') {
    return res.status(200).json({ 
      name: 'Legis Ledger API',
      version: '1.0.0',
      description: 'Bayesian fact-checking infrastructure for contested knowledge',
      endpoints: {
        'GET /abstracts': 'List all abstracts',
        'GET /abstracts/:id': 'Get specific abstract by ID',
        'GET /search?q=term': 'Search abstracts by title or claim',
        'GET /filter?threshold=0.70': 'Filter abstracts by confidence threshold (0.0-1.0)',
        'GET /validate/:id': 'Validate abstract schema compliance',
        'GET /validate': 'Validate all abstracts',
        'GET /health': 'Health check'
      },
      examples: {
        listAll: '/abstracts',
        getOne: '/abstracts/vitamin-d-bone-health-2025',
        search: '/search?q=vitamin',
        filter: '/filter?threshold=0.70',
        validate: '/validate/creatine-lbm-resistance-training-2025'
      }
    });
  }

  // Route: /health
  if (pathname === '/health' || pathname === '/api/health') {
    return res.status(200).json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  }

  // Route: /search?q=term (search abstracts by title or claim)
  if (pathname === '/search' || pathname === '/api/search') {
    const query = url.searchParams.get('q');
    
    if (!query) {
      return res.status(400).json({ 
        error: 'Missing query parameter', 
        hint: 'Use ?q=searchterm (e.g., /search?q=vitamin)'
      });
    }
    
    try {
      const abstracts = getAllAbstracts();
      const searchLower = query.toLowerCase();
      
      const results = abstracts.filter(a => 
        a.title.toLowerCase().includes(searchLower) || 
        a.claim.toLowerCase().includes(searchLower) ||
        a.domain.toLowerCase().includes(searchLower)
      );
      
      return res.status(200).json({
        query: query,
        count: results.length,
        results: results
      });
    } catch (error) {
      return res.status(500).json({ error: 'Search failed', message: error.message });
    }
  }

  // Route: /filter?threshold=0.70 (filter by confidence)
  if (pathname === '/filter' || pathname === '/api/filter') {
    const thresholdParam = url.searchParams.get('threshold');
    
    if (!thresholdParam) {
      return res.status(400).json({ 
        error: 'Missing threshold parameter', 
        hint: 'Use ?threshold=0.70 (value between 0.0 and 1.0)'
      });
    }
    
    const threshold = parseFloat(thresholdParam);
    
    if (isNaN(threshold) || threshold < 0 || threshold > 1) {
      return res.status(400).json({ 
        error: 'Invalid threshold', 
        hint: 'Threshold must be a number between 0.0 and 1.0'
      });
    }
    
    try {
      const abstracts = getAllAbstracts();
      const filtered = abstracts.filter(a => a.confidence >= threshold);
      
      return res.status(200).json({
        threshold: threshold,
        totalAbstracts: abstracts.length,
        matchingAbstracts: filtered.length,
        results: filtered
      });
    } catch (error) {
      return res.status(500).json({ error: 'Filter failed', message: error.message });
    }
  }

  // Route: /abstracts (list all)
  if (pathname === '/abstracts' || pathname === '/api/abstracts') {
    try {
      const abstracts = getAllAbstracts();
      return res.status(200).json(abstracts);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to list abstracts', message: error.message });
    }
  }

  // Route: /abstracts/:id (get specific abstract)
  const abstractMatch = pathname.match(/^\/(api\/)?abstracts\/([^\/]+)$/);
  if (abstractMatch) {
    try {
      const id = abstractMatch[2];
      const abstractsDir = path.join(process.cwd(), 'data', 'abstracts');
      const jsonFiles = findJsonFilesRecursive(abstractsDir);
      
      const matchingFile = jsonFiles.find(filePath => {
        const abstract = readAbstractFromPath(filePath);
        return abstract && (abstract.identifier === id || abstract['@id'] === id);
      });
      
      if (!matchingFile) {
        return res.status(404).json({ 
          error: 'Abstract not found', 
          id: id,
          hint: 'Use /abstracts to see all available IDs'
        });
      }
      
      const abstract = readAbstractFromPath(matchingFile);
      return res.status(200).json(abstract);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch abstract', message: error.message });
    }
  }

  // Route: /validate (validate all abstracts - no ID)
  if (pathname === '/validate' || pathname === '/api/validate') {
    try {
      const abstractsDir = path.join(process.cwd(), 'data', 'abstracts');
      const jsonFiles = findJsonFilesRecursive(abstractsDir);
      
      const validationResults = jsonFiles.map(filePath => {
        const abstract = readAbstractFromPath(filePath);
        if (!abstract) {
          return {
            file: path.basename(filePath),
            valid: false,
            errors: ['Failed to parse JSON']
          };
        }
        
        const errors = [];
        if (!abstract['@context']) errors.push('Missing @context');
        if (!abstract['@type']) errors.push('Missing @type');
        if (!abstract.identifier && !abstract['@id']) errors.push('Missing identifier/@id');
        if (!abstract.scenario) errors.push('Missing scenario');
        if (!abstract.conclusion) errors.push('Missing conclusion');
        
        return {
          id: abstract.identifier || abstract['@id'] || 'unknown',
          file: path.basename(filePath),
          valid: errors.length === 0,
          errors: errors
        };
      });
      
      const validCount = validationResults.filter(r => r.valid).length;
      const totalCount = validationResults.length;
      
      return res.status(200).json({
        summary: {
          total: totalCount,
          valid: validCount,
          invalid: totalCount - validCount
        },
        results: validationResults
      });
    } catch (error) {
      return res.status(500).json({ error: 'Validation failed', message: error.message });
    }
  }

  // Route: /validate/:id (validate specific abstract)
  const validateMatch = pathname.match(/^\/(api\/)?validate\/([^\/]+)$/);
  if (validateMatch) {
    try {
      const id = validateMatch[2];
      const abstractsDir = path.join(process.cwd(), 'data', 'abstracts');
      const jsonFiles = findJsonFilesRecursive(abstractsDir);
      
      const matchingFile = jsonFiles.find(filePath => {
        const abstract = readAbstractFromPath(filePath);
        return abstract && (abstract.identifier === id || abstract['@id'] === id);
      });
      
      if (!matchingFile) {
        return res.status(404).json({ 
          error: 'Abstract not found',
          id: id,
          hint: 'Use /abstracts to see all available IDs'
        });
      }
      
      const abstract = readAbstractFromPath(matchingFile);
      const errors = [];
      
      // Required fields
      if (!abstract['@context']) errors.push('Missing @context');
      if (!abstract['@type']) errors.push('Missing @type');
      if (!abstract.identifier && !abstract['@id']) errors.push('Missing identifier/@id');
      if (!abstract.scenario) errors.push('Missing scenario');
      if (!abstract.conclusion) errors.push('Missing conclusion');
      
      // Optional but recommended fields
      const warnings = [];
      if (!abstract.bayesianAnalysis) warnings.push('Missing bayesianAnalysis (recommended)');
      if (!abstract.sources || abstract.sources.length === 0) warnings.push('Missing sources (recommended)');
      if (!abstract.metadata) warnings.push('Missing metadata (recommended)');
      
      return res.status(200).json({ 
        id: id,
        valid: errors.length === 0,
        errors: errors,
        warnings: warnings,
        schema: 'core-knowledge-schema-1.2.0'
      });
    } catch (error) {
      return res.status(500).json({ error: 'Validation failed', message: error.message });
    }
  }

  // 404 for unknown routes
  return res.status(404).json({ 
    error: 'Not found', 
    pathname: pathname, 
    hint: 'See /api for available endpoints'
  });
};
