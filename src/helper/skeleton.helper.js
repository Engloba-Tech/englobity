import { objectHelper } from './object.helper';

const SKELETON_KEY = 'skeleton_loading';
const SKELETON_KEY_NUMBER = 901901901901;
const SKELETON_KEY_DATE = 'May 1,1890 11:20:00';

function isSkeletonLoading(value) {
  if (objectHelper.isAnObject(value)) {
    return Object.keys(value).some(function (k) {
      return value[k] === SKELETON_KEY || value[k] === SKELETON_KEY_NUMBER || value[k] === SKELETON_KEY_DATE;
    });
  }

  return value === SKELETON_KEY || value === SKELETON_KEY_NUMBER || value === SKELETON_KEY_DATE;
}

export const skeletonHelper = {
  isSkeletonLoading
};
