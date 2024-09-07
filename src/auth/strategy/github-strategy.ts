import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { AuthService } from '../auth.service';
import { GitHubProfile } from '../interfaces/github-user';

@Injectable()
export class GithubAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GIT_HUB_CLIENT_ID,
      clientSecret: process.env.GIT_HUB_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/github/redirect`,
      scope: ['user', 'user:email'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GitHubProfile,
  ) {
    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      firstName: profile._json.name,
      lastName: '',
      providerAccessToken: accessToken,
      origin: 'GITHUB',
      locale: 'en',
    });
    return user;
  }
}
