<?php

require __DIR__ . '/../PHPMailer/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/../PHPMailer/PHPMailer/src/SMTP.php';
require __DIR__ . '/../PHPMailer/PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


// ─────────────────────────────────────────────
//  CONFIGURACIÓN BASE SMTP (reutilizable)
// ─────────────────────────────────────────────
function configurarSMTP(PHPMailer $mail): void {
    $mail->CharSet    = 'UTF-8';
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'minovaskls@gmail.com';
    $mail->Password   = 'upvyxrucyrilqaqq';
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;
    $mail->setFrom('minovaskls@gmail.com', 'Minova Recuperacion');
    $mail->addEmbeddedImage(
        'C:/MINOVA/img/minova - logo.png',
        'logo_empresa'   
    );
}

// ─────────────────────────────────────────────
//  PLANTILLA HTML BASE
// ─────────────────────────────────────────────
function htmlHeader(string $titulo): string {
    return '
    <div style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">
      <div style="max-width:620px;margin:40px auto;background:#ffffff;border-radius:12px;
                  overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,0.1);">

        <div style="background:#222222;padding:28px 30px;text-align:center;">
          <img src="cid:logo_empresa" width="160" style="display:block;margin:0 auto;">
        </div>

        <div style="height:5px;background:linear-gradient(90deg,#82cd00,#5aa000);"></div>

        <div style="background:#f9f9f9;padding:28px 40px 10px;text-align:center;">
          <h2 style="margin:0;color:#222222;font-size:22px;font-weight:700;">' . $titulo . '</h2>
        </div>

        <div style="padding:20px 40px 30px;">';
}

function htmlFooter(): string {
    return '
        </div>

        <div style="height:3px;background:linear-gradient(90deg,#82cd00,#5aa000);"></div>
        <div style="background:#222222;padding:22px 30px;text-align:center;">
          <p style="margin:0;color:#aaaaaa;font-size:12px;">
            &copy; ' . date('Y') . ' Falabella Sogamoso &mdash; Todos los derechos reservados.<br>
            Si no solicitaste este correo, puedes ignorarlo con seguridad.
          </p>
        </div>

      </div>
    </div>';
}

// ─────────────────────────────────────────────
//  FUNCIÓN PRINCIPAL: enviar código de recuperación
// ─────────────────────────────────────────────
function enviarRecuperacion(string $correoDestino, string $codigo): bool {
    $mail = new PHPMailer(true);

    try {
        configurarSMTP($mail);

        $mail->addAddress($correoDestino);
        $mail->isHTML(true);
        $mail->Subject = 'Código de recuperación - Falabella Sogamoso';

        $mail->Body = htmlHeader('Recuperación de contraseña') . '
            <p style="color:#444444;font-size:15px;line-height:1.6;text-align:center;margin:0 0 20px;">
                Recibimos una solicitud para restablecer tu contraseña.<br>
                Usa el siguiente código para continuar:
            </p>

            <div style="text-align:center;margin:24px 0;">
              <span style="display:inline-block;background:#f0f0f0;border:2px dashed #82cd00;
                           border-radius:10px;padding:14px 36px;font-size:32px;
                           font-weight:700;letter-spacing:8px;color:#222222;">
                ' . htmlspecialchars($codigo) . '
              </span>
            </div>

            <p style="color:#888888;font-size:13px;text-align:center;margin:0;">
                Este código expira en <strong>15 minutos</strong>.<br>
                Si no solicitaste esto, ignora este mensaje.
            </p>
        ' . htmlFooter();

        $mail->AltBody = "Tu código de recuperación es: $codigo (válido 15 minutos)";

        $mail->send();
        return true;

    } catch (Exception $e) {
        error_log('Error al enviar correo: ' . $mail->ErrorInfo);
        return false;
    }
}