export const getRandomColor = (fullName: string) => {
  let hash = 0;
  for (let i = 0; i < fullName.length; i++) {
    hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 255;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
};
