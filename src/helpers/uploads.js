import axios from 'axios'

export const uploadImage = async (base64, originalFilename, filenameToSave, size) => {
  return new Promise(async (resolve, reject) => {
    const formData = new FormData()
    formData.append('fileBase64', base64)
    formData.append('filename', filenameToSave)
    formData.append('originalFilename', originalFilename)
    formData.append('size', size)
    try {
      const response = await axios.post(
        process.env.FILE_SERVER_URL + '/upload/simple-image',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )
      resolve(response.data)
    } catch (err) {
      reject(err)
    }
  })
}
