<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    json_response(405, ['ok' => false, 'message' => 'Method not allowed.']);
}

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody ?: '', true);
if (!is_array($payload)) {
    $payload = $_POST;
}
if (!is_array($payload)) {
    $payload = [];
}

if (trim((string) ($payload['website'] ?? '')) !== '') {
    json_response(200, ['ok' => true]);
}

function text_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function clean_date(string $value): string
{
    if ($value === '') {
        return 'Date to be confirmed';
    }

    $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value);
    return $date !== false && $date->format('Y-m-d') === $value
        ? $date->format('j F Y')
        : 'Date to be confirmed';
}

$errors = [];
$name = trim((string) ($payload['name'] ?? ''));
$email = trim((string) ($payload['email'] ?? ''));
$phone = trim((string) ($payload['phone'] ?? ''));
$eventType = trim((string) ($payload['eventType'] ?? ''));
$eventDate = trim((string) ($payload['eventDate'] ?? ''));
$guestCount = trim((string) ($payload['guestCount'] ?? ''));
$budget = trim((string) ($payload['budget'] ?? ''));
$currency = trim((string) ($payload['currency'] ?? 'EUR'));
$message = trim((string) ($payload['message'] ?? ''));

$allowedEventTypes = [
    'Wedding',
    'Romantic ceremony',
    'Engagement party',
    'Private dinner',
    'Birthday celebration',
    'Cocktail reception',
    'Private garden party',
    'Corporate event',
    'Other',
];
$allowedCurrencies = ['EUR', 'MAD', 'USD', 'GBP'];

if (text_length($name) < 2 || text_length($name) > 120) {
    $errors['name'] = 'Please enter your full name.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || text_length($email) > 190) {
    $errors['email'] = 'Please enter a valid email address.';
}
if (text_length($phone) > 40) {
    $errors['phone'] = 'Please enter a valid phone number.';
}
if (!in_array($eventType, $allowedEventTypes, true)) {
    $errors['eventType'] = 'Please choose an event type.';
}
if (!filter_var($guestCount, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 2000]])) {
    $errors['guestCount'] = 'Enter an estimated number of guests between 1 and 2,000.';
}
if ($budget !== '' && (!is_numeric($budget) || (float) $budget < 0)) {
    $errors['budget'] = 'Budget cannot be negative.';
}
if (!in_array($currency, $allowedCurrencies, true)) {
    $errors['currency'] = 'Please choose a valid currency.';
}
if (text_length($message) > 3000) {
    $errors['message'] = 'Please shorten your message.';
}

if ($errors !== []) {
    json_response(422, [
        'ok' => false,
        'message' => 'Please check the form and try again.',
        'errors' => $errors,
    ]);
}

$fromAddress = env('MAIL_FROM_ADDRESS', env('MAIL_USERNAME'));
$fromName = env('MAIL_FROM_NAME', 'Lodgek Marrakech');
$adminEmail = env('ADMIN_EMAIL');
$adminName = env('ADMIN_NAME', $fromName);
$smtpUsername = env('MAIL_USERNAME');
$smtpPassword = env('MAIL_PASSWORD');

if (
    !filter_var($fromAddress, FILTER_VALIDATE_EMAIL)
    || $smtpUsername === ''
    || $smtpPassword === ''
    || !filter_var($adminEmail, FILTER_VALIDATE_EMAIL)
) {
    error_log('[inquiry] Mail configuration is incomplete.');
    json_response(503, [
        'ok' => false,
        'message' => 'The form is not available right now. Please contact us directly.',
    ]);
}

$nameParts = preg_split('/\s+/u', $name) ?: [$name];
$firstName = $nameParts[0] ?? $name;
$siteUrl = rtrim(env('SITE_URL', ''), '/');
$whatsappNumber = preg_replace('/\D+/', '', env('WHATSAPP_NUMBER', '')) ?: '';
$whatsappLink = $whatsappNumber !== '' ? 'https://wa.me/' . $whatsappNumber : '';
$formattedDate = clean_date($eventDate);
$formattedGuests = (string) $guestCount;
$formattedBudget = $budget !== '' ? $currency . ' ' . number_format((float) $budget, 2, '.', ',') : 'To be discussed';

$templateData = [
    'name' => $name,
    'firstName' => $firstName,
    'email' => $email,
    'phone' => $phone !== '' ? $phone : 'Not provided',
    'eventType' => $eventType,
    'eventDate' => $formattedDate,
    'guestCount' => $formattedGuests,
    'budget' => $formattedBudget,
    'message' => $message !== '' ? $message : 'No additional details provided.',
    'submittedAt' => (new DateTimeImmutable('now'))->format('j F Y, H:i'),
    'ipAddress' => $_SERVER['REMOTE_ADDR'] ?? 'Unknown',
    'siteUrl' => $siteUrl,
    'whatsappLink' => $whatsappLink,
    'year' => date('Y'),
    'brandName' => $fromName,
    'adminEmail' => $adminEmail,
    'adminName' => $adminName,
];

function make_mailer(string $fromAddress, string $fromName): PHPMailer
{
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = env('MAIL_HOST', 'smtp.hostinger.com');
    $mail->SMTPAuth = env('MAIL_USERNAME') !== '';
    $mail->Username = env('MAIL_USERNAME');
    $mail->Password = env('MAIL_PASSWORD');
    $mail->SMTPDebug = SMTP::DEBUG_OFF;
    $mail->CharSet = 'UTF-8';
    $mail->Timeout = 20;

    $encryption = strtolower(env('MAIL_ENCRYPTION', 'ssl'));
    if ($encryption === 'tls') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $defaultPort = 587;
    } elseif ($encryption === 'none') {
        $mail->SMTPSecure = '';
        $defaultPort = 25;
    } else {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $defaultPort = 465;
    }

    $port = (int) env('MAIL_PORT', (string) $defaultPort);
    $mail->Port = $port > 0 ? $port : $defaultPort;
    $mail->setFrom($fromAddress, $fromName);
    $mail->isHTML(true);
    return $mail;
}

function admin_plain_text(array $data): string
{
    return "New inquiry\n\n"
        . "Name: {$data['name']}\n"
        . "Email: {$data['email']}\n"
        . "Phone: {$data['phone']}\n"
        . "Event: {$data['eventType']}\n"
        . "Date: {$data['eventDate']}\n"
        . "Guests: {$data['guestCount']}\n"
        . "Budget: {$data['budget']}\n"
        . "Submitted: {$data['submittedAt']}\n\n"
        . "Message:\n{$data['message']}\n";
}

function client_plain_text(array $data): string
{
    return "Thank you, {$data['firstName']}.\n\n"
        . "We have received your inquiry and will reply within 24-48 hours.\n\n"
        . "Event: {$data['eventType']}\n"
        . "Date: {$data['eventDate']}\n"
        . "Guests: {$data['guestCount']}\n"
        . "Budget: {$data['budget']}\n"
        . ($data['whatsappLink'] !== '' ? "WhatsApp: {$data['whatsappLink']}\n" : '')
        . ($data['siteUrl'] !== '' ? "Website: {$data['siteUrl']}\n" : '');
}

$subjectName = str_replace(["\r", "\n"], ' ', $name);
$subjectType = str_replace(["\r", "\n"], ' ', $eventType);

try {
    $adminMail = make_mailer($fromAddress, $fromName);
    $adminMail->addAddress($adminEmail, $adminName);
    $adminMail->addReplyTo($email, $subjectName);
    $adminMail->Subject = "New inquiry: {$subjectType} - {$subjectName}";
    $adminMail->Body = render_template(__DIR__ . '/templates/admin-notification.php', $templateData);
    $adminMail->AltBody = admin_plain_text($templateData);
    $adminMail->send();
} catch (Throwable $exception) {
    error_log('[inquiry] Admin email failed: ' . $exception->getMessage());
    json_response(500, [
        'ok' => false,
        'message' => 'We could not send your message. Please try again or contact us directly.',
    ]);
}

try {
    $clientMail = make_mailer($fromAddress, $fromName);
    $clientMail->addAddress($email, $subjectName);
    $clientMail->addReplyTo($adminEmail, $adminName);
    $clientMail->Subject = 'Thank you for your inquiry';
    $clientMail->Body = render_template(__DIR__ . '/templates/client-thank-you.php', $templateData);
    $clientMail->AltBody = client_plain_text($templateData);
    $clientMail->send();
} catch (Throwable $exception) {
    error_log('[inquiry] Client email failed: ' . $exception->getMessage());
}

json_response(200, [
    'ok' => true,
    'message' => 'Thank you. Your inquiry has been sent.',
]);
