import nodemailer, { Transporter, SendMailOptions } from "nodemailer";

export const sendEmail =
  (topic: string) =>
  (email: string): Promise<any> => {
    const transporter = getTransport();
    const options = getMailOptionsFor(topic)(email);
    return transporter.sendMail(options);
  };

const getTransport = (): Transporter =>
  nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

const getMailOptionsFor =
  (topic: string) =>
  (email: string): SendMailOptions => ({
    to: email,
    from: process.env.MAIL_USER,
    text: `Hello there!. It seems you are forgetting someone. The topic at hand is: ${mapTopicToMessage(
      topic
    )}`,
    subject: "You have someone to remember!",
  });

const mapTopicToMessage = (topic: string): string => {
  switch (topic) {
    case "mipl":
      return "Mipl Pipl";
    case "escape_room":
      return "Escape room";
    case "zabac":
      return "Žabac";
    case "movie_night":
      return "Movie night";
    case "cooking_date":
      return "Cooking date";
    case "dinner_date":
      return "Dinner date";
    case "shopping":
      return "Shopping";
    case "coffee_drinks":
      return "Coffee drinks";
    case "sweets":
      return "Sweets";
    case "party":
      return "party";
    case "walk":
      return "Walk";
    case "code":
      return "Code";
    default:
      return "Mistery";
  }
};
