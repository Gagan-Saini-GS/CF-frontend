const uploadImage = async (event) => {
  const files = event.target.files;
  let ans = [];

  for (let i = 0; i < files.length; i++) {
    const base64 = await convertIntoBase64(files[i]);
    ans.push(base64);
  }

  return ans;
};

const convertIntoBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (err) => {
      reject(err);
    };
  });
};

export default uploadImage;
