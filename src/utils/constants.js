const options = {
  title: 'Select Image',
  cameraType: "back",
  maxWidth: 256,
  maxHeight: 256,
  noData: true,
  mediaType: 'photo',
  includeBase64: true,
}

const profileSteps = ["name", "media", "relationship", "dob", "additional"];
const profileDefaultKeys = ["name", "media", "relationship", "dob"];
const profileAdditionalKeys = ["Address", "Phone Number", "School", "Favorite Color", "Favorite Food", "Favorite Animal"];

export {
  options,
  profileSteps,
  profileDefaultKeys,
  profileAdditionalKeys,
}