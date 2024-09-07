export interface UserProfile {
  account_id: string;
  email: string;
  name: string;
  picture: string;
  account_status: string;
  characteristics: Characteristics;
  last_updated: string;
  nickname: string;
  locale: string;
  extended_profile: ExtendedProfile;
  account_type: string;
  email_verified: boolean;
}

interface ExtendedProfile {
  phone_numbers: any[];
  team_type: string;
}

interface Characteristics {
  not_mentionable: boolean;
}
