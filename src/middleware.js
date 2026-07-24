export const onRequest = async (context, next) => {
  const url = new URL(context.request.url);

  // Preserve legacy article URLs while keeping /blog as the personal blog hub.
  if (url.pathname !== "/blog/" && url.pathname.startsWith("/blog/")) {
    return context.redirect("/posts/" + url.pathname.slice(6), 301);
  }

  return next();
};
