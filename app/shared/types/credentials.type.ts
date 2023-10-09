type TAllCredentials = Record<
  'firstName' | 'lastName' | 'login' | 'email' | 'password',
  string
>

export type TLoginCredentials = Pick<TAllCredentials, 'login' | 'password'>
export type TSignUpCredentials = TAllCredentials
