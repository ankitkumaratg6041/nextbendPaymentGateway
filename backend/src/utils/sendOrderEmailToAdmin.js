import nodemailer from 'nodemailer';

// Use test Ethereal account for now
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS
  }
});

const formatOrderHtml = (user, services, plans) => {
  const servicesHtml = Object.entries(services).map(([category, data]) => {
    return `
      <h4>${category}</h4>
      <p><strong>Services:</strong> ${data.services.join(', ') || 'None'}</p>
      <p><strong>Addons:</strong> ${data.addons.join(', ') || 'None'}</p>
    `;
  }).join('');

  const plansHtml = Object.entries(plans).map(([category, plan]) => {
    return `
      <h4>${category}</h4>
      <p><strong>Plan:</strong> ${plan.name}</p>
      <ul>
        ${plan.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    `;
  }).join('');

  return `
    <h2>🧾 New Order Request from ${user.name}</h2>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Phone:</strong> ${user.phone || 'N/A'}</p>
    <p><strong>Company Name:</strong> ${user.companyName || 'N/A'}</p>
    <p><strong>Website:</strong> ${user.website || 'N/A'}</p>
    <hr />
    <h3>🛠️ Services Selected:</h3>
    ${servicesHtml}
    <hr />
    <h3>📦 Plans Selected:</h3>
    ${plansHtml}
    <p><em>Submitted on ${new Date().toLocaleString()}</em></p>
  `;
};

export default async function sendOrderEmailToAdmin(user, services, plans) {
  const mailOptions = {
    from: `"${user.name}" <${process.env.ETHEREAL_USER}>`,
    to: process.env.ETHEREAL_USER,
    subject: `New Order from ${user.name}`,
    html: formatOrderHtml(user, services, plans)
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`📧 Email sent to admin: ${info.messageId}`);
}
