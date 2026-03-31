import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import bcrypt from 'bcryptjs'

const connectionString = process.env.DATABASE_URL || 'postgresql://dummy';

const pool = new pg.Pool({
    connectionString,
    ssl: connectionString?.includes('neon.tech')
        ? { rejectUnauthorized: false }
        : undefined,
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('Seeding admin user...');

    const email = 'ola';
    const password = 'mundo';

    // Check if exactly this email already exists
    const existingAdmin = await prisma.user.findUnique({
        where: { email }
    });

    if (existingAdmin) {
        console.log('Admin user already exists!');
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = await prisma.user.create({
        data: {
            name: 'Administrador',
            surname: 'Principal',
            email,
            passwordHash,
        }
    });

    console.log(`Admin user created: ${newAdmin.email} / ${password}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
