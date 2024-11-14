<?php
class Api{
    private $connect='';
    function __construct()
    {
        $this->connect = new PDO("mysql:host=localhost;dbname=noticiasdb;charset=utf8","root","");
    }

    function list_noticias(){
        try {
            $query="select * from noticias";
            $sql = $this->connect->prepare($query);
            $ok= $sql->execute();						
            if($ok){				
                $data=null;
                while($row = $sql->fetch(PDO::FETCH_ASSOC))
                {
                    $data[] = $row;
                }				
                $datasuccess=[
                    'status'=>200,
                    'data'=>$data
                ];
                return $datasuccess;
            }
            else{	
                $datasuccess=[
                    'status'=>500,
                    'message'=>'error al ejecutar la consulta'
                ];
                return $datasuccess;
            }
        } catch (Exception $e) {
            $datasuccess[]=[
                'status'=>500,
                'menssage'=>'algo malo paso'
            ];
            return  $datasuccess;
        }
    }

    function create_noticia($titulo, $fecha_publicacion, $contenido, $autor, $categoria) {
        try {
            $query = "INSERT INTO noticias (titulo, contenido, autor, fecha_publicacion, categoria) VALUES (:titulo, :contenido, :autor, :fecha_publicacion, :categoria)";
            $sql = $this->connect->prepare($query);
            $sql->bindParam(':titulo', $titulo);
            $sql->bindParam(':contenido', $contenido);
            $sql->bindParam(':autor', $autor);
            $sql->bindParam(':fecha_publicacion', $fecha_publicacion);  
            $sql->bindParam(':categoria', $categoria);
            
            if ($sql->execute()) {
                return [
                    'status' => 201,
                    'message' => 'Noticia creada exitosamente'
                ];
            } else {
                return [
                    'status' => 500,
                    'message' => 'Error al crear la noticia'
                ];
            }
        } catch (Exception $e) {
            return [
                'status' => 500,
                'message' => 'Algo malo pasó'
            ];
        }
    }
    
    function update_noticia($id_noticia, $titulo, $fecha_publicacion, $contenido, $autor, $categoria) {
        try {
            $query = "UPDATE noticias SET titulo = :titulo, contenido = :contenido, autor = :autor,fecha_publicacion = :fecha_publicacion, categoria = :categoria WHERE id_noticia = :id_noticia";
            $sql = $this->connect->prepare($query);
            $sql->bindParam(':titulo', $titulo);
            $sql->bindParam(':contenido', $contenido);
            $sql->bindParam(':autor', $autor);
            $sql->bindParam(':fecha_publicacion', $fecha_publicacion);
            $sql->bindParam(':categoria', $categoria);
            $sql->bindParam(':id_noticia', $id_noticia);
            
            if ($sql->execute()) {
                return [
                    'status' => 200,
                    'message' => 'Noticia actualizada exitosamente'
                ];
            } else {
                return [
                    'status' => 500,
                    'message' => 'Error al actualizar la noticia'
                ];
            }
        } catch (Exception $e) {
            return [
                'status' => 500,
                'message' => 'Algo malo pasó'
            ];
        }
    }
    
    function delete_noticia($id_noticia) {
        try {
            $query = "DELETE FROM noticias WHERE id_noticia = :id_noticia";
            $sql = $this->connect->prepare($query);
            $sql->bindParam(':id_noticia', $id_noticia);
            
            if ($sql->execute()) {
                return [
                    'status' => 200,
                    'message' => 'Noticia eliminada exitosamente'
                ];
            } else {
                return [
                    'status' => 500,
                    'message' => 'Error al eliminar la noticia'
                ];
            }
        } catch (Exception $e) {
            return [
                'status' => 500,
                'message' => 'Algo malo pasó'
            ];
        }
    }

    function get_noticia_by_id($id_noticia) {
        try {
            $query = "SELECT * FROM noticias WHERE id_noticia = :id_noticia";
            $sql = $this->connect->prepare($query);
            $sql->bindParam(':id_noticia', $id_noticia);
            if ($sql->execute()) {
                $data = $sql->fetch(PDO::FETCH_ASSOC);
                if ($data) {
                    return [
                        'status' => 200,
                        'data' => $data
                    ];
                } else {
                    return [
                        'status' => 404,
                        'message' => 'Noticia no encontrada'
                    ];
                }
            } else {
                return [
                    'status' => 500,
                    'message' => 'Error al ejecutar la consulta'
                ];
            }
        } catch (Exception $e) {
            return [
                'status' => 500,
                'message' => 'Algo salió mal'
            ];
        }
    }
	  
}