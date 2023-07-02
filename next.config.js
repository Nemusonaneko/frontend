/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{
      source:"/:path*",
      headers: [
        {key:"Access-Control-Allow-Credentials",value:"true"},
        {key:"Access-Control-Allow-Origin",value:"https://waifus-api.nemusona.com"},
        {key:"Access-Control-Allow-Methods",value:"GET,OPTIONS,PATCH,DELETE,POST,PUT"},
        {key:"Access-Control-Allow-Headers",value:"X-CSRF-Token, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date"}
      ]
    }]
  }
}

module.exports = nextConfig
