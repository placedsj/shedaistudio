
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const ProjectService = {
  // Save a new roofing lead or inspection request
  async createLead(leadData: any) {
    if (!db) {
      console.log("Demo Mode: Simulated lead creation", leadData);
      return { success: true, id: "demo-lead-" + Math.random().toString(36).substr(2, 9) };
    }

    try {
      const docRef = await addDoc(collection(db, "leads"), {
        ...leadData,
        status: 'new',
        createdAt: serverTimestamp(),
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error adding lead: ", error);
      return { success: false, error };
    }
  },

  // Save a Shed configuration from the Enterprise Builder
  async saveShedConfig(config: any) {
    if (!db) {
      console.log("Demo Mode: Simulated shed configuration save", config);
      return { success: true, id: "demo-config-" + Math.random().toString(36).substr(2, 9) };
    }

    try {
      const docRef = await addDoc(collection(db, "shed_configs"), {
        ...config,
        createdAt: serverTimestamp(),
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error saving shed config: ", error);
      return { success: false, error };
    }
  }
};
