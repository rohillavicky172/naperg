import gql from 'graphql-tag'

export const CREATE_APP_SETTING_MUTATION = gql`
  mutation CreateAppSettingMutation($data: AppSettingCreateInput!) {
    createAppSetting(data: $data) {
      id
      name
      valueBoolean
      value
    }
  }
`

export const UPDATE_APP_SETTING_MUTATION = gql`
  mutation UpdateAppSettingMutation($data: AppSettingUpdateInput!, $where: AppSettingWhereUniqueInput!) {
    updateAppSetting(data: $data, where: $where) {
      id
      name
      valueBoolean
      value
    }
  }
`

export const APP_SETTINGS_QUERY = gql`
  query AppSettingsConnection($where: AppSettingWhereInput!) {
    appSettingsConnection(where: $where) {
      edges {
        node {
          id
          name
          valueBoolean
          value
        }
      }
    }
  }
`
export const DELETE_APP_SETTING_MUTATION = gql`
  mutation DeleteAppSetting($where: AppSettingWhereUniqueInput!) {
    deleteAppSetting(where: $where) {
      id
    }
  }
`
