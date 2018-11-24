function calculatePercentage(root, value) {
  if (!value) return 0;
  else return Math.round((value / root) * 100);
}

export default calculatePercentage;
