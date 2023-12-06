export const formatFirebaseTimestamp = (firebaseTimestamp: string): string => {
    const timestampInMillis = parseFloat(firebaseTimestamp) / 1000; // Convert to milliseconds
  
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
  
    const formattedDate = new Date(timestampInMillis).toLocaleString('en-US', options);
  
    return formattedDate.replace(/(\d+)(st|nd|rd|th)/, '$1<sup>$2</sup>'); // Add superscript to day
  }