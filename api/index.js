// /api/index.js - Vercel Serverless Function (Simplified, no auth for now)
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

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

// GET /api/abstracts
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
    res.status(500).json({ error: 'Failed to list abstracts' });
  }
});

// GET /api/abstracts/:id
app.get('/abstracts/:id', (req, res) => {
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
    res.json(abstract);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch abstract' });
  }
});

// GET /api/validate/:id
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
    const errors = [];
    if (!abstract['@context']) errors.push('Missing @context');
    if (!abstract['@type']) errors.push('Missing @type');
    if (!abstract.identifier) errors.push('Missing identifier');
    
    res.json({ valid: errors.length === 0, errors, abstract });
  } catch (error) {
    res.status(500).json({ error: 'Validation failed' });
  }
});

// GET /api/health
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = app;
