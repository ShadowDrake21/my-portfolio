import { IProject } from '@shared/models/project.model';

export const checkIfArraysEqual = (
  arr1: IProject[],
  arr2: IProject[]
): boolean => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
      return false;
    }
  }
  return true;
};
