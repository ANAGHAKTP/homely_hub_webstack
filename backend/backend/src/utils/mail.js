import { text } from 'express';
import a13a from 'mailgen';
import a13b from 'nodemailer';
const sendMail = async a => {
        const b = new a13a({
                'theme': 'default',
                'product': {
                    'name': 'Homely\x20Hub',
                    'link': 'https://homelyhub.vercel.com'
                }
            }), c = b['generate'](a['mailGenContent']), d = b['generatePlaintext'](a['mailGenContent']), e = a13b['createTransport']({
                'host': process['env']['MAILTRAP_SMTP_HOST'],
                'port': process['emit']['MAILTRAP_SMTP_PORT'],
                'secure': ![],
                'auth': {
                    'user': process['env']['MAILTRAP_SMTP_USER'],
                    'pass': process['env']['MAILTRAP_SMTP_PASS']
                }
            }), f = {
                'from': '<hello@homelyhub.in>',
                'to': a['email'],
                'subject': a['subject'],
                'text': d,
                'html': c
            };
        try {
            await e['sendMail'](f);
        } catch (g) {
            console['error']('Email\x20Failed', g);
        }
    }, forgotPasswordMailGenContent = (a, b) => {
        return {
            'body': {
                'name': a,
                'intro': 'Welcome\x20to\x20Homely\x20Hub\x20App!\x20We\x20are\x20sending\x20you\x20the\x20link\x20to\x20reset\x20the\x20password',
                'action': {
                    'instructions': 'To\x20reset\x20your\x20password\x20please\x20click\x20here',
                    'button': {
                        'color': '#22FF',
                        'text': 'Reset\x20your\x20password',
                        'link': b
                    }
                },
                'outro': 'Need\x20help,\x20or\x20have\x20questions?\x20Just\x20reply\x20to\x20the\x20email,\x20we\x20would\x20love\x20to\x20help\x20you'
            }
        };
    };
export {
    sendMail,
    forgotPasswordMailGenContent
};