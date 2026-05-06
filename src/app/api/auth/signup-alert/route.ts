import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: 'hello@nwhite.systems',
        pass: 'Arise2024$',
      },
    });

    const mailOptions = {
      from: 'hello@nwhite.systems',
      to: 'hello@nwhite.systems',
      subject: 'SAM Dossier: New User Registration Approval Required',
      html: `
        <h2>New User Registration</h2>
        <p>A new user has registered for the SAM Dossier and is waiting for approval.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>Please log in to the admin panel to assign their role and grant access.</p>
        <br/>
        <p>SAM Dossier System</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending signup alert:', error);
    // Return success anyway so we don't block the user's flow if email fails
    return NextResponse.json({ success: false, error: 'Email failed' }, { status: 500 });
  }
}
