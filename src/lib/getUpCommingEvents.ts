import { fakeUpComingEvents,upComingEvent} from "@data/fakeUpComingEventList";


  /* later use*/
/*   const API_URL = "http://localhost:8000/api/upcoming-events";

  export async function getUpComingEventsList(userId: number): Promise<upComingEvent[]> {
    try {
      // Construct the URL with the user ID
      const url = `${API_URL}?user_id=${userId}`;
      
      const response = await fetch(url);
  
      // Check if the response status is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`Failed to fetch upcoming events: ${response.statusText}`);
      }
  
      // Parse and return the JSON data
      const data: upComingEvent[] = await response.json();
      return data;
    } catch (error) {
      // Handle errors (e.g., log them or display a message to the user)
      console.error(error);
      throw new Error('Error fetching upcoming events');
    }
  } */
 
 /* now testing*/
export async function getUpComingEventsList():Promise<upComingEvent[]> {
  
 await new Promise((resolve) => setTimeout(resolve, 1000));// Simulate async operation

  return fakeUpComingEvents;
}
