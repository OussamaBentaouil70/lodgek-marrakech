<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Thank you</title></head>
<body style="margin:0;padding:24px;background:#eeeeee;font-family:Arial,Helvetica,sans-serif;color:#333333;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:auto;background:#ffffff;border:1px solid #dddddd;">
    <tr><td style="padding:24px 32px;background:#131516;color:#ffffff;text-align:center;font-family:Georgia,serif;font-size:21px;letter-spacing:.08em;"><?= e($brandName) ?></td></tr>
    <tr><td style="padding:32px 32px 8px;"><p style="margin:0 0 8px;color:#586b46;font-size:11px;font-weight:bold;letter-spacing:.16em;text-transform:uppercase;">Thank you</p><h1 style="margin:0;font:normal 27px/1.3 Georgia,serif;color:#292929;">Thank you, <?= e($firstName) ?>.</h1><p style="margin:16px 0 0;font-size:15px;line-height:1.7;color:#555555;">We have received your inquiry and will reply within <strong style="color:#292929;">24–48 hours</strong>.</p></td></tr>
    <tr><td style="padding:22px 32px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;border-left:3px solid #6e8458;"><tr><td style="padding:16px 18px;font-size:13px;line-height:1.8;"><strong style="display:block;margin-bottom:6px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#777777;">Your celebration</strong>Event: <?= e($eventType) ?><br>Date: <?= e($eventDate) ?><br>Guests: <?= e($guestCount) ?><br>Budget: <?= e($budget) ?></td></tr></table></td></tr>
    <tr><td style="padding:22px 32px 0;"><p style="margin:0;color:#555555;font-size:13px;line-height:1.7;"><?= nl2br(e($message)) ?></p></td></tr>
    <?php if ($whatsappLink !== ''): ?><tr><td align="center" style="padding:26px 32px 8px;"><a href="<?= e($whatsappLink) ?>" style="display:inline-block;padding:13px 26px;background:#25d366;color:#ffffff;text-decoration:none;font-size:12px;font-weight:bold;letter-spacing:.1em;text-transform:uppercase;">Chat on WhatsApp</a></td></tr><?php endif; ?>
    <tr><td style="padding:24px 32px 28px;text-align:center;border-top:1px solid #dddddd;"><?php if ($siteUrl !== ''): ?><a href="<?= e($siteUrl) ?>" style="color:#131516;font-size:12px;"><?= e($siteUrl) ?></a><?php endif; ?><p style="margin:10px 0 0;color:#999999;font-size:11px;">© <?= e($year) ?> <?= e($brandName) ?></p></td></tr>
  </table>
</body>
</html>
