import { fakeGroupInvitations, GroupInvitation } from "@data/fakeGroupInvitations";

export async function getGroupInvitations():Promise<GroupInvitation[]> {
  
  /* later use
/*   const response = await fetch(`/api/groups/invitations?invitee_id=${userId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch invitations');
  }

  return response.json(); */

 /* now only return all the filter userId*/ 
   
 await new Promise((resolve) => setTimeout(resolve, 1000));// Simulate async operation
  return fakeGroupInvitations
}
