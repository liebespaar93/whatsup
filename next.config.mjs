import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
    dest: 'public',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};

export default withPWA(nextConfig);
