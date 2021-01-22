import React from 'react'
import { Grid } from '@material-ui/core'
import CloseNoData from '../home/CloseNoData'
import { useHistory } from 'react-router-dom'
import './Style.css'
// import UseWindowDimensions from '../../UseWindowDimensions'

type Props = {
  userRoleCompanieId: string
  title: string
  type: string
  imgSrc: string
  cta: string
  linkCta: string
  subTitle: string
  endText: string
  bullets: Array<string>
}

const NoDataTemplate = (props: Props) => {
  const history = useHistory()

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} className="">
          <div className="primary textSize10">
            <h2 className="primary textSize12">{props.title}</h2>
            <p>{props.subTitle}</p>
            <ul>
              {props.bullets.map((bullet, i) => (
                <li key={'bullet' + i}>{bullet}</li>
              ))}
            </ul>
            <p>{props.endText}</p>
            {props.cta && (
              <div className="">
                <div style={{ height: '40px' }} />

                <CloseNoData
                  color={'secondary'}
                  variant={'contained'}
                  cta={props.cta}
                  onClose={() => {
                    if (props.linkCta) {
                      history.push(props.linkCta)
                    }
                  }}
                  userRoleCompanieId={props.userRoleCompanieId}
                  type={props.type}
                />
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={6} className="tac">
          <img width="350px" src={props.imgSrc} alt={props.title} className="imageNoData" />
        </Grid>
      </Grid>
    </>
  )
}

export default NoDataTemplate
