// In-memory storage for demo purposes
let vendors = [
  {
    id: 1,
    name: 'Microsoft Corporation',
    email: 'enterprise@microsoft.com',
    phone: '+1-800-642-7676',
    address: 'One Microsoft Way, Redmond, WA 98052, USA',
    category: 'Software & Technology',
    status: 'Active',
    rating: 4.2,
    contactPerson: 'John Smith',
    ratings: {
      onTimeDelivery: 4.5,
      marketReputation: 4.8,
      qualityOfService: 4.0,
      costEffectiveness: 3.5
    },
    contractValue: 180000,
    joinedDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Amazon Web Services',
    email: 'enterprise@aws.amazon.com',
    phone: '+1-206-266-4064',
    address: '410 Terry Ave N, Seattle, WA 98109, USA',
    category: 'Cloud Services',
    status: 'Active',
    rating: 4.8,
    contactPerson: 'Sarah Johnson',
    ratings: {
      onTimeDelivery: 4.9,
      marketReputation: 4.9,
      qualityOfService: 4.7,
      costEffectiveness: 4.6
    },
    contractValue: 225000,
    joinedDate: '2023-02-20'
  },
  {
    id: 3,
    name: 'Salesforce Inc.',
    email: 'enterprise@salesforce.com',
    phone: '+1-415-901-7000',
    address: 'Salesforce Tower, 415 Mission St, San Francisco, CA 94105, USA',
    category: 'CRM Software',
    status: 'Renewal Due',
    rating: 4.1,
    contactPerson: 'Michael Brown',
    ratings: {
      onTimeDelivery: 4.2,
      marketReputation: 4.5,
      qualityOfService: 4.0,
      costEffectiveness: 3.7
    },
    contractValue: 150000,
    joinedDate: '2023-03-10'
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
        // Get all vendors or specific vendor by ID
        const { id } = req.query;
        if (id) {
          const vendor = vendors.find(v => v.id === parseInt(id));
          if (!vendor) {
            return res.status(404).json({ success: false, error: 'Vendor not found' });
          }
          res.status(200).json({ success: true, data: vendor });
        } else {
          res.status(200).json({ success: true, data: vendors });
        }
        break;

      case 'POST':
        // Create new vendor
        const newVendor = {
          id: nextId++,
          name: req.body.name || '',
          email: req.body.email || '',
          phone: req.body.phone || '',
          address: req.body.address || '',
          category: req.body.category || '',
          status: req.body.status || 'Active',
          rating: parseFloat(req.body.rating) || 0,
          contactPerson: req.body.contactPerson || '',
          ratings: {
            onTimeDelivery: 0,
            marketReputation: 0,
            qualityOfService: 0,
            costEffectiveness: 0
          },
          contractValue: 0,
          joinedDate: new Date().toISOString().split('T')[0],
          createdAt: new Date().toISOString()
        };
        
        vendors.push(newVendor);
        res.status(201).json({ success: true, data: newVendor });
        break;

      case 'PUT':
        // Update existing vendor
        const updateId = parseInt(req.query.id);
        const vendorIndex = vendors.findIndex(v => v.id === updateId);
        
        if (vendorIndex === -1) {
          return res.status(404).json({ success: false, error: 'Vendor not found' });
        }
        
        // Handle rating updates
        if (req.body.ratings) {
          const ratings = req.body.ratings;
          const avgRating = (
            (ratings.onTimeDelivery || 0) +
            (ratings.marketReputation || 0) +
            (ratings.qualityOfService || 0) +
            (ratings.costEffectiveness || 0)
          ) / 4;
          
          vendors[vendorIndex] = {
            ...vendors[vendorIndex],
            ...req.body,
            rating: avgRating,
            id: updateId,
            updatedAt: new Date().toISOString()
          };
        } else {
          vendors[vendorIndex] = {
            ...vendors[vendorIndex],
            ...req.body,
            id: updateId,
            updatedAt: new Date().toISOString()
          };
        }
        
        res.status(200).json({ success: true, data: vendors[vendorIndex] });
        break;

      case 'DELETE':
        // Delete vendor
        const deleteId = parseInt(req.query.id);
        const deleteIndex = vendors.findIndex(v => v.id === deleteId);
        
        if (deleteIndex === -1) {
          return res.status(404).json({ success: false, error: 'Vendor not found' });
        }
        
        const deletedVendor = vendors.splice(deleteIndex, 1)[0];
        res.status(200).json({ success: true, data: deletedVendor });
        break;

      default:
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Vendors API Error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

