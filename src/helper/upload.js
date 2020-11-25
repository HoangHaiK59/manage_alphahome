import { instance } from './axios';
export class UploadAdapter {
    constructor(uploadAdapter) {
        this.uploadAdapter = uploadAdapter;
    }
    async upload() {
        return this.uploadAdapter.file.then((file) => {
          const data = new FormData()
          data.append("formFile", file)
          const genericError = `Couldn't upload file: ${file.name}.`
    
          return instance({
            data,
            method: "POST",
            url: "Upload/UploadImage",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
            console.log(this.uploadAdapter)
            console.log(progressEvent)
              this.uploadAdapter.uploadTotal = progressEvent.total
              this.uploadAdapter.uploaded = progressEvent.loaded
              const uploadPercentage = parseInt(
                Math.round((progressEvent.loaded / progressEvent.total) * 100)
              )
            },
          })
            .then(({ data }) => ({ default: data.url }))
            .catch(({ error }) => Promise.reject(error?.message ?? genericError))
        })
      }

      abort() {
        return Promise.reject()
      }
}

// CKEditor FileRepository
export function uploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (uploadAdapter) =>
      new UploadAdapter(uploadAdapter)
}