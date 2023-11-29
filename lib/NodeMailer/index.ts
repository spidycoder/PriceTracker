import nodemailer from "nodemailer";
import { EmailContent, EmailProductInfo } from "@/type";

interface Props {
  name: string;
  currentPrice: number;
  newPrice: number;
  ProductUrl: string;
}

export const Notification = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD_MEET: "THRESHOLD_MEET",
};

export const generateEmailBody = ({
  name,
  currentPrice,
  ProductUrl,
  newPrice,
}: Props) => {
  const shortendTitle = name.length > 20 ? `${name.substring(0, 20)}...` : name;
  let subject = "";
  let body = "";

  subject = `Discount Alert for ${shortendTitle}`;
  body = `
            <div>
              <h4>Hey, ${name} is now available at a price less than ₹${newPrice}!</h4>
              <p>Grab it right away from <a href="${ProductUrl}" target="_blank" rel="noopener noreferrer">here</a>.</p>
            </div>
          `;

  return { subject, body };
};

export const sendEmail = async (
  emailContent: EmailContent,
  sendTo: string[]
) => {
  const transporter = nodemailer.createTransport({
    pool: true,
    service: "hotmail",
    port: 2525,
    auth: {
      user: "spidycoder11@outlook.com",
      pass: process.env.EMAIL_PASSWORD,
    },
    maxConnections: 1,
  });
  const mailOptions = {
    //add here our outlook account
    from: "spidycoder11@outlook.com",
    to: sendTo,
    html: emailContent.body,
    subject: emailContent.subject,
  };
  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) return console.log(error);
    console.log("Email Sent", info);
  });
};
