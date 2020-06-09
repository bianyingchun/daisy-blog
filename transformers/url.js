import apiConfig from '~/config/api.config'
import { getArticleDetailRoute } from '~/transformers/route'

export const getFileCDNUrl = (uri) => {
  return `${apiConfig.CDN}${uri}`
}

export const getFileProxyUrl = (uri) => {
  return `${apiConfig.PROXY}${uri}`
}

export const getPageUrl = (uri) => {
  return `${apiConfig.FE}${uri}`
}

export const getArticleDetailPageUrl = (articleID) => {
  return getPageUrl(getArticleDetailRoute(articleID))
}
