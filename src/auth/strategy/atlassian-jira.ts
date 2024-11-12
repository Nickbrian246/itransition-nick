import { Strategy } from 'passport-oauth2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AssociatedUserDto } from '../dto-for-auth';
import { UserProfile } from '../interfaces/associated-user';
import { localesAllowed } from '../utils/locales.allowed';
import { AuthService } from '../auth.service';

@Injectable()
export class AtlassianStrategy extends PassportStrategy(Strategy, 'atlassian') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.ATLASSIAN_JIRA_CLIENT_ID,
      clientSecret: process.env.ATLASSIAN_JIRA_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/atlassian-jira/redirect`,
      scope: [
        'read:jira-user',
        'read:jira-work',
        'read:me',
        'read:account',
        'write:jira-work',
      ],
      authorizationURL: `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=sHWoLCr7MiqP0tmjrw3KQMbr1j5vqqQG&scope=read%3Ajira-work%20manage%3Ajira-project%20manage%3Ajira-configuration%20read%3Ajira-user%20write%3Ajira-work%20manage%3Ajira-webhook%20manage%3Ajira-data-provider&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Fatlassian-jira%2Fredirect&state=hOLA&response_type=code&prompt=consent`,
      tokenURL: 'https://auth.atlassian.com/oauth/token',
      passReqToCallback: false, // No necesitamos acceso directo a la request, solo el token y el perfil
    });
  }

  // Passport se encargará de obtener el accessToken y refreshToken, y llamará a esta función
  async validate(accessToken: string, refreshToken: string, profile: any) {
    // Aquí puedes manejar el perfil del usuario e implementar la lógica para crear/verificar usuarios en tu sistema

    const req = await fetch('https://api.atlassian.com/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Corregido el uso de backticks y comillas
        Accept: 'application/json', // Falta una coma después de Authorization y comillas corregidas
      },
    });
    const userData: UserProfile = await req.json();

    const userLocale = localesAllowed[userData.locale];
    const user: AssociatedUserDto = {
      email: userData.email,
      firstName: userData.name,
      lastName: userData.nickname,
      origin: 'ATLASSIAN',
      locale: !!userLocale ? userLocale : 'en',
      providerAccessToken: accessToken,
    };
    const userValidated = await this.authService.validateUser(user);
    // Retorna los datos del usuario autenticado o crea un nuevo usuario en la base de datos

    return userValidated;
  }
}
