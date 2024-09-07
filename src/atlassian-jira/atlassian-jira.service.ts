import { Injectable } from '@nestjs/common';
import { CreateAtlassianJiraDto } from './dto/create-atlassian-jira.dto';
import { UpdateAtlassianJiraDto } from './dto/update-atlassian-jira.dto';

@Injectable()
export class AtlassianJiraService {
  async create() {
    try {
      // fetch('https://itransition-nb.atlassian.net/rest/api/2/project', {
      //   headers: {
      //     Authorization:
      //       'Basic eyJraWQiOiJhdXRoLmF0bGFzc2lhbi5jb20tQUNDRVNTLWE5Njg0YTZlLTY4MjctNGQ1Yi05MzhjLWJkOTZjYzBiOTk0ZCIsImFsZyI6IlJTMjU2In0.eyJqdGkiOiI1YzE1ZmYzNC05MWFlLTQ0YzktYTRmMi03YzU3OWQwZDhjZTYiLCJzdWIiOiI3MTIwMjA6YmEzYTk0YjQtNjA1OC00MjA5LWJjNTUtMDFlZTc3ZDEyY2Y5IiwibmJmIjoxNzI1NDIzNTkwLCJpc3MiOiJodHRwczovL2F1dGguYXRsYXNzaWFuLmNvbSIsImlhdCI6MTcyNTQyMzU5MCwiZXhwIjoxNzI1NDI3MTkwLCJhdWQiOiJzSFdvTENyN01pcVAwdG1qcnczS1FNYnIxajV2cXFRRyIsImNsaWVudF9pZCI6InNIV29MQ3I3TWlxUDB0bWpydzNLUU1icjFqNXZxcVFHIiwiaHR0cHM6Ly9pZC5hdGxhc3NpYW4uY29tL3VqdCI6ImEyNWU1YTYzLWI4MGEtNDJiYi1iNDcwLWIzOTI3NzUyNGQzNyIsInNjb3BlIjoicmVhZDpqaXJhLXdvcmsgcmVhZDphY2NvdW50IHJlYWQ6bWUgcmVhZDpqaXJhLXVzZXIiLCJodHRwczovL2lkLmF0bGFzc2lhbi5jb20vYXRsX3Rva2VuX3R5cGUiOiJBQ0NFU1MiLCJodHRwczovL2F0bGFzc2lhbi5jb20vZmlyc3RQYXJ0eSI6ZmFsc2UsImh0dHBzOi8vYXRsYXNzaWFuLmNvbS92ZXJpZmllZCI6dHJ1ZSwiaHR0cHM6Ly9hdGxhc3NpYW4uY29tL29hdXRoQ2xpZW50SWQiOiJzSFdvTENyN01pcVAwdG1qcnczS1FNYnIxajV2cXFRRyIsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS9wcm9jZXNzUmVnaW9uIjoidXMtZWFzdC0xIiwiaHR0cHM6Ly9hdGxhc3NpYW4uY29tL3N5c3RlbUFjY291bnRJZCI6IjcxMjAyMDplZTMxY2ZiMi0xZWYwLTRkOGUtYTMzNS1jMTZhYWRkZjI2MWYiLCJodHRwczovL2F0bGFzc2lhbi5jb20vc3lzdGVtQWNjb3VudEVtYWlsIjoiMTAwOGMxNzMtNzdiYy00YmY2LTgxZGYtYjlmNDJiNDFlMjU5QGNvbm5lY3QuYXRsYXNzaWFuLmNvbSIsImh0dHBzOi8vYXRsYXNzaWFuLmNvbS9lbWFpbERvbWFpbiI6ImdtYWlsLmNvbSIsImh0dHBzOi8vYXRsYXNzaWFuLmNvbS8zbG8iOnRydWUsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS9zZXNzaW9uX2lkIjoiNGM1OGFhMTMtOWY0YS00NzM2LThjZmEtYzQxYmVmYjdiNjUwIiwiaHR0cHM6Ly9pZC5hdGxhc3NpYW4uY29tL3ZlcmlmaWVkIjp0cnVlLCJodHRwczovL2F0bGFzc2lhbi5jb20vc3lzdGVtQWNjb3VudEVtYWlsRG9tYWluIjoiY29ubmVjdC5hdGxhc3NpYW4uY29tIn0.FLg7et-bY_ulgrVX6fyeMy8MOXvHhiro3y7DT50HaMnxLxXWWvfZGI1Rm1RjA3ywphMjQl-6r5qLqiUTSt3JHl9grOEnTJfQzD8Dr60ZGCl9WNhtQ-YaO9Fn9sFnwVPfrr9TMmitH2TNLcouXbXFauErSJ7_bkcYXtOtaYNzHV5C8Ela1_BT4FCSJnWMe3pEFXblEHhDQfqpRHIA7p3nIFD0CZ0BxbQJNX8MmLrLzN9x7nBrevjhBG3G3duRBBStpaQYSng6e4AYDbSCkFGubjOXowzbjs3pG4w9Qh3lqKwK54q4HWn0dhhQD4P7uS3vTiWNHKh9X9O-bO08fzTUUg',
      //   },
      // })
      //   .then((res) => res.json())
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err));
      // const issuesTypes = await fetch(
      //   'https://itransition-nb.atlassian.net/rest/api/3/issuetype',
      //   {
      //     headers: {
      //       Authorization: `Basic eyJraWQiOiJhdXRoLmF0bGFzc2lhbi5jb20tQUNDRVNTLWE5Njg0YTZlLTY4MjctNGQ1Yi05MzhjLWJkOTZjYzBiOTk0ZCIsImFsZyI6IlJTMjU2In0.eyJqdGkiOiJjNDk1MGRiYy1lNWI0LTRkMWEtYTUzNy04Njk5ODhkMDVkMDQiLCJzdWIiOiI3MTIwMjA6YmEzYTk0YjQtNjA1OC00MjA5LWJjNTUtMDFlZTc3ZDEyY2Y5IiwibmJmIjoxNzI1NDcwODMxLCJpc3MiOiJodHRwczovL2F1dGguYXRsYXNzaWFuLmNvbSIsImlhdCI6MTcyNTQ3MDgzMSwiZXhwIjoxNzI1NDc0NDMxLCJhdWQiOiJzSFdvTENyN01pcVAwdG1qcnczS1FNYnIxajV2cXFRRyIsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS91anQiOiI1OTU2NTgzNS0xNjZmLTRiNzctYjViNy1iMGNhZjBlN2NmNTAiLCJjbGllbnRfaWQiOiJzSFdvTENyN01pcVAwdG1qcnczS1FNYnIxajV2cXFRRyIsInNjb3BlIjoicmVhZDpqaXJhLXdvcmsgcmVhZDphY2NvdW50IHJlYWQ6bWUgcmVhZDpqaXJhLXVzZXIiLCJodHRwczovL2lkLmF0bGFzc2lhbi5jb20vYXRsX3Rva2VuX3R5cGUiOiJBQ0NFU1MiLCJodHRwczovL2F0bGFzc2lhbi5jb20vZmlyc3RQYXJ0eSI6ZmFsc2UsImh0dHBzOi8vYXRsYXNzaWFuLmNvbS92ZXJpZmllZCI6dHJ1ZSwiaHR0cHM6Ly9hdGxhc3NpYW4uY29tL29hdXRoQ2xpZW50SWQiOiJzSFdvTENyN01pcVAwdG1qcnczS1FNYnIxajV2cXFRRyIsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS9wcm9jZXNzUmVnaW9uIjoidXMtZWFzdC0xIiwiaHR0cHM6Ly9hdGxhc3NpYW4uY29tL3N5c3RlbUFjY291bnRJZCI6IjcxMjAyMDplZTMxY2ZiMi0xZWYwLTRkOGUtYTMzNS1jMTZhYWRkZjI2MWYiLCJodHRwczovL2F0bGFzc2lhbi5jb20vc3lzdGVtQWNjb3VudEVtYWlsIjoiMTAwOGMxNzMtNzdiYy00YmY2LTgxZGYtYjlmNDJiNDFlMjU5QGNvbm5lY3QuYXRsYXNzaWFuLmNvbSIsImh0dHBzOi8vYXRsYXNzaWFuLmNvbS9lbWFpbERvbWFpbiI6ImdtYWlsLmNvbSIsImh0dHBzOi8vYXRsYXNzaWFuLmNvbS8zbG8iOnRydWUsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS9zZXNzaW9uX2lkIjoiNGM1OGFhMTMtOWY0YS00NzM2LThjZmEtYzQxYmVmYjdiNjUwIiwiaHR0cHM6Ly9pZC5hdGxhc3NpYW4uY29tL3ZlcmlmaWVkIjp0cnVlLCJodHRwczovL2F0bGFzc2lhbi5jb20vc3lzdGVtQWNjb3VudEVtYWlsRG9tYWluIjoiY29ubmVjdC5hdGxhc3NpYW4uY29tIn0.MhNDxgbBTQvsWVXSAVRo0Fb8KX9vGL5k_rcCpyqpKbalbmQzL8FbHArTJa8famjSP2PEtuuflX2DzMa5UOyfI6YRDIbjAH3ttiDravVd1ruc9I--bH2ix00PjGrkSRAtCBWbWPEcYnkMRrCkljfHZ6pnswAIKUTs2CxvxJ0alTWVD1RiRMAI5YLNRfWtfHYV9xi_quV0M-sbI34hqUbgka4yIjCaEuMnAJmrr3OP1F1oiuzky7hlIV72hW11hE0VjvPqGuma1ngzXjgMaj1yQWC7LOA-xqfJn3PXnsWBjlEAr2z7TzRuIfoahRP3V03Nl-FmT1QQCeX-lOFibGhg7A
      //       `,
      //       Accept: 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //   },
      // );
      // const response = await issuesTypes.json();
      const data = {
        fields: {
          project: {
            key: 'SCRUM',
          },
          summary: 'Issue Summary',
          description: {
            type: 'doc',
            version: 1,
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'This is a sample description.',
                  },
                ],
              },
            ],
          },
          issuetype: {
            name: 'Bug',
          },
        },
      };

      const req = await fetch(
        `https://api.atlassian.com/ex/jira/f28265c1-9f72-4bcb-ac78-82d5d6d28765/rest/api/3/issue`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer eyJraWQiOiJhdXRoLmF0bGFzc2lhbi5jb20tQUNDRVNTLWE5Njg0YTZlLTY4MjctNGQ1Yi05MzhjLWJkOTZjYzBiOTk0ZCIsImFsZyI6IlJTMjU2In0.eyJqdGkiOiI0M2RkZTI1OS0zNGY1LTRmOTAtYjQ1Zi02NGU0NjRjODY1YjkiLCJzdWIiOiI3MTIwMjA6YmEzYTk0YjQtNjA1OC00MjA5LWJjNTUtMDFlZTc3ZDEyY2Y5IiwibmJmIjoxNzI1NTA4NjIxLCJpc3MiOiJodHRwczovL2F1dGguYXRsYXNzaWFuLmNvbSIsImlhdCI6MTcyNTUwODYyMSwiZXhwIjoxNzI1NTEyMjIxLCJhdWQiOiJzSFdvTENyN01pcVAwdG1qcnczS1FNYnIxajV2cXFRRyIsInNjb3BlIjoicmVhZDpqaXJhLXdvcmsgcmVhZDphY2NvdW50IHdyaXRlOmppcmEtd29yayByZWFkOm1lIHJlYWQ6amlyYS11c2VyIiwiY2xpZW50X2lkIjoic0hXb0xDcjdNaXFQMHRtanJ3M0tRTWJyMWo1dnFxUUciLCJodHRwczovL2lkLmF0bGFzc2lhbi5jb20vYXRsX3Rva2VuX3R5cGUiOiJBQ0NFU1MiLCJodHRwczovL2F0bGFzc2lhbi5jb20vZmlyc3RQYXJ0eSI6ZmFsc2UsImh0dHBzOi8vYXRsYXNzaWFuLmNvbS92ZXJpZmllZCI6dHJ1ZSwiaHR0cHM6Ly9hdGxhc3NpYW4uY29tL29hdXRoQ2xpZW50SWQiOiJzSFdvTENyN01pcVAwdG1qcnczS1FNYnIxajV2cXFRRyIsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS9wcm9jZXNzUmVnaW9uIjoidXMtZWFzdC0xIiwiaHR0cHM6Ly9hdGxhc3NpYW4uY29tL3N5c3RlbUFjY291bnRJZCI6IjcxMjAyMDplZTMxY2ZiMi0xZWYwLTRkOGUtYTMzNS1jMTZhYWRkZjI2MWYiLCJodHRwczovL2F0bGFzc2lhbi5jb20vc3lzdGVtQWNjb3VudEVtYWlsIjoiMTAwOGMxNzMtNzdiYy00YmY2LTgxZGYtYjlmNDJiNDFlMjU5QGNvbm5lY3QuYXRsYXNzaWFuLmNvbSIsImh0dHBzOi8vYXRsYXNzaWFuLmNvbS9lbWFpbERvbWFpbiI6ImdtYWlsLmNvbSIsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS91anQiOiI0MzNiNTI5Ni1kNzRhLTQzYjMtOWNlOS1mMjFkOTkxYjZhYjciLCJodHRwczovL2F0bGFzc2lhbi5jb20vM2xvIjp0cnVlLCJodHRwczovL2lkLmF0bGFzc2lhbi5jb20vc2Vzc2lvbl9pZCI6IjRjNThhYTEzLTlmNGEtNDczNi04Y2ZhLWM0MWJlZmI3YjY1MCIsImh0dHBzOi8vaWQuYXRsYXNzaWFuLmNvbS92ZXJpZmllZCI6dHJ1ZSwiaHR0cHM6Ly9hdGxhc3NpYW4uY29tL3N5c3RlbUFjY291bnRFbWFpbERvbWFpbiI6ImNvbm5lY3QuYXRsYXNzaWFuLmNvbSJ9.3oMw-GdxueGJzUFNjBv4hCFTMd4iFHw4OrLIRzU7aXCZai2QOcSU4MU0oTVgslzqBZwkQ4mlfaAJYTamVzrbgyBMiT15HotvFSVow9nzsIC8BnpAELksxKMWWc7kxG8mUt5J1O63y-lubWGrbxCRf7HpWSxvfx3k6ya-_eqGpKpzPpQVbng39WT3L08o2dHdx2CiKYAeLPCqoCFSi6fdv1IsKhri8jkg9JPh9rtvRbjIO1ocfH0yz3fg7mjD86hhM0ypoVPtzvCR7mp8FqgN-8WKBeP1EPi0u3tGTRp_MJJaaYMwuosNVeUXcbOdC-_T_XOspU35mPUyhgrcxbF7FQ`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
      const response = await req.json();
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
