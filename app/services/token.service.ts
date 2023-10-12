import { JwtService } from '@nestjs/jwt'

import { AppConstant } from '@/shared/constants'

export class TokenService {
  static readonly atExpires: number = 60 * 15
  static readonly rtExpires: number = 60 * 60 * 24 * 7

  static readonly atSecretKey: string = AppConstant.tokens.at.SECRET_KEY
  static readonly rtSecretKey: string = AppConstant.tokens.rt.SECRET_KEY

  static async generateTokens(jwt: JwtService, payload: Record<string, any>) {
    const accessToken = await jwt.signAsync(payload, {
      expiresIn: this.atExpires,
      secret: this.atSecretKey,
    })

    const refreshToken = await jwt.signAsync(payload, {
      expiresIn: this.rtExpires,
      secret: this.rtSecretKey,
    })

    return {
      accessToken,
      refreshToken,
    }
  }
}
