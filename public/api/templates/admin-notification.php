<?php
$replySubject = rawurlencode('Re: Your wedding or event inquiry');
$replyLink = 'mailto:' . $email . '?subject=' . $replySubject;
?>
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:24px;background:#eeeeee;font-family:Arial,Helvetica,sans-serif;color:#333333;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:auto;background:#ffffff;border:1px solid #dddddd;">
    <tr><td style="padding:24px 32px;background:#131516;color:#ffffff;font-family:Georgia,serif;font-size:21px;letter-spacing:.08em;"><?= e($brandName) ?></td></tr>
    <tr><td style="padding:28px 32px 8px;"><p style="margin:0 0 8px;color:#586b46;font-size:11px;font-weight:bold;letter-spacing:.16em;text-transform:uppercase;">New inquiry</p><h1 style="margin:0;font:normal 27px/1.3 Georgia,serif;color:#292929;">From <?= e($name) ?></h1></td></tr>
    <tr><td style="padding:20px 32px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #dddddd;">
      <tr><td style="padding:10px 14px;color:#777777;font-size:12px;width:34%;">Email</td><td style="padding:10px 14px;font-size:13px;"><a href="mailto:<?= e($email) ?>" style="color:#131516;"><?= e($email) ?></a></td></tr>
      <tr><td style="padding:10px 14px;color:#777777;font-size:12px;border-top:1px solid #eeeeee;">Phone / WhatsApp</td><td style="padding:10px 14px;font-size:13px;border-top:1px solid #eeeeee;"><?= e($phone) ?></td></tr>
      <tr><td style="padding:10px 14px;color:#777777;font-size:12px;border-top:1px solid #eeeeee;">Event</td><td style="padding:10px 14px;font-size:13px;border-top:1px solid #eeeeee;"><?= e($eventType) ?></td></tr>
      <tr><td style="padding:10px 14px;color:#777777;font-size:12px;border-top:1px solid #eeeeee;">Date</td><td style="padding:10px 14px;font-size:13px;border-top:1px solid #eeeeee;"><?= e($eventDate) ?></td></tr>
      <tr><td style="padding:10px 14px;color:#777777;font-size:12px;border-top:1px solid #eeeeee;">Guests</td><td style="padding:10px 14px;font-size:13px;border-top:1px solid #eeeeee;"><?= e($guestCount) ?></td></tr>
      <tr><td style="padding:10px 14px;color:#777777;font-size:12px;border-top:1px solid #eeeeee;">Budget</td><td style="padding:10px 14px;font-size:13px;border-top:1px solid #eeeeee;"><?= e($budget) ?></td></tr>
    </table></td></tr>
    <tr><td style="padding:20px 32px 0;"><div style="padding:16px 18px;background:#f7f7f7;border-left:3px solid #6e8458;font-size:13px;line-height:1.7;"><strong style="display:block;margin-bottom:6px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#777777;">Message</strong><?= nl2br(e($message)) ?></div></td></tr>
    <tr><td align="center" style="padding:26px 32px 32px;"><a href="<?= e($replyLink) ?>" style="display:inline-block;padding:13px 26px;background:#131516;color:#ffffff;text-decoration:none;font-size:12px;font-weight:bold;letter-spacing:.1em;text-transform:uppercase;">Reply to <?= e($firstName) ?></a><p style="margin:18px 0 0;color:#999999;font-size:11px;">Submitted <?= e($submittedAt) ?> · IP <?= e($ipAddress) ?></p></td></tr>
  </table>
</body>
</html>
