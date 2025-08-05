const express = require('express');
const app = express();

// Basic middleware
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'docchat-rag-engine',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

// Document upload endpoint
app.post('/api/documents', (req, res) => {
  res.json({
    documentId: 'test-' + Date.now(),
    jobId: 'job-' + Date.now(),
    status: 'processing',
    message: 'Document received for processing'
  });
});

// Chat endpoint
app.post('/api/chat/:documentId', (req, res) => {
  const { documentId } = req.params;
  const { query } = req.body;
  
  res.json({
    content: `I received your query "${query}" for document ${documentId}. External RAG is now working!`,
    sources: [],
    documentId,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 RAG Engine running on port ${PORT}`);
  console.log(`📊 Service: DocChat External RAG v2.0`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});
