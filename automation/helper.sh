# Initialize Prisma to generate prisma schema
npx prisma init

# Once completing prisma schema, run this command to migrate the database
npx prisma migrate dev --name init

# Generate secret key for NextAuth
openssl rand -hex 32

# Run postgres locally
docker run --name postgres -e POSTGRES_HOST_AUTH_METHOD=trust -p 5433:5432 -d postgres

# Resets the database
npx prisma migrate reset