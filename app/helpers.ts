export function getTime(date: string) {
  return new Date(date).getTime();
}

export const toHumanReadableString = (date: string) => {
  let time = new Date(date).getTime();
  let now = Date.now();
  let diffInSeconds = (now - time) / 1000;
  let diffInMinutes = diffInSeconds / 60;
  let diffInHours = diffInMinutes / 60;
  let diffInDays = diffInHours / 24;

  if (diffInSeconds < 60) {
    return 'now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes.toFixed()}min ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours.toFixed()}h ago`;
  } else if (diffInDays < 1.5) {
    return 'yesterday';
  } else if (diffInDays < 30) {
    return `${diffInDays.toFixed()} days ago`;
  } else {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleString('en-US', options);
  }
};
