export function middleware(request) {
  const authHeader = request.headers.get('authorization');

  if (authHeader) {
    const encoded = authHeader.split(' ')[1];
    const decoded = atob(encoded);
    const password = decoded.split(':')[1];
    if (password === 'bertrand') return; // correct — let through
  }

  return new Response('Access restricted.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Site Access"',
    },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
};
