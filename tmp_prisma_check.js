const { PrismaClient } = require('@prisma/client');

(async () => {
  const prisma = new PrismaClient();
  try {
    const id = 'cmpkylkv70001sf6oie6dv3dr';
    const cred = await prisma.credential.findUnique({ where: { id } });
    console.log('FOUND', !!cred);
    if (cred) console.log(JSON.stringify(cred, null, 2));
  } catch (e) {
    console.error('ERR', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
