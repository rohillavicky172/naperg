import React from 'react'

type Props = {
  nameFile: string
  type: string
}

const ViewFilePrivate = (props: Props) => {
  return (
    <>
      {props.type === 'application/pdf' && <img alt={'iconFile'} className="imageSize5" src={'/icon/pdf.png'} />}
      {props.type === 'image/jpeg' && <img alt={'iconFile'} className="imageSize5" src={'/icon/jpeg.png'} />}
      {props.type === 'image/jpg' && <img alt={'iconFile'} className="imageSize5" src={'/icon/jpg.png'} />}
      {props.type === 'image/png' && <img alt={'iconFile'} className="imageSize5" src={'/icon/png.png'} />}
    </>
  )
}

export default ViewFilePrivate
