import config from '@payload-config'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'

export const OPTIONS_handler = REST_OPTIONS(config)
export const GET_handler = REST_GET(config)
export const POST_handler = REST_POST(config)
export const DELETE_handler = REST_DELETE(config)
export const PATCH_handler = REST_PATCH(config)
export const PUT_handler = REST_PUT(config)

export { OPTIONS_handler as OPTIONS, GET_handler as GET, POST_handler as POST, DELETE_handler as DELETE, PATCH_handler as PATCH, PUT_handler as PUT }
