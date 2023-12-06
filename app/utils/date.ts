export const formatTimestampSeconds = (seconds?: number): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
  
    const formattedDate = seconds ? new Date(seconds * 1000).toLocaleString('en-US', options) : new Date().toLocaleString('en-US', options);
  
    return formattedDate.replace(/(\d+)(st|nd|rd|th)/, '$1<sup>$2</sup>'); // Add superscript to day
  }