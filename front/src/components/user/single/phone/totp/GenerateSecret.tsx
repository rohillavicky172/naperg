import React from 'react'
import QRCode from 'qrcode'
import { TOTP_GENERATE_SECRET_MUTATION } from './GraphQL'
import { useMutation } from '@apollo/react-hooks'
import TotpFirstVerify from './TotpFirstVerify'

type Props = {
  userId: string
}

const GenerateSecret = (props: Props) => {
  const [dataUrl, setDataUrl] = React.useState('')
  const [generateSecret] = useMutation(TOTP_GENERATE_SECRET_MUTATION)

  React.useEffect(() => {
    const generateSecretF = async () => {
      const dataSecret = await generateSecret()
      const secret = dataSecret.data.totpGenerateSecret

      let data
      try {
        data = await QRCode.toDataURL(secret)
      } catch (e) {
        console.log(e)
        throw e
      }

      if (data) {
        setDataUrl(data)
      }
    }
    generateSecretF()
  }, [generateSecret])

  if (!dataUrl) {
    return <span>... Loading</span>
  }

  return (
    <>
      <h3>Authenticator App</h3>

      <p>Google Authenticator or Authy</p>
      <p>1. Scan barcode with your authenticator apps like Google Authenticator or Authy</p>
      <img alt="qrCode2fa" src={dataUrl} />
      <p>2. Enter the token given by your app</p>
      <TotpFirstVerify userId={props.userId} />
    </>
  )
}

export default GenerateSecret
