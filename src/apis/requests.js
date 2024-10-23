import Ajax from "./ajax";

export function OAuthDiscord() {
  return Ajax({
    url: '/api/auth/discord/redirect',
  })
}