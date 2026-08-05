export const onRequest = async (context, next) => {
  const url = new URL(context.request.url);

  if (url.pathname === "/blog/" || url.pathname === "/posts/") {
    return context.redirect(url.pathname.slice(0, -1) + url.search, 301);
  }

  if (url.pathname !== "/blog/" && url.pathname.startsWith("/blog/")) {
    return context.redirect("/posts/" + url.pathname.slice(6), 301);
  }

  return next();
};
