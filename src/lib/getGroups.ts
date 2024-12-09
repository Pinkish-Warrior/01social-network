import { fakeGroups, Group } from "@data/fakeGroups";

/*
export async function getGroupByID(groupId: number): Promise<Group | null> {
  // Fetch the group data from the API or data source
  // Replace this URL with your actual API endpoint
  const response = await fetch(`/api/groups/${groupId}`);
  
  if (!response.ok) {
    return null;
  }

  const group: Group = await response.json();
  return group;
}
*/

export async function getGroups(): Promise<Group[]> {
   await new Promise((resolve) => setTimeout(resolve, 1000));// Simulate async operation
  return fakeGroups;
}

export async function getGroupByID(groupId: number): Promise<Group | null> {
  console.log("grouID",groupId)
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
  
  // Find the group with the matching groupId
  const group = fakeGroups.find((group) => group.id === groupId);
  console.log("Found group:", group); // Log found group
  
  return group || null;
}