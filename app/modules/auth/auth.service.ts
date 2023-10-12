import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { CryptoService, PrismaService, TokenService } from '@/services'

import { AppConstant } from '@/shared/constants'

import { TLoginCredentials, TSignUpCredentials } from '@/shared/types'

const { responseMessage } = AppConstant

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login({ login, password }: TLoginCredentials) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            login,
          },
        ],
      },
    })

    if (!user) throw new NotFoundException(responseMessage.login.USER_NOT_FOUND)

    const isVerifiedPassword = await CryptoService.verify(
      user.password,
      password,
    )

    if (!isVerifiedPassword)
      throw new ForbiddenException(responseMessage.login.INVALID_CREDENTIALS)

    const { accessToken, refreshToken } = await TokenService.generateTokens(
      this.jwtService,
      {
        id: user.id,
        role: AppConstant.user.DEFAULT_ROLE,
      },
    )

    return {
      accessToken,
      refreshToken,
    }
  }

  async signUp({ login, email, password, ...others }: TSignUpCredentials) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            login,
          },
          {
            email,
          },
        ],
      },
    })

    if (user)
      throw new ConflictException(responseMessage.signUp.USER_ALREADY_EXIST)

    const hashedPassword = await CryptoService.encrypt(password)

    const createdUser = await this.prisma.user.create({
      data: {
        login,
        email,
        password: hashedPassword,
        ...others,
      },
    })

    const { accessToken, refreshToken } = await TokenService.generateTokens(
      this.jwtService,
      {
        id: createdUser.id,
        role: createdUser.role,
      },
    )

    return {
      accessToken,
      refreshToken,
    }
  }

  async refresh(body: { refreshToken: string }) {
    try {
      const { id, role } = await this.jwtService.verifyAsync(
        body.refreshToken,
        {
          secret: AppConstant.tokens.rt.SECRET_KEY,
        },
      )

      const { accessToken, refreshToken } = await TokenService.generateTokens(
        this.jwtService,
        {
          id,
          role,
        },
      )

      return {
        accessToken,
        refreshToken,
      }
    } catch (err) {
      throw new UnauthorizedException()
    }
  }
}
