function retry(fn, retriesLeft = 5, interval = 1000) {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch(error => {
        console.log(error)
        setTimeout(() => {
          if (retriesLeft === 1) {
            // reject('maximum retries exceeded');
            reject(error)
            return
          }

          // Passing on "reject" is the important part
          console.log('looping')
          // retry(fn, retriesLeft - 1, interval).then(resolve, reject)
          if (process.env.REACT_APP_ENV === 'production') {
            window.location.reload()
          }
        }, interval)
      })
  })
}

// export const URL_SERVER_MEDIA = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '/media/'
export default retry
