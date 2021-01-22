// import { useState, useEffect } from 'react'

// function getWindowDimensions() {
//   const { innerWidth: width, innerHeight: height } = window
//   const isMobile = width < 960 ? true : false
//   return {
//     width,
//     height,
//     isMobile
//   }
// }

// export default function UseWindowDimensions() {
//   const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

//   useEffect(() => {
//     function handleResize() {
//       setWindowDimensions(getWindowDimensions())
//     }

//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   return windowDimensions
// }

const UseWindowDimensions = {
  // isMobile: window.innerWidth < 960 ? true : false,
  isMobile: () => {
    // console.log('isMobile2')
    return window.innerWidth < 960 ? true : false
  },
}
export default UseWindowDimensions
