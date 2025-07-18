import nodemailer from 'nodemailer';

// Test Ethereal config for development
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.ETHEREAL_USER,
        pass: process.env.ETHEREAL_PASS
    }
});

function formatRequestHtml(user, basicInfo, selectedHelp, answers, fileUrls) {
  const helpList = selectedHelp.map(h => `<li>${h}</li>`).join('');

  const answersHtml = Object.entries(answers).map(([category, responses]) => {
    const qaPairs = Object.entries(responses)
      .map(([q, a]) => `<li><strong>${q}:</strong> ${a}</li>`)
      .join('');
    return `<h4>${category}</h4><ul>${qaPairs}</ul>`;
  }).join('<hr />');

  const filesHtml = fileUrls.length
    ? `<ul>${fileUrls.map(file => `<li>${file}</li>`).join('')}</ul>`
    : '<p>No files uploaded.</p>';

  return `
    <h2>📩 New Client Request from ${user.name}</h2>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Phone:</strong> ${user.phone || 'N/A'}</p>
    <p><strong>Company Name:</strong> ${user.companyName || 'N/A'}</p>
    <p><strong>Website:</strong> ${user.website || 'N/A'}</p>
    <hr />
    <h3>🙋 What Help They Need:</h3>
    <ul>${helpList}</ul>
    <hr />
    <h3>📝 Detailed Answers:</h3>
    ${answersHtml}
    <hr />
    <h3>📎 Files:</h3>
    ${filesHtml}
    <p><em>Submitted on ${new Date().toLocaleString()}</em></p>
  `;
}

export default async function sendClientRequestEmailToAdmin(user, request) {
  const mailOptions = {
    from: `"${user.name}" <${process.env.ETHEREAL_USER}>`,
    to: process.env.ETHEREAL_USER, // ✅ add to .env
    subject: `New Client Request from ${user.name}`,
    html: formatRequestHtml(
      user,
      request.basicInfo,
      request.selectedHelp,
      request.answers,
      request.fileUrls || []
    ),
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`📧 Email sent to admin: ${info.messageId}`);
}
