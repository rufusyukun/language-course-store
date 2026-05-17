export function generateOrder(course, recoveryEmail = '') {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const orderNo = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${Math.floor(1000 + Math.random() * 9000)}`;
  const pickupCode = Math.random().toString(36).slice(2, 8).toUpperCase();
  const username = `${course.category.replace('语', '')}${Math.floor(100000 + Math.random() * 900000)}`;
  const password = Math.random().toString(36).slice(2, 10);

  return {
    orderNo,
    pickupCode,
    course,
    amount: course.price,
    recoveryEmail: recoveryEmail.trim(),
    username,
    password,
    downloadUrl: `https://course.example.com/download/${orderNo}`,
    extractCode: pickupCode.slice(0, 4),
    paidAt: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`,
  };
}
