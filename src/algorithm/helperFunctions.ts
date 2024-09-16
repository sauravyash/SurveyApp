export function getAgePoints(age: number, points: number[]): number {
  const ageGroups = [65, 70, 75, 80, 85, 90];
  for (let i = 0; i < ageGroups.length; i++) {
    if (age < ageGroups[i]) {
      return points[i];
    }
  }
  return points[points.length - 1];
}