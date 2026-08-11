const authConfig = {
  providers: [
    {
      domain: process.env.NEXT_PUBLIC_CONVEX_SITE_URL!,
      applicationID: "convex",
    },
  ],
};

export default authConfig;
