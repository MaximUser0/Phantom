<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
    <link rel="icon" href="favicon.png" type="image/png">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <title>Phantom</title>
    

    @viteReactRefresh
    @vite('resources/js/index.jsx')
    @vite('resources/scss/app.scss')
</head>

<body>
    <script src="https://www.google.com/recaptcha/enterprise.js?render=6LfzjLAqAAAAAASZvgT8XW8DxlDdta9OiZr5cUzR"></script>
    <div id="app"></div>
</body>

</html>
