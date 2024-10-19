<?php
header("Access-Control-Allow-Origin: *");
$data = json_decode($_POST['data']);

$ext = '.py';
$comp = 'python';
if ($data->language == 'c') {
    $ext = '.c';
    $comp = 'gcc';
}

file_put_contents("./py/run" . $ext, $data->code);

$command = escapeshellcmd($comp . ' ./py/run' . $ext);
$output = shell_exec($command);

$error = shell_exec($comp . " ./py/run" . $ext . " 2>&1");

if ($data->language == 'c') {
    $command = escapeshellcmd('./py/output_file');
    $output = shell_exec($command);

    $error = shell_exec("./py/output_file 2>&1");
}

$res = [
    "output"        => $output,
    "errorCode"     => $error && $output == null ? "RTE" : "",
    "rntError"      => $error && $output == null ? $error : "",
    "compResult"    => "S",
    "cmd"           => $comp . ' ./py/run' . $ext
];

echo json_encode($res);
