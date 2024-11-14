<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Content-Type: application/json;charset=utf-8'); 

include('api.php');


$api = new Api();
$method = $_SERVER['REQUEST_METHOD'];
$option = isset($_GET['option']) ? $_GET['option'] : '';

$data = null;

switch ($method) {
    case 'GET':
        if ($option == 'list_noticias') {
            $data = $api->list_noticias();
        } elseif ($option == 'get_noticia') {  
            $id_noticia = isset($_GET['id_noticia']) ? $_GET['id_noticia'] : null;
            if ($id_noticia) {
                $data = $api->get_noticia_by_id($id_noticia);
            } else {
                $data = ['status' => 400, 'message' => 'ID de noticia no proporcionado'];
            }
        }
        break;

    case 'POST':
        if ($option == 'create_noticia') {
            $input = json_decode(file_get_contents("php://input"), true);
            if ($input) {
                $titulo = $input['titulo'];
                $fecha_publicacion = $input['fecha_publicacion'];
                $contenido = $input['contenido'];
                $autor = $input['autor'];
                $categoria = $input['categoria'];
                
                $data = $api->create_noticia($titulo, $fecha_publicacion, $contenido, $autor, $categoria);
            } else {
                $data = ['status' => 400, 'message' => 'Datos incompletos o inválidos'];
            }
        }
        break;

    case 'PUT':
        if ($option == 'update_noticia') {
            $input = json_decode(file_get_contents("php://input"), true);
            if ($input) {
                $id = $input['id'];
                $titulo = $input['titulo'];
                $fecha_publicacion = $input['fecha_publicacion'];
                $contenido = $input['contenido'];
                $autor = $input['autor'];
                $categoria = $input['categoria'];

                $data = $api->update_noticia($id, $titulo, $fecha_publicacion, $contenido, $autor, $categoria);
            } else {
                $data = ['status' => 400, 'message' => 'Datos incompletos o inválidos'];
            }
        }
        break;

    case 'DELETE':
        if ($option == 'delete_noticia') {
            $input = json_decode(file_get_contents("php://input"), true);
            $id = isset($input['id']) ? $input['id'] : null;
            
            if ($id) {
                $data = $api->delete_noticia($id);
            } else {
                $data = ['status' => 400, 'message' => 'ID de noticia no proporcionado'];
            }
        }
        break;

    default:
        $data = ['status' => 405, 'message' => 'Método no permitido'];
}

// Enviar respuesta en JSON
echo json_encode($data);
?>
