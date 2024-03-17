// api.js
export const fetchProjectCount = async (status) => {
    try {
      const response = await fetch(`/api/project/Status/${status}`);
      const data = await response.json();
      return data.length; // Assuming data is an array of projects
    } catch (error) {
      console.error(`Error fetching ${status} project count:`, error);
      return 0; // Default to 0 in case of an error
    }
  };
  