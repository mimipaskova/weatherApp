export default function handleResponseError(url?: string) {
  if (url) {
    window.location.replace(`/api/auth/google?returnTo=${url}`);
  } else {
    window.location.replace(`/api/auth/google`);
  }
}
