import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const hashedPassword = bcrypt.hashSync('password123', 10);
  await prisma.user.upsert({
    where: { email: 'skythelight15@gmail.com' },
    update: {},
    create: {
      email: 'skythelight15@gmail.com',
      name: 'Skyth Test',
      password: hashedPassword,
    },
  });
  console.log('Test user created/updated.');
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

