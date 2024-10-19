<?php
header("Access-Control-Allow-Origin: *");
$data = json_decode(file_get_contents('php://input'));

// docs https://www.geeksforgeeks.org/how-to-generate-pdf-file-using-php/

try {
    // require('./fpdf186/fpdf_thai.php');
    require('./fpdf186/fpdf.php');

    $pdf = new FPDF();

    $pdf->AddFont('THSarabunNew', '', 'THSarabunNew.php');
    $pdf->AddFont('THSarabunNew', 'B', 'THSarabunNew_b.php');

    $pdf->AddPage();

    $pdf->SetFont('THSarabunNew', 'B', 18);

    // โจทย์
    $pdf->Multicell(100, 10, iconv('UTF-8', 'cp874', "รันเลขให้ออก 1-10"));

    // code
    $pdf->Multicell(100, 10, iconv('UTF-8', 'cp874', $data->code));

    $name = date("YmdHis");
    $file_name =  $name . '.pdf';
    $pdf->Output('F', './tmp/' . $file_name, true);

    $ext = '.py';
    $comp = 'python';
    if ($data->language == 'c') {
        $ext = '.c';
        $comp = 'gcc';
    }

    file_put_contents("./file/" . $name . $ext, $data->code);

    // todo เขียน save data เข้า db เก็บเป็นข้อมูลข้อสอบที่ส่ง

    $res = [
        "success"   => true,
        "data"      => [
            "file"      => 'https://rmuttcpethesis.com/ProjectC03/api/compiler/api/tmp/' . $file_name
        ],
        "message"   => null
    ];
} catch (\Exception $e) {
    $res = [
        "success"   => false,
        "data"      => null,
        "message"   => $e->getMessage()
    ];
}

echo json_encode($res);
