function isMoreThanThreeHoursSinceLastTime(lastTime) {
  const currentTime = new Date();

  // currentTime.setHours(currentTime.getHours() + 4);
  const timeDifference = (currentTime - lastTime) / (1000 * 60 * 60); // Calculating time difference in hours

  return timeDifference >= 3;
}

export {isMoreThanThreeHoursSinceLastTime};
