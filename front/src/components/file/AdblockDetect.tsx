import React, { useState, useEffect } from 'react'

const AdblockDetect = (props: any) => {
  const [usingAdblock, setUsingAdblock] = useState(false)

  let fakeAdBanner
  useEffect(() => {
    if (fakeAdBanner) {
      setUsingAdblock(fakeAdBanner.offsetHeight === 0)
    }
  }, [fakeAdBanner])

  if (usingAdblock === true) {
    return <>Disable Adblock to Download</>
  }

  return (
    <>
      <div
        ref={r => (fakeAdBanner = r)}
        style={{ height: '1px', width: '1px', visibility: 'hidden', pointerEvents: 'none' }}
        className="adBanner"
      />
      {props.children}
    </>
  )
}

export default AdblockDetect
