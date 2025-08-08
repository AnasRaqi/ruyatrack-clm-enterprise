// In-memory storage for demo purposes
// In production, this would connect to a database
let contracts = [
  {
    id: 1,
    title: 'Microsoft Office 365 Enterprise',
    vendor: 'Microsoft Corporation',
    value: 180000,
    currency: 'SAR',
    status: 'Active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    type: 'Software License',
    description: 'Enterprise productivity suite with advanced security features'
  },
  {
    id: 2,
    title: 'AWS Cloud Services',
    vendor: 'Amazon Web Services',
    value: 225000,
    currency: 'SAR',
    status: 'Active',
    startDate: '2024-02-01',
    endDate: '2025-01-31',
    type: 'Cloud Infrastructure',
    description: 'Comprehensive cloud computing services and infrastructure'
  },
  {
    id: 3,
    title: 'Salesforce CRM Platform',
    vendor: 'Salesforce Inc.',
    value: 150000,
    currency: 'SAR',
    status: 'Active',
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    type: 'CRM Software',
    description: 'Customer relationship management platform with analytics'
  }
];

let nextId = 4;

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        // Get all contracts or specific contract by ID
        const { id } = req.query;
        if (id) {
          const contract = contracts.find(c => c.id === parseInt(id));
          if (!contract) {
            return res.status(404).json({ success: false, error: 'Contract not found' });
          }
          res.status(200).json({ success: true, data: contract });
        } else {
          res.status(200).json({ success: true, data: contracts });
        }
        break;

      case 'POST':
        // Create new contract
        const newContract = {
          id: nextId++,
          title: req.body.title || '',
          vendor: req.body.vendor || '',
          value: parseFloat(req.body.value) || 0,
          currency: req.body.currency || 'SAR',
          status: req.body.status || 'Draft',
          startDate: req.body.startDate || '',
          endDate: req.body.endDate || '',
          type: req.body.type || '',
          description: req.body.description || '',
          createdAt: new Date().toISOString()
        };
        
        contracts.push(newContract);
        res.status(201).json({ success: true, data: newContract });
        break;

      case 'PUT':
        // Update existing contract
        const updateId = parseInt(req.query.id);
        const contractIndex = contracts.findIndex(c => c.id === updateId);
        
        if (contractIndex === -1) {
          return res.status(404).json({ success: false, error: 'Contract not found' });
        }
        
        contracts[contractIndex] = {
          ...contracts[contractIndex],
          ...req.body,
          id: updateId, // Ensure ID doesn't change
          updatedAt: new Date().toISOString()
        };
        
        res.status(200).json({ success: true, data: contracts[contractIndex] });
        break;

      case 'DELETE':
        // Delete contract
        const deleteId = parseInt(req.query.id);
        const deleteIndex = contracts.findIndex(c => c.id === deleteId);
        
        if (deleteIndex === -1) {
          return res.status(404).json({ success: false, error: 'Contract not found' });
        }
        
        const deletedContract = contracts.splice(deleteIndex, 1)[0];
        res.status(200).json({ success: true, data: deletedContract });
        break;

      default:
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Contracts API Error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

