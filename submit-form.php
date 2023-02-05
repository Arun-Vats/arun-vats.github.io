<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];

  $to = "asvats374@gmail.com";
  $subject = "New Message from Portfolio Website";
  $headers = "From: $email" . "\r\n";
  $headers .= "Reply-To: $email" . "\r\n";
  $headers .= "X-Mailer: PHP/" . phpversion();

  $body = "Name: $name\n\nEmail: $email\n\nMessage:\n$message";

  if (mail($to, $subject, $body, $headers)) {
    echo "Message sent successfully.";
  } else {
    echo "Error sending message.";
  }
}

?>
