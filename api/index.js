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

// Main handler
module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const pathname = req.url;
  console.log('Request pathname:', pathname);

  // Route: /api (root) - API info
  if (pathname === '/' || pathname === '') {
    return res.status(200).json({ 
      name: 'Legis Ledger API',
      version: '1.0',
      endpoints: {
        '/abstracts': 'List all abstracts',
        '/abstracts/:id': 'Get specific abstract',
        '/validate/:id': 'Validate abstract schema',
        '/health': 'Health check'
      }
    });
  }

  // Route: /health
  if (pathname === '/health') {
    return res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  }

  // Route: /abstracts
  if (pathname === '/abstracts') {
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
      
      return res.status(200).json(abstracts);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to list abstracts' });
    }
  }

  // Route: /abstracts/:id
  const abstractMatch = pathname.match(/^\/abstracts\/([^\/]+)$/);
  if (abstractMatch) {
    try {
      const id = abstractMatch[1];
      const abstractsDir = path.join(process.cwd(), 'data', 'abstracts');
      const jsonFiles = findJsonFilesRecursive(abstractsDir);
      
      const matchingFile = jsonFiles.find(filePath => {
        const abstract = readAbstractFromPath(filePath);
        return abstract && (abstract.identifier === id || abstract['@id'] === id);
      });
      
      if (!matchingFile) {
        return res.status(404).json({ error: 'Abstract not found', id: id });
      }
      
      const abstract = readAbstractFromPath(matchingFile);
      return res.status(200).json(abstract);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch abstract' });
    }
  }

  // Route: /validate/:id
  const validateMatch = pathname.match(/^\/validate\/([^\/]+)$/);
  if (validateMatch) {
    try {
      const id = validateMatch[1];
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
      const errors = [];
      if (!abstract['@context']) errors.push('Missing @context');
      if (!abstract['@type']) errors.push('Missing @type');
      if (!abstract.identifier) errors.push('Missing identifier');
      
      return res.status(200).json({ valid: errors.length === 0, errors, abstract });
    } catch (error) {
      return res.status(500).json({ error: 'Validation failed' });
    }
  }

  // 404 for unknown routes
  return res.status(404).json({ error: 'Not found', pathname: pathname, hint: 'Try /abstracts, /abstracts/:id, /validate/:id, or /health' });
};
