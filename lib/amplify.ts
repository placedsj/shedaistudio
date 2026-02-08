

import { generateClient } from 'aws-amplify/data';

// Generating a generic client. 
// In a full setup, you would import type { Schema } from '../amplify/data/resource';
export const client = generateClient() as any;