// In-memory storage for demo purposes
let workflows = [
  {
    id: 1,
    name: 'Contract Approval Process',
    description: 'Standard approval workflow for new contracts',
    status: 'Active',
    type: 'Contract Approval',
    steps: [
      { id: 1, name: 'Procurement Review', assignee: 'Procurement Manager', status: 'completed', order: 1 },
      { id: 2, name: 'Finance Approval', assignee: 'Finance Controller', status: 'pending', order: 2 },
      { id: 3, name: 'Executive Sign-off', assignee: 'Executive Management', status: 'pending', order: 3 }
    ],
    triggerEvent: 'Contract Creation',
    createdDate: '2024-01-01',
    lastModified: '2024-01-15'
  },
  {
    id: 2,
    name: 'Vendor Onboarding',
    description: 'Process for onboarding new vendors',
    status: 'Active',
    type: 'Vendor Management',
    steps: [
      { id: 1, name: 'Documentation Review', assignee: 'Procurement Manager', status: 'completed', order: 1 },
      { id: 2, name: 'Compliance Check', assignee: 'Compliance Officer', status: 'completed', order: 2 },
      { id: 3, name: 'System Setup', assignee: 'IT Administrator', status: 'completed', order: 3 }
    ],
    triggerEvent: 'Vendor Registration',
    createdDate: '2024-01-10',
    lastModified: '2024-02-01'
  },
  {
    id: 3,
    name: 'Contract Renewal Alert',
    description: 'Automated alerts for contract renewals',
    status: 'Active',
    type: 'Notification',
    steps: [
      { id: 1, name: '30-day Alert', assignee: 'System', status: 'completed', order: 1 },
      { id: 2, name: '15-day Alert', assignee: 'System', status: 'pending', order: 2 },
      { id: 3, name: 'Final Notice', assignee: 'System', status: 'pending', order: 3 }
    ],
    triggerEvent: 'Contract Expiration',
    createdDate: '2024-01-05',
    lastModified: '2024-03-01'
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
        // Get all workflows or specific workflow by ID
        const { id, action } = req.query;
        
        if (action === 'pending') {
          // Get pending approvals
          const pendingWorkflows = workflows.filter(w => 
            w.steps.some(step => step.status === 'pending')
          );
          res.status(200).json({ success: true, data: pendingWorkflows });
        } else if (id) {
          const workflow = workflows.find(w => w.id === parseInt(id));
          if (!workflow) {
            return res.status(404).json({ success: false, error: 'Workflow not found' });
          }
          res.status(200).json({ success: true, data: workflow });
        } else {
          res.status(200).json({ success: true, data: workflows });
        }
        break;

      case 'POST':
        // Create new workflow or handle approval actions
        const { action: postAction, workflowId, stepId, decision } = req.body;
        
        if (postAction === 'approve' || postAction === 'reject') {
          // Handle approval/rejection
          const workflow = workflows.find(w => w.id === parseInt(workflowId));
          if (!workflow) {
            return res.status(404).json({ success: false, error: 'Workflow not found' });
          }
          
          const step = workflow.steps.find(s => s.id === parseInt(stepId));
          if (!step) {
            return res.status(404).json({ success: false, error: 'Workflow step not found' });
          }
          
          step.status = postAction === 'approve' ? 'approved' : 'rejected';
          step.completedAt = new Date().toISOString();
          
          // If approved, move to next step
          if (postAction === 'approve') {
            const nextStep = workflow.steps.find(s => s.order === step.order + 1);
            if (nextStep && nextStep.status === 'pending') {
              // Next step is already pending, no change needed
            } else if (nextStep) {
              nextStep.status = 'pending';
            }
          }
          
          workflow.lastModified = new Date().toISOString();
          res.status(200).json({ success: true, data: workflow });
        } else {
          // Create new workflow
          const newWorkflow = {
            id: nextId++,
            name: req.body.name || '',
            description: req.body.description || '',
            status: req.body.status || 'Draft',
            type: req.body.type || 'Custom',
            steps: req.body.steps || [],
            triggerEvent: req.body.triggerEvent || '',
            createdDate: new Date().toISOString().split('T')[0],
            lastModified: new Date().toISOString(),
            createdAt: new Date().toISOString()
          };
          
          workflows.push(newWorkflow);
          res.status(201).json({ success: true, data: newWorkflow });
        }
        break;

      case 'PUT':
        // Update existing workflow
        const updateId = parseInt(req.query.id);
        const workflowIndex = workflows.findIndex(w => w.id === updateId);
        
        if (workflowIndex === -1) {
          return res.status(404).json({ success: false, error: 'Workflow not found' });
        }
        
        workflows[workflowIndex] = {
          ...workflows[workflowIndex],
          ...req.body,
          id: updateId,
          lastModified: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        res.status(200).json({ success: true, data: workflows[workflowIndex] });
        break;

      case 'DELETE':
        // Delete workflow
        const deleteId = parseInt(req.query.id);
        const deleteIndex = workflows.findIndex(w => w.id === deleteId);
        
        if (deleteIndex === -1) {
          return res.status(404).json({ success: false, error: 'Workflow not found' });
        }
        
        const deletedWorkflow = workflows.splice(deleteIndex, 1)[0];
        res.status(200).json({ success: true, data: deletedWorkflow });
        break;

      default:
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Workflows API Error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

