
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const xoauth2 = require('xoauth2');
const OAuth2 = require('oauth2');

router.get('/', (req, res) =>{
    res.render('index.html', { title: 'Madoo Servicios Tecnicos', IndAct: 'active'  });
});

router.get('/services', (req, res) =>{
    res.render('services.html', { title: 'MST - Servicios'});
});

router.get('/about', (req, res) =>{
    res.render('aboutus.html', { title: 'MST - La Empresa'});
});

router.get('/contact', (req, res) =>{
    res.render('contact.html', { title: 'MST - Contacto' });
});

router.get('/#', (req, res) =>{
    res.render('legal.html', { title: 'Normativa Legal', Empresa:'Madoo Servicios Técnicos'});
});

router.get('/mail', (req, res) =>{
    res.render('enviado.html', { title: 'MST- Contacto'});
});
//// CONTACT EMAIL
router.post('/send-email', async (req, res) => {
    const { nombre, correo, telefono, mensaje } = req.body;
    contentHTML = `
        <h1>Informacion del Usuario:</h1>
        <ul>
            <li>Nombre: ${nombre}</li>
            <li>E-Mail: ${correo}</li>
            <li>Telefono: ${telefono}</li>
        </ul>
        <P>${mensaje}</p>
    `;

    ///// TRABAJANDO CON G-MAIL
    var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        type: 'SMTP',
        host: 'smtp.gmail.com',
        port: 587, //465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'madooservicios@gmail.com',
            clientId: '938811929201-6sdl1t9n8br2vstq4cluv04oor9q9e3l.apps.googleusercontent.com',
            clientSecret: '_B6R4blpwiHJfP-JUdPeNBgv',
            refreshToken: '1//04yEQSLruaNGsCgYIARAAGAQSNwF-L9Iryzwyoo8gxCmTN1GeE3ArDn_KcsptGcR7JtOIaZsn5srynfszB_i6sLdxuwEnPUnEJkw',
            //accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x',
        },
        tls:{
            rejectUnauthorized: false
        }  
    })

    var mailOptions = {
        from: 'MST - WebMail <madooservicios@gmail.com>', //EMAIL DESDE
        to: 'madooserviciostecnicos@gmail.com', //CORREO DE GMAIL DE LA PAGINA
        subject: 'Nuevo contacto desde - MST',
        html: contentHTML
    };

    await smtpTransport.sendMail(mailOptions, function (err, res) {
        if (err) {
            console.log('Error Occurs?', err);
        } else {
            console.log('Mensaje Enviado!', res);
            console.log(mailOptions);
        }
       //smtpTransport.close()
    });
    res.redirect('/mail');
});


module.exports = router;
//////////////////// FAZ METHOD /////////////////////////////////////////////   
 ///// TRABAJANDO CON NODEMAILER
    //CONFIGURACION DESDE DONDE SE ENVIA EL E-MAIL
    // const transporter = nodemailer.createTransport({
    //     host: '', //Nombre del host de envio de emal ejm: mail.fazttech.xyz
    //     port: 26, //numero del puerto para el host
    //     secure: false, //si se va a enviar el email con SSL
    //     auth:{
    //         user: '', //correo electronico donde va el email
    //         pass: '' //Clave del correo
    //     },
    //     tls:{
    //         rejectUnauthorized: false
    //     }
    // });
    //CONFIGURACION DE A DONDE VA EL EMAIL
    // const info = await transporter.sendMail({
    //      from: "'Madoo Servicios Server' <oswaldo.cedeno@gmal.com>", //EMAIL DESDE
    //      to: 'madooserviciostecnicos@gmail.com', //CORREO DE GMAIL DE LA PAGINA
    //      subject: 'Nuevo contacto desde - MST',
    //      html: contentHTML
    //  });
    //  console.log('Mensaje Enviado!', info.messageId);
    //  res.send('received');
 /////////////////////////////////////////////////////////////////////////////////
///// TRABAJANDO CON G-MAIL
/*var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
         user: 'madooservicios@gmail.com', //process.env.EMAIL,
         pass: 'Madooservicios2019' //process.env.PASSWORD 
       },
       tls:{
           rejectUnauthorized: false
           }
    });

   var mailOptions = {
       from: 'MST- WebMail <madooservicios@gmail.com>', //EMAIL DESDE
       to: 'madooserviciostecnicos@gmail.com', //CORREO DE GMAIL DE LA PAGINA
       subject: 'Nuevo contacto desde - MST',
       html: contentHTML
   };
   
   await smtpTransport.sendMail(mailOptions, function(err, res) {
       if (err) {
           console.log('Error Occurs?', err);
       }else{
           console.log('Mensaje Enviado!', res);
           //console.log(mailOptions);
       }
       smtpTransport.close()
   });
   res.redirect('/mail');
   
});*/
 /* service: 'gmail',
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator({
                user: 'madooservicios@gmail.com',
                clientId: '938811929201-6sdl1t9n8br2vstq4cluv04oor9q9e3l.apps.googleusercontent.com',
                clientSecret: '_B6R4blpwiHJfP-JUdPeNBgv',
                refreshToken: '1//04yEQSLruaNGsCgYIARAAGAQSNwF-L9Iryzwyoo8gxCmTN1GeE3ArDn_KcsptGcR7JtOIaZsn5srynfszB_i6sLdxuwEnPUnEJkw'
            })
        }*/