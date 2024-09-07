import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SignInUserDto } from './dto-for-auth';
import { Public } from 'src/decorators/public-route';
import { AtlassianGuard } from './guards/guard-for-atlassian';
import { GetUser } from 'src/decorators/get-user';
import {
  AccessTokenAndProviderToken,
  ApiSuccessFullResponseWithMetaData,
  Token,
} from 'src/types/api-successful-response';
import { UserWithOutPassword } from 'src/types/user';
import { GoogleAuthGuard } from './guards/guard-for-google';
import { GithubAuthGuard } from './guards/guard-for-github';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post(`signup`)
  signup(@Body() createUser: CreateUserDto) {
    return this.authService.signup(createUser);
  }

  @Public()
  @Post(`signin`)
  signin(@Body() signinUser: SignInUserDto) {
    return this.authService.signin(signinUser);
  }

  @Public()
  @Get(`atlassian-signin`)
  @UseGuards(AtlassianGuard)
  handleAtlassianSignin() {}

  @Public()
  @Get(`atlassian-jira/redirect`)
  @UseGuards(AtlassianGuard)
  @Redirect()
  handleAtlassianJira(
    @GetUser()
    user: ApiSuccessFullResponseWithMetaData<
      UserWithOutPassword,
      AccessTokenAndProviderToken
    >,
  ) {
    return {
      url: `${process.env.REDIRECT_BASE_URL}/auth/login?access_token=${user.metaData.access_token}&providerAccessToken=${user.metaData.providerAccessToken}`,
    };
  }

  @Public()
  @Get(`google-signin`)
  @UseGuards(GoogleAuthGuard)
  handleGoogleSignin() {}

  @Public()
  @Get(`google/redirect`)
  @UseGuards(GoogleAuthGuard)
  @Redirect()
  handleGoogleRedirect(
    @GetUser()
    user: ApiSuccessFullResponseWithMetaData<
      UserWithOutPassword,
      AccessTokenAndProviderToken
    >,
  ) {
    return {
      url: `${process.env.REDIRECT_BASE_URL}/auth/login?access_token=${user.metaData.access_token}`,
    };
  }

  @Public()
  @Get(`github-signin`)
  @UseGuards(GithubAuthGuard)
  handleGithubSignin() {}

  @Public()
  @Get(`github/redirect`)
  @UseGuards(GithubAuthGuard)
  @Redirect()
  handleGithubRedirect(
    @GetUser()
    user: ApiSuccessFullResponseWithMetaData<
      UserWithOutPassword,
      AccessTokenAndProviderToken
    >,
  ) {
    return {
      url: `${process.env.REDIRECT_BASE_URL}/auth/login?access_token=${user.metaData.access_token}`,
    };
  }
}
