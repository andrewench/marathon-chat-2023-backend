import { EnvConstantList } from './env.constant'
import { ResponseConstantList } from './response.constant'

export const AppConstant = {
  user: {
    DEFAULT_ROLE: 'student',
  },

  STATIC_PATH: '/uploads/images',

  ...EnvConstantList,
  ...ResponseConstantList,
}
