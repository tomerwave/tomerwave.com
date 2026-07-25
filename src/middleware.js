export const onRequest = async (context, next) => {
  const url = new URL(context.request.url);

  // Normalize the two top-level hubs for browsers that retain a trailing slash.
  if (url.pathname === "/blog/" || url.pathname === "/posts/") {
    return context.redirect(url.pathname.slice(0, -1) + url.search, 301);
  }

  // Preserve legacy article URLs while keeping /blog as the personal blog hub.
  if (url.pathname !== "/blog/" && url.pathname.startsWith("/blog/")) {
    return context.redirect("/posts/" + url.pathname.slice(6), 301);
  }

  return next();
};
