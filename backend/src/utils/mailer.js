import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.ETHEREAL_USER,
      pass: process.env.ETHEREAL_PASS
    }
});

export const sendApprovalEmail = async (user) => {
  const approvalLink = `http://localhost:5000/auth/approve/${user.id}`;
  const rejectionLink = `http://localhost:5000/auth/reject/${user.id}`;

  const info = await transporter.sendMail({
    from: `"${user.name}" <${process.env.ETHEREAL_USER}>`,
    to: process.env.ETHEREAL_USER, // Replace with your real admin email
    subject: `New Signup: ${user.name}`,
    html: `
      <h3>New User Signup Request</h3>
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone Number:</strong> ${user.phone}</p>
      <p><strong>Company:</strong> ${user.companyName}</p>
      <p><strong>website:</strong> ${user.website}</p>
      <p><strong>linkedin:</strong> ${user.linkedin}</p>
      <p><strong>facebook:</strong> ${user.facebook}</p>
      <p><strong>Message:</strong> ${user.customMessage}</p>
      <p><strong>Created at:</strong> ${user.createdAt}</p>
      <br/>
      <a href="${approvalLink}" style="padding: 10px 15px; background: green; color: white; text-decoration: none;">Approve</a>
      <a href="${rejectionLink}" style="padding: 10px 15px; background: red; color: white; text-decoration: none; margin-left: 10px;">Reject</a>
    `
  });

  console.log("Email sent:", info.messageId);
  console.log("Preview:", nodemailer.getTestMessageUrl(info));
};
