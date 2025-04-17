// Calculate how many days left until a given deadline
export const daysLeft = (deadline) => {
  const now = Date.now();
  const deadlineTime = new Date(deadline).getTime(); // convert deadline to timestamp

  const diff = deadlineTime - now;
  const days = diff / (1000 * 60 * 60 * 24); // ms to days

  // Just returning whole days — might need to handle negative values later
  return days.toFixed(0);
};

// Used to get how much of the goal has been raised as a percentage
export const calculateBarPercentage = (goal, raisedAmount) => {
  if (!goal) return 0; // avoid divide-by-zero (was a bug once)

  const percent = Math.round((raisedAmount * 100) / goal);
  return percent; // might want to clamp to 100 in UI instead
};

// Utility to check if a URL actually points to a valid image
export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  // This covers cached images (apparently onLoad doesn't always trigger then)
  if (img.complete) {
    callback(true);
  }

  img.onload = () => callback(true);
  img.onerror = () => callback(false); // fallback if it's not a valid image
};

