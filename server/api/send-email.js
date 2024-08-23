import nodemailer from 'nodemailer'
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { name, email, subject, message } = body

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: false, // true = for port 465, false = for port 587
    auth: {
      user: config.smtpUser,
      pass: config.smtpPassword,
    },
  })

  // HTML шаблон листа
  const htmlTemplate = `
    <html>
      <head>
        <style>
          .header {
            font-size: 24px;
            color: #333;
          }
          .content {
            font-size: 16px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="header">New Message from ${name}</div>
        <div class="content">
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      </body>
    </html>
  `

  const mailOptions = {
    from: email,
    to: 'zhenya19880307@gmail.com',
    subject: `New Message from ${name}: ${subject}`,
    html: htmlTemplate,  // Використовуйте HTML шаблон тут
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
})
