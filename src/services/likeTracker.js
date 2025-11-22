// Simple module to track which post was just liked
// Not Redux/Context, just a simple reference
let lastLikedPostId = null;

export const setLikedPost = (postId) => {
  lastLikedPostId = postId;
};

export const getLikedPost = () => {
  const id = lastLikedPostId;
  lastLikedPostId = null;  // Clear it after reading
  return id;
};