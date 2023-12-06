const getDaySuffix = (day: number): string => {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const formatTimestampSeconds = (seconds?: number, dayOnly: boolean = false): string => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDate = seconds ? new Date(seconds * 1000) : new Date();

  const dateString = formattedDate.toLocaleDateString('en-US', dateOptions);
  const timeString = formattedDate.toLocaleString('en-US', timeOptions);

  if (dayOnly) {
    const daySuffix = getDaySuffix(formattedDate.getDate());
    return `${dateString.replace(/\d+$/, (date) => date + daySuffix)}`;
  } else {
    const daySuffix = getDaySuffix(formattedDate.getDate());
    return `${dateString.replace(/\d+$/, (date) => date + daySuffix)} at ${timeString}`;
  }
};
